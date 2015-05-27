/**
 * @Author Harshal Patel
 * @Date 24-May-2015
 * Basic view class.
 * Backbone’s Views glue together user events (clicks, pressed keys, etc.),
 * render HTML views and templates, and interact with models which contains
 * the data of the application.
 */
var app = app || {};
(function ($){
    'use strict';
    app.AppView = Backbone.View.extend({
        el: '#todoapp',
        initialize: function () {
          this.input = this.$('#new-todo');
          // when new elements are added to the collection render then with addOne
          app.todoList.on('add', this.addOne, this);
          app.todoList.on('reset', this.addAll, this);
          app.todoList.fetch(); // Loads list from local storage
        },
        events: {
          'keypress #new-todo': 'createTodoOnEnter'
        },
        createTodoOnEnter: function(e){
          if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
            return;
          }
          app.todoList.create(this.newAttributes());
          this.input.val(''); // clean input box
        },
        addOne: function(todo){
          var view = new app.TodoView({model: todo});
          $('#todo-list').append(view.render().el);
        },
        addAll: function(){
          this.$('#todo-list').html(''); // clean the todo list
          switch(window.filter) {
            case 'pending':
                _.each(app.todoList.remaining(), this.addOne);
                break;
            case 'completed':
                _.each(app.todoList.completed(), this.addOne);
                break;
            default:
                app.todoList.each(this.addOne, this);
                break;
          }
        },
        newAttributes: function(){
          return {
            title: this.input.val().trim(),

            completed: false
          }
        }
    });
})(jQuery);