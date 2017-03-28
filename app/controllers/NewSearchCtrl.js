"use strict";
console.log("You are in the 'New Search' Controller!");

app.controller("NewSearchCtrl", function($scope, SearchFactory, $location, AuthFactory, $routeParams) {

  let user = AuthFactory.getUser();
  

  let searchPairs = [];
 
  
  $scope.searchPairs = searchPairs;
  $scope.searchPair = {};

  $scope.parameter = '';
  $scope.newTerm = '';  
  
  $scope.saveButtonLabel = 'Save this search';


  $('.dropdown-menu a').click(function(){
    $('#parameter').text($(this).text());
  });


//bind pair and add to array
   $scope.add = function() {
    let parameter = $scope.parameter; 
    let newTerm = $scope.newTerm;
    console.log(newTerm, parameter);
    let searchPair = {};
    searchPair.parameter = parameter;
    searchPair.newTerm = newTerm;
    console.log("add to current search (not post to FB) function is firing", {newTerm, parameter});
    searchPairs.push(searchPair);
    console.log(searchPair);
    console.log(searchPairs);


  };
//delete individual search terms:  
  $scope.del = function(i){
    $scope.searchPairs.splice(i,1);
  };
//delete&reset entire search form:
  $scope.reset = function() {
    $scope.searchPairs.splice(0);
  };

//saving your searches:
  $scope.save = function() {
    //alert ($scope.searchPairs);
    let user = AuthFactory.getUser();
    let searchObject = {
      search: searchPairs,
      uid: user
    };
    SearchFactory.postSearchObject($scope.searchObject);
  };









    $scope.reset();
  });


  



