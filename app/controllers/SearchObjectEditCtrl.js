"use strict";

app.controller("SearchObjectEditCtrl", function($scope, $location, $routeParams, SearchFactory){
  $scope.title = "Edit";
  $scope.btnText = "Save Changes";
  $scope.newSearch = {};

  SearchFactory.getSearchObject($routeParams.itemId)
  .then(function successCallback(response){
    console.log("getSearchObjectresponse", response);
    $scope.newSearch = response;
  });

  $scope.addNewSearch = function(){
    SearchFactory.updateSearchObject($routeParams.searchObjectId, $scope.newSearch)
    .then(function successCallback(response) {
      console.log(response);
      $location.url("/savedObjects/searchObjectCollection");
    });
  };
});