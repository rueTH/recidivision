"use strict";
angular.module('recidiVision').directive('SVGmapsFactory', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'img/Alabama_counties.svg',
        link: function (scope, element, attrs) {
            
        }
    };
}]);