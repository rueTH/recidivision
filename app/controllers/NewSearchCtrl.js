"use strict";
console.log("You are in the 'New Search' Controller!");

app.controller("NewSearchCtrl", function($scope, SearchFactory, $location, AuthFactory, $routeParams) {

  let user = AuthFactory.getUser();
  

  let savedObjects = [];
 
  $scope.saveButtonLabel = 'Save this search';


  $scope.savedObjects = savedObjects;
  $scope.searchObject = {};

  $scope.parameter = '';
  $scope.newTerm = '';  
  
  
  $('.dropdown-menu a').click(function(){
    $('#parameter').text($(this).text());
  });


//bind pair and add to array
   $scope.add = function() {
    let parameter = $scope.parameter; 
    let newTerm = $scope.newTerm;
    console.log(newTerm);
    let searchObject = {};
    searchObject.parameter = parameter;
    searchObject.newTerm = newTerm;
    console.log("function is firing");
    // savedObjects.push(searchObject);
    SearchFactory.postSearchObject($scope.newSearch)
      .then(function(response){
        $location.url("/savedObjects/savedObjects");
      });
    console.log(searchObject);
    console.log(savedObjects);


  };
//delete individual search terms:  
  $scope.del = function(i){
    $scope.savedObjects.splice(i,1);
  };
//delete&reset entire search form:
  $scope.reset = function() {
    $scope.savedObjects.splice(0);
  };

//saving your searches:
  $scope.save = function() {
    //alert ($scope.savedObjects);
    let user = AuthFactory.getUser();
    let searchObject = {
      search: savedObjects,
      uid: user
    };
    SearchFactory.postSearchObject($scope.searchObject);
  };




    $scope.reset();
  });


  



