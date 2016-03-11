define([
    'jquery',
    'underscore',
    'backbone',
    'models/customer'
], function($, _, Backbone, CustomerModel) {
    var Customers = Backbone.Collection.extend({
        model: CustomerModel
    });
    return Customers;
});