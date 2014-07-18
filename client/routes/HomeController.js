HomeController = RouteController.extend({
    layoutTemplate: 'layout',
    template: 'home',

    onBeforeAction: function () {
      App.page = 'home';
      App.scrumboard.view = 'normal';
      App.scrumboard.readonly = false;
    },
    waitOn: function () {
        App.defaults = {};
        if (!App.subs)
            App.subs = {};
        else if (App.subs.settings)
            App.subs.settings.stop();

        App.subs.settings = Meteor.subscribe('settings');

        return [subs.subscribe('projects'), App.subs.settings];
        //return [subs.subscribe('projects'), subs.subscribe('settings')];
    },
    data: function () {  // or a function
        return { pageCls: 'page-scrumboard'};
    },
    /*
    run: function () {
        this.render() ; // or this.render('scrumboard') (default) or this.render('scrumboard', { data: {..}, waitOn: funct....

        this.render({
            'postShowSidebar': { to: 'sidebar', waitOn: null}
        });
    },
    */
    start: function () {
    },
    yieldTemplates: {
        'headerHome': {to: 'header-section'}
    }
    /*
    action: function () {
        if (this.ready()) {
            this.render('home');
            //this.render('headerHome', {to: 'header-section'});
        }
        else {
          ;//this.render('loading');
        }
    }
    */
});
