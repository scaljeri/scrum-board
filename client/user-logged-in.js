Template.userLoggedIn.rendered = function () {
};

Template.userLoggedIn.hide = function () {
    App.outsideClick.remove(Template.userLoggedIn.hide);
    $('[login__dropdown]').hide();
};

Template.userLoggedIn.events({
    'click [login__name]': function () {
        $('[login__dropdown]')
            .show();
        /*.position({
         of: '[login]',
         my: 'left top',
         at: 'left bottom',
         collision: 'fit fit'
         });*/

        App.outsideClick.register('[login__dropdown]', Template.userLoggedIn.hide);
    },
    'click [login__dropdown__logout]': function () {
        Meteor.logout();
        App.isLoggedIn = false;
    },
    'click [login__dropdown__profile]': function () {
        alert('TODO');
    }
});
