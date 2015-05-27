var app = app || {}; // Creates namespace for the app
(function () {
    'use strict';

    app.Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },
        toggle: function(){
            this.save({
                completed: !this.get('completed')
            });
        }
    });
})();