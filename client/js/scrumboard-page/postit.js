Template.postit.helpers({
    zIndex: function () {
        if (this.updated) {
            //1396695841955 --> "95841"
            return this.updated.toString().replace(/^\d{4}|\d{3}$/g, '');
        }
    },
    isVisible: function () {
        return !!App.colorFilter || this.color in App.colorFilter;
    },
    color: function () {
        console.log("COLORS: %j", TaskColorsSetup.findOne({_id: this.colorId}));

        return TaskColorsSetup.findOne({_id: this.colorId});
    },
    member: function () {
        if ((Settings.findOne() || {}).isAuth) {
            return Meteor.users.findOne({_id: this.memberId});
        }
        else {
            return Members.findOne({_id: this.memberId});
        }
    }
});

Template.postit.projectName = function () {
    return App.defaults.project;
};

Template.postit.state = function () {
    return 'postit--' + (isDocumentEditable(this) ? 'draggable' : 'fixed');
};

Template.postit.rendered = function () {
    var postit = $(this.find('[postit]'));

    postit.draggable({
        containment: '.' + (App.scrumboard.readonly ? this.data.laneId : 'lanes'),
        scroll: false,
        disabled: !isDocumentEditable(this.data),
        zIndex: 1000000
    });

    if (postit) {
        this.watchPostit = Deps.autorun(function () {
            postit.draggable("option", "disabled", !isDocumentEditable(this.data));
        }.bind(this));
    }
};

Template.postit.destroyed = function () {
    this.watchPostit.stop();
};

Template.postit.events = {
    'click [postit]': function (e, t) {
        if (!e.target.hasAttribute('postit-link') && isDocumentEditable(t.data)) {
            var postit = $(e.target).closest('[postit]');

            $('[manip-task]').position({
                of: postit,
                my: 'center center',
                at: 'center center',
                collision: 'fit fit'
            });
            Template.manipTask.show(Tasks.findOne({_id: postit.attr('data-id')}));
        }
    }
};