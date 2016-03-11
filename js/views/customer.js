define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/customer.html'
], function($, _, Backbone, CustomerTemplate ) {
   var CustomerView = Backbone.View.extend({
       'className': 'customer well',
       'events': {
            'click .update': 'update',
            'click .delete': 'delete'
       },
       initialize: function(){
            this.model.on('destroy', this.remove, this);
       },
       render: function() {
           this.model.attributes.idAttr = this.model.id;
           this.$el.html(_.template(CustomerTemplate)(this.model.attributes));
           return this;
       },
       update: function() {
           this.trigger('customer:update', this.model);
       },
       delete: function() {
           this.trigger('customer:delete', this.model);
       }
   });
    return CustomerView;
});