var app = app || {};
(function() {
    'use strict';

    var TodoRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },
        setFilter : function (param) {
            console.info('app.router.params = ' + param);
            window.filter = (param && param.trim()) || '';
            app.todoList.trigger('reset');
        }
    });
    app.TodoRouter = new TodoRouter();
    Backbone.history.start();
})();