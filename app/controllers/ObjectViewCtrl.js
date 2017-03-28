"use strict";

app.controller("ObjectViewCtrl", function($scope, $routeParams, SearchFactory, AuthFactory, searchObjectId) {
  $scope.items = [];
  console.log($routeParams.searchObjectId);

  let user = AuthFactory.getUser();

  SearchFactory.getSavedObjects(user)
  .then(function(searchObjectCollection) {
    $scope.savedObjects = searchObjectCollection;
    $scope.selectedObject = $scope.savedObjects.filter(function(searchObject){
      return searchObjectId === $routeParams.searchObjectId;
    })[0];
  });

});

