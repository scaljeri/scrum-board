Meteor.startup(function () {
    var isAdded = false;

    Meteor.reactivePublish('settings', function (projectName) {
        var project, settings;

        var self = this;

        function prepare(d) {
            if (!d.connections) {
                d.connections = {};
            }
            else {
                (d.connections.jira||{}).password = null;
                (d.connections.hipchat||{}).password = null;
            }

            return d;
        }

        if (projectName) {
            project = Projects.findOne({name: projectName});

            if (project) {
                settings = Settings.find({projectId: project._id}).observe({
                    added: function (document) {
                        self.added('settings', document._id, prepare(document));
                    },
                    changed: function (newDocument, oldDocument) {
                        self.changed('settings', newDocument._id, prepare(newDocument));
                    },
                    removed: function (oldDocument) {
                        self.removed('settings', oldDocument._id);
                    }
                });

                self.ready();

                self.onStop(function () {
                    settings.stop();
                });
            }
        }
        else {
            self.ready();
        }

        // ======
        //var connections = {}, project, settings, service;




        /*
        console.log("SETTINGSSSSSSSSSSSSSSSSSS " + projectName);

        if (projectName) {
            project = Projects.findOne({name: projectName});

            if (project) {
                settings = Settings.findOne({projectId: project._id}, {reactive: true});

                service = setupJira(settings.jira||{});
                if (service) {
                    connections.jira = service;
                    connections.jira.settings = Meteor.settings.services.jira;
                }

                service = setupHipchat(settings.hipchat||{});
                if (service) {
                    connections.hipchat = service;
                }
            }

        }

        try { // TODO: The try/catch is a hack
            this.removed('settings', 'settings');
        } catch (e) {
        }

        //if (!isAdded) {
        this.added("settings", "settings", {
            authenticate: isAuthenticationEnabled(),
            connections: connections,
            projectId: (project || {})._id
        });
        /*}
         isAdded = true;
         else {

         console.log("Cahnging id=" + settings);
         this.changed('settings', 'settings', {
         isAuth: enabled,
         connections: connections
         });
         }*/

        //this.ready();
    });
});

function isAuthenticationEnabled() {
    // currently only github authentication is implemented
    var settings = Meteor.settings;
    return settings && settings.authentication && settings.authentication.enabled === true;
}

function getService(key) {
    var service = {};

    if (Meteor.settings && Meteor.settings.services) {
        service = Meteor.settings.services[key];
    }

    return service;

}

/*
function setupJira(settings) {
    var retVal = null, service;

    service = getService('jira');

    // if visible is `false` it will not show up in the configuration
    if (service.active === true) {
        retVal = {
            username: settings.username,
            checked: settings.checked, // if false it will not show up in the 'create task' menu
            projectName: settings.projectName
        };
    }

    return retVal;
}*/

function setupHipchat(settings) {
    var retVal = null, service;

    if (settings) {
        service = getService('hipchat');

        // if visible is `false` it will not show up in the configuration
        if (service.active === true) {
            retVal = {};
        }
    }

    return retVal;
}
