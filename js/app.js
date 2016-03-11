define([
    'jquery',
    'underscore',
    'backbone',
    'models/customers',
    'views/customers_list'
], function ($, _ , Backbone, CustomersCollection, CustomersListView){
    var App = {
        models: {},
        views: {},
        initialize: function(){
            this.models.customers = new CustomersCollection();
            var storage = this.getFromLocalStorage();

            if(storage){
                this.models.customers.add(JSON.parse(storage));
            }

            this.views.customers = new CustomersListView({model: this.models.customers});

            $('body').append(this.views.customers.render().el);
        },
        getFromLocalStorage: function(){
            return localStorage.getItem('customersInfo');
        }
    };
    return App;
});
