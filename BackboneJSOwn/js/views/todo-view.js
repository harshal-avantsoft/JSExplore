/**
 * @Author Harshal Patel
 * @Date 24-May-2015
 * Basic view class.
 * Backbone’s Views glue together user events (clicks, pressed keys, etc.),
 * render HTML views and templates, and interact with models which contains
 * the data of the application.
 */
var app = app || {};
(function($) {
    'use strict';
    app.TodoView = Backbone.View.extend({
        // renders individual todo items list (li)
        tagName: 'li',
        template: _.template($('#item-template').html()),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit');
            return this; // enable chained calls
        },
        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        events: {
            'dblclick label': 'edit',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close',
            'click .toggle': 'toggleCompleted',
            'click .destroy': 'destroy'
        },
        edit: function() {
            this.$el.addClass('editing');
            this.input.focus();
        },
        close: function() {
            var value = this.input.val().trim();
            if (value) {
                this.model.save({
                    title: value
                });
            }
            this.$el.removeClass('editing');
        },
        updateOnEnter: function(e) {
            if (e.which == 13) {
                this.close();
            }
        },
        destroy: function () {
            this.model.destroy();
        },
        toggleCompleted: function(){
            this.model.toggle();
        }
    });
})(jQuery);
