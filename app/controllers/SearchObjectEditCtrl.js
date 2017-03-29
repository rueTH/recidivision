"use strict";

console.log("You are in the 'Search Object Ctrl Edit' Controller!");

app.controller("SearchObjectEditCtrl", function($scope, $location, $routeParams, SearchFactory){
  
  $scope.title = "Edit";
  $scope.btnText = "Save Changes";
  $scope.newSearch = {};

  SearchFactory.getSearchObject($routeParams.searchObjectId)
  .then(function successCallback(response){
    $scope.newSearch = response;
    console.log("getSearchObjectresponse", response);
  });

  $scope.addNewSearch = function(){
    SearchFactory.updateSearchObject($routeParams.searchObjectId, $scope.newSearch)
    .then(function successCallback(response) {
      console.log(response);
      $location.url("/savedObjects/searchObjectCollection");
    });
  };
});