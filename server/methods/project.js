var fs = Npm.require('fs');

Meteor.methods({
    'createProject': function (name, fileInfo, fileData) {
        var path, imgType, resourceId, projectId;

        if (Meteor.user() !== null) {
            projectId = Projects.insert({
                creatorId: Meteor.user()._id,
                name: name,
                created: new Date().getTime()
            });

            Meteor.users.update({_id: Meteor.user()._id}, {$push: {projects: projectId}});
            inititalizeProject(projectId);

            if (fileInfo) {
                try {
                    imgType = fileInfo.name.match(/(\..*)/)[1];
                    resourceId = Resources.insert({originalName: fileInfo.name});
                    path = process.env.PWD + '/.uploads/' + resourceId + imgType;

                    Projects.update({_id: projectId}, {$set: {resourceId: resourceId}});

                    Async.wrap(fs.writeFile)(path, fileData, "binary");
                    Resources.update({_id: resourceId}, {$set: {fileName: resourceId + imgType}});
                    return {status: 'ok'};
                }
                catch (e) {
                    Resources.remove({_id: resourceId}); // undo
                    console.dir(e);
                    return { status: 'error', msg: 'Could not save project icon'};
                }
            }
            else {
                return {status: 'ok'};
            }
        }
        else {
            return {status: 'error'}; // this should never happen
        }
    }
});

function inititalizeProject(projectId) {
    TaskColors.find().forEach(function (color) {
        color.projectId = projectId;
        delete color._id;
        TaskColorsSetup.insert(color);
    });

    Lanes.find().forEach(function (lane) {
        lane.projectId = projectId;
        delete lane._id;
        LanesSetup.insert(lane);
    });
}
