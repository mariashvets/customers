define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/customers_list.html',
    'models/customer',
    'views/customer',
    'views/customer_edit'
], function($, _, Backbone, AppTemplate, CustomerModel, CustomerView, CustomerEditView) {

    var CustomerListView = Backbone.View.extend({
        events: {
            'click .create-new': 'createCustomer'
        },
        initialize: function() {
            this.model.on('update',function(){
                this.render();
                this.storeCustomersInfo();
            }, this);

            this.model.on('change', function(){
                this.render();
                this.storeCustomersInfo();
            }, this);
        },
        render: function() {
            this.$el.html(_.template(AppTemplate)());

            this.model.models.forEach(function(model) {
                var view = new CustomerView({model: model});
                this.$('.customers-list').prepend(view.render().el);

                view.on('customer:update', function(customer){
                    this.editCustomer(customer);
                }.bind(this));

                view.on('customer:delete', function(customer){
                    this.removeCustomer(customer);
                }.bind(this));

            }.bind(this));

            return this;
        },

        createCustomer: function() {
            var customer = new CustomerModel();
            var form = new CustomerEditView({model: customer, isCreating: true});
            this.$el.parent().append(form.render().el);

            form.on('customer:add', function(customer) {
                this.model.add(customer);
            }.bind(this));

            form.show();
        },

        editCustomer: function(customer) {
            var form = new CustomerEditView({model: customer, isCreating: false});
            this.$el.parent().append(form.render().el);

            form.show();
        },

        removeCustomer: function(customer) {
            if (confirm('Do you really want to remove customer "' + customer.get('name') + '"?')) {
                customer.destroy();
            }
        },
        storeCustomersInfo: function(){
            localStorage.setItem('customersInfo',JSON.stringify(this.model.models));
        }
    });
    return CustomerListView;
});