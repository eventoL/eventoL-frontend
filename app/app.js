'use strict';

angular
    .module('eventoL', ['ngMaterial'])
    .config(function($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red');
    });
