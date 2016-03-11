define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    var Customer = Backbone.Model.extend({
        defaults: {
            'idAttribute': "_id",
            'name':'',
            'email':'',
            'address': ''
        }
    });
    return Customer;
});