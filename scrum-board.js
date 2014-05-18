// Collections
Projects = new Meteor.Collection('projects');
Sprints = new Meteor.Collection('sprints');
Lanes = new Meteor.Collection('lanes');
LanesSetup = new Meteor.Collection('lanes-setup');
Tasks = new Meteor.Collection('tasks');
TaskColors = new Meteor.Collection('task-colors');
TaskColorsSetup = new Meteor.Collection('task-colors-setup');
Members = new Meteor.Collection('members');
Comments = new Meteor.Collection('comments');
App = {};


// Routes
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});
//RsprintNumberouter.onBeforeAction('notFound');
Router.map(function () {
    this.route('home', {
        path: '/',
        controller: 'HomeController'
    });
    this.route('project', {
        path: '/:project',
        controller: 'SprintController'
        //action: 'start'
    });

    this.route('task', {
        path: '/task/:id',
        controller: 'TaskController'
    });

    this.route('stats', {
        path: '/stats',
        controller: 'StatsController'
    });
});

if (Meteor.isClient) {
    App = {
        defaults: {},
        noob: function () {},
        scrumboard: {view: 'normal', readonly: false},
        subs: null,
        /*
         subs: {
         velocity: Meteor.subscribe('velocity'),
         burndown: Meteor.subscribe('burndown'),
         burnup: Meteor.subscribe('burnup'),

         sprint: Meteor.subscribe('sprint'),
         lanes: Meteor.subscribe('lanes'),
         //tasks: Meteor.subscribe('tasks'),
         taskColors: Meteor.subscribe('task-colors'),
         //taskPositions: Meteor.subscribe('task-positions'),
         members: Meteor.subscribe('members')
         }, */
        deps: {},
        outsideClick: {
            list: [],
            /*
             When a click is supposed to show a widget, this widget should be ignored when this
             click is handled in the outside-click code. Otherwise this click will show the widget
             and immediately close it again. So, when a widget is shown also set dirty to true

             App.outsideClick.isDirty = true;
             Template.configMenu.show();       // the widget registers itself for an outside-click

             */
            register: function (selector, callback) {
                this.remove(callback);
                this.list.push({ selector: selector, callback: callback, dirty: true});
            },
            remove: function (callback) {
                this.list = _.filter(this.list, function (item) {
                    return item.callback !== callback;
                }) || [];
            }
        }
    };
    makeReactive('selectedTask');
    makeReactive('errorMessage');
    makeReactive('selectedColors');
    makeReactive('filterColorId');

    /* PRIVATE HELPER FUNCTIONS */
    function makeReactive(property, defaultValue) {
        var value = null,
            dep = new Deps.Dependency();

        Object.defineProperty(App, property, {
            set: function (newVal) {
                value = newVal || defaultValue;
                dep.changed();
            },
            get: function () {
                dep.depend();
                return value;
            }
        });
    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {

        /*
         Projects.remove({});
         Sprints.remove({});
         Lanes.remove({});
         LanesSetup.remove({});
         Tasks.remove({});
         TaskColors.remove({});
         TaskColorsSetup.remove({});
         Members.remove({});
         */

        if (Lanes.find({}).count() === 0) {
            Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
            Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
            //Lanes.insert({ title: 'test', message: 'Tasks under test', index: 2});
            Lanes.insert({ title: 'done', message: 'Tasks done', index: 1000000});

            LanesSetup.insert({ title: 'todo', message: 'Tasks to be done', index: 0, project: 'VOoruit'});
            LanesSetup.insert({ title: 'in progress', message: 'Tasks in progress', index: 1, project: 'VOoruit'});
            LanesSetup.insert({ title: 'done', message: 'Tasks done', index: 1000000, project: 'VOoruit'});
        }

        if (Sprints.find({}).count() === 0) {
            /*
             var endDate = new Date(),
             startDate = new Date().setDate(endDate.getDate() + 14);
             Sprints.insert({
             sprintNumber: 23,
             startDate: startDate,
             endDate: endDate.getTime(),
             status: 'started'
             });
             */
        }

        if (TaskColors.find({}).count() === 0) {
            TaskColors.insert({ value: '#ffff92', title: 'Frontend', index: 0});
            TaskColors.insert({ value: '#ffa2e7', title: 'Design', index: 1});
            TaskColors.insert({ value: '#73dcff', title: 'Backend', index: 2});
            TaskColors.insert({ value: '#93e89f', title: 'Unknown', index: 3});
            TaskColors.insert({ value: '#ff9999', title: 'Test', index: 4});
            TaskColors.insert({ value: '#a0a0ff', title: 'other', index: 5});
            TaskColors.insert({ value: '#9effe6', title: 'infra', index: 6});

            TaskColorsSetup.insert({ value: '#ffff92', title: 'Frontend', index: 0, project: 'VOoruit'});
            TaskColorsSetup.insert({ value: '#ffa2e7', title: 'Design', index: 1, project: 'VOoruit'});
            TaskColorsSetup.insert({ value: '#73dcff', title: 'Backend', index: 2, project: 'VOoruit'});
            TaskColorsSetup.insert({ value: '#93e89f', title: 'Unknown', index: 3, project: 'VOoruit'});
            TaskColorsSetup.insert({ value: '#ff9999', title: 'Test', index: 4, project: 'VOoruit'});
            TaskColorsSetup.insert({ value: '#a0a0ff', title: 'other', index: 5, project: 'VOoruit'});
            TaskColorsSetup.insert({ value: '#9effe6', title: 'infra', index: 6, project: 'VOoruit'});
        }

        if (Members.find({}).count() === 0) {
            Members.insert({name: 'Anne Heijkoop', initials: 'AH'});
            Members.insert({name: 'Arjan Eising', initials: 'AE'});
            Members.insert({name: 'Jan Willem', initials: 'JW'});
            Members.insert({name: 'Jeroen Zwartenpoort', initials: 'JZ'});
            Members.insert({name: 'Joost van Dieten', initials: 'JD'});
            Members.insert({name: 'Lucas Calje', initials: 'LC'});
            Members.insert({name: 'Maurice de Chateau', initials: 'MC'});
            Members.insert({name: 'Sander van Geloven', initials: 'SG'});
        }

        Meteor.publish('projects', function (project) {
            var query = {};
            if (project) {
                query.name = project;
            }
            return Projects.find(query, {sort: {name: 1}});
        });

        Meteor.publish('task-colors', function () {
            return TaskColors.find({}, {sort: {index: 1}});
        });

        Meteor.publish('task-colors-setup', function (project) {
            return TaskColorsSetup.find({project: project}, {sort: {index: 1}});
        });

        /*
        Meteor.publish('task-positions', function (projectId, sprintNumber) {
            return Tasks.find({$and: [
                    {projectId: projectId},
                    {sprintNumber: sprintNumber},
                    {$or: [
                        { deleted: {$exists: false}},
                        {deleted: false}
                    ]}
                ]},
                {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
        });
        */

        /*
        Meteor.publish('tasksx', function (projectId, sprintNumber) {
            return Tasks.find({$and: [
                {projectId: projectId},
                {sprintNumber: sprintNumber},
                {$or: [
                    { deleted: {$exists: false}},
                    {deleted: false}
                ]}
            ]}, {fields: {x: 0, y: 0, updated: 0}});          // return task without coordinates
        });
        */

        Meteor.publish('lanes', function () {
            return Lanes.find({}, {sort: {index: 1}});
        });

        Meteor.publish('lanes-setup', function (project) {
            return LanesSetup.find({project: project}, {sort: {index: 1}});
        });

        Meteor.publish('sprint', function (projectId, sprintNumber) {
            var query = { projectId: projectId};
            if (sprintNumber) { // TODO: rename sprintNumber to number in Collection
                query.sprintNumber = sprintNumber;
            }

            //return Sprints.find({ startDate: {$gt: new Date().getTime()}, endDate: { $lt: new Date().getTime()}});
            return Sprints.find(query, {limit: 1, sort: {sprintNumber: -1}});
        });

        Meteor.publish('members', function () {
            return Members.find({}, {sort: {name: 1}});
        });

        Meteor.publish('comments', function (taskId) {
            return Comments.find({taskId: taskId}, {sort: {insertDate: 1}});
        });

        // stats
        Meteor.publish('velocity', function () {
            return;
        });

        Meteor.publish('burndown', function () { // stories
            return
        });
        Meteor.publish('burnup', function () {  // tasks
            return
        });

        Meteor.reactivePublish('tasks', function (projectId) {
            var sprint = Sprints.findOne({active:true, projectId: projectId}, {reactive: true});
            console.log("tasks reactivePublish " + (sprint ? sprint.sprintNumber:-10) + ' pid=' + projectId);
            return Tasks.find({$and: [
                {projectId: projectId},
                {sprintNumber: sprint ? sprint.sprintNumber : -10},
                {$or: [
                    { deleted: {$exists: false}},
                    {deleted: false}
                ]}
            ]}, {fields: {x: 0, y: 0, updated: 0}});          // return task without coordinates
        });

        Meteor.reactivePublish('task-positions', function (projectId) {
            var sprint = Sprints.findOne({active:true, projectId: projectId}, {reactive: true});
            return Tasks.find({$and: [
                    {projectId: projectId},
                    {sprintNumber: sprint ? sprint.sprintNumber : -10},
                    {$or: [
                        { deleted: {$exists: false}},
                        {deleted: false}
                    ]}
                ]},
                {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
        });
    });
}
