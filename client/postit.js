Template.postit.zIndex = function () {
    if (this.updated) {
        //1396695841955 --> "95841"
        return this.updated.toString().replace(/^\d{4}|\d{3}$/g, '');
    }
};

Template.postit.color = function () {
    return TaskColors.findOne({_id: this.color});
};

Template.postit.member = function () {
    return Members.findOne({_id: this.memberId});
};

Template.postit.rendered = function () {
    var postit = $(this.find('[postit]'));
    $(postit).draggable({
        containment: '[scrumboard]'
    });
};

Template.postit.events = {
    'click [postit]' : function (e, t) {
        if (!e.target.hasAttribute('postit-link')) {
            var postit = $(e.target).closest('[postit]');

            $('[edit-task]').position({
                of: postit,
                my: 'center center',
                at: 'center center',
                collision: 'fit fit'
            });
            Template.editTask.show(Tasks.findOne({_id: postit.attr('data-id')}));
        }
        event.stopPropagation();
    }
}
