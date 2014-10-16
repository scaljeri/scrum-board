Template.configLanes.helpers({
    lanes: function () {
        return LanesSetup.find(query(), {sort: {index: 1}});
    },

    rendered: function () {
        $(this.find('.sortable'))
                .sortable()
                .disableSelection();
    },

    events: {
        'click [config-color__trash]': function (e) {
        },
        'click [config-color__edit]': function (e) {
        }
    }
});