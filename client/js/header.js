Template.header.project = function () {
    return App.defaults.project;
};

Template.header.showConfig = function () {
    return App.page === 'scrumboard';
};

Template.header.sprint = function () {
    return Sprints.findOne({ startdate: {$gt: new Date().getTime()}, enddate: { $lt: new Date().getTime()}});
};

Template.header.rendered = function () {
    App.outsideClick.register('[edit-task]', function () {
        $('[add-task]').removeClass('active');
    });
};

Template.header.events = {
    'click [config]': function () {
        if (App.page === 'scrumboard') {
            Template.projectConfig.show();
        }
    }
};