require.config({
    paths: {
        jquery: 'libs/jquery/jquery-2.1.4.min',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone.min',
        bootstrap_modal: 'libs/bootstrap_js/bootstrap/modal',
        text: 'libs/require/plugins/text',
        templates: '../templates'
    },
    shim: {
        'jquery':{
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap_modal': {
            deps: ['jquery']
        },
        'bootstrap_validator': {
            deps: ['jquery']
        },
        'app': {
            deps:['jquery', 'bootstrap_modal', 'backbone']
        }
    }
});


require(['jquery', 'bootstrap_modal', 'app'], function($, Bootstrape_Modal, App){
    App.initialize();
});