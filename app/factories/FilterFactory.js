"use strict";
// Allows to filter through search terms
app.factory("SearchTermData", function(){
  return {
    // Search is 'name value pairs'
    search: ""
  };
});

app.filter('map_colour', [function () {
  return function (input) {
    var b = 255 - Math.floor(input * 255);
    var g = Math.floor(input * 255);
    return "rgba(255," + g + "," + b + ",1)";
  };
}]);