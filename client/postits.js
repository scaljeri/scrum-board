Template.postits.items = function () {
 return Postits.find({}, { sort: {index: 1}}).fetch();
};

Template.postits.rendered = function (t) {
    var postits = $('[postit]');

    if (postits.length > 0) {
        postits.draggable({
            containment: '[scrumboard]'
        });
        $( ".droppable" ).droppable({
            accept: ".draggable",
            activeClass: "ui-state-hover",
            hoverClass: "ui-state-active",
            drop: function( event, ui ) {
                var _id = ui.draggable.attr('data-id'),
                    left = parseInt(ui.draggable.css('left')),
                    top = parseInt(ui.draggable.css('top')),
                    width = $('[scrumboard]').width();
                    height = $('[scrumboard]').height();

                var postit = Postits.findOne({_id: _id});
                postit.left = (1-(width-left)/width) * 100;
                postit.top = (1-(height-top)/height) * 100;

                //delete postit._id;
                //Postits.update({_id: _id}, {$set: postit});
                Meteor.call('updatePosition', postit);
            }
        });
    }
}

Template.postits.events = {
    'mousedown [postit]' : function (e, t) {
        $(e.target).closest('[postit]').css('z-index', 10);
    }
}