'use strict';

var app = angular.module('eventoL', ['ngMaterial', 'ngMap', 'ngSanitize']);

app.config(function($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('green')
        .accentPalette('amber');
});

app.run(function($window) {
    $window.scrollTo(0, 0);
});

app.directive('backImg', function() {
    return function(scope, element, attrs) {
        var url = scope.$eval(attrs.backImg);
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size':  'cover'
        });
    };
}).controller('EventsCtrl', function(eventService) {
    this.theEvent = eventService.getEvent(1);

    this.getSomeEvents = function() {
        return eventService.events;
    }
});
