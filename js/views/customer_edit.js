define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/customer_edit.html'
], function($, _, Backbone, CustomerEditTemplate) {
    var CustomerEditView = Backbone.View.extend({
        'className': 'customer-edit',
        'events': {
            'click .save': 'save',
            'shown.bs.modal': 'shown',
            'hidden.bs.modal': 'close'
        },
        isCreating: false,
        initialize: function(options) {
            this.isCreating = options.isCreating;
        },
        getFormdata: function() {
            var unindexed_array = this.$('form').serializeArray();
            var indexed_array = {};

            $.map(unindexed_array, function(n, i) {
                indexed_array[n['name']] = n['value'];
            });

            return indexed_array;
        },
        render: function() {
            this.$el.html(_.template(CustomerEditTemplate)(this.model.attributes));
            if (!this.isCreating) {
                this.$('.modal-title').text('Edit customer');
            }
            this.$('.modal').modal({
                keyboard: true,
                show: false
            });
            return this;
        },
        save: function() {
            var data = this.getFormdata();
            if(this.checkIfNecessaryFieldsFilled(data)){
                this.model.set(this.getFormdata());
                if (this.isCreating) {
                    this.trigger('customer:add', this.model);
                    this.isCreating = false;
                }
                this.$('.modal').modal('hide');
            }
            else {
                this.$('input.required').addClass('active');
                alert('You should fill all required fields!');
            }
        },
        checkIfNecessaryFieldsFilled: function(data){
            var required = ['name','email'];
            var allFilled = true;
            required.forEach(function(value){
               if(data[value]== "" ){
                   allFilled = false
               }
            });
            return allFilled;
        },
        show: function() {
            this.$('.modal').modal('show');
        },
        shown: function() {
            this.$('input[name="name"]').focus();
        },
        close: function() {
            if (this.isCreating) {
                this.model.destroy();
            }
            this.remove();
        }
    });
    return CustomerEditView;
});