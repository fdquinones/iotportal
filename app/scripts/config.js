/**
 * HOMER - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */

function configState($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise("/");
    $stateProvider

        // Landing page
        .state('landing', {
            url: "/",
            templateUrl: "views/landing_page.html",
            controller: 'landingCtrl',
            data: {
                pageTitle: 'meteorologica',
                specialClass: 'landing-page'
            }
        })
}

angular
    .module('homer')
    .config(configState)
    .run(function($rootScope, $state, editableOptions) {
        $rootScope.$state = $state;
        $rootScope.API_URI_ESTACIONES = {
          ALL: '/platform/api/public/meteorological/',
          DETAIL: '/platform/api/public/meteorological/detail/',
          DETAIL_DEFAULT: '/platform/api/public/meteorological/detail/8/codigo'
        };
        editableOptions.theme = 'bs3';
    });
