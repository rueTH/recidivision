"use strict";

console.log("You are in the 'Saved Object' Controller!");

app.controller("SavedObjectsCtrl", function($scope, SearchFactory, SearchTermData, AuthFactory){
  
  $scope.searchText = SearchTermData;
    let user = AuthFactory.getUser();

  SearchFactory.getSavedObjects(user)
  .then(function(searchObjectCollection){
    $scope.savedObjects = searchObjectCollection;
  });

  $scope.searchObjectDelete = function(searchObjectId){
    console.log("delete this search pair", searchObjectId);
    SearchFactory.delSearchObject(searchObjectId)
    .then(function(response){
      SearchFactory.getSavedObjects(user)
      .then(function(searchObjectCollection){
        $scope.savedObjects = searchObjectCollection;
      });
    });
  };
});