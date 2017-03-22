"use strict";
console.log("You are in the 'New Search' Controller!");
app.controller("NewSearchCtrl", function($scope, $window, $location) {

  // this.selectedDropdownItem = null;
  // this.dropdownItems = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
//adding new search criteria:
  $scope.parameters = [];
  $scope.parameter = '';

  $scope.terms = [];
  $scope.newterm = '';  

  $scope.saveButtonLabel = 'Save this search';

  $scope.add = function(){
      $scope.terms.push($scope.newterm);
      $scope.parameters.push($scope.parameter);
  };
//delete individual search terms:  
  $scope.del = function(i){
    $scope.terms.splice(i,1);
    $scope.parameters.splice(i,1);
  };
//delete&reset entire search form:
  $scope.reset = function() {
    $scope.terms.splice(0);
    $scope.parameters.splice(0);
  };

//saving your searches:
  $scope.save = function() {
    alert ($scope.parameters, $scope.terms);
  };
    // $scope.save = function($index) {
    //   console.log($scope.terms);
    // };

    $scope.reset();
  });



 /* $scope.terms = [{id: 'term1'}, {id: 'term2'}];
  
  $scope.addNewTerm = function() {
    var newItemNo = $scope.terms.length+1;
    $scope.terms.push({'id':'term'+newItemNo});
  };
    
  $scope.removeTerm = function() {
    var lastItem = $scope.terms.length-1;
    $scope.terms.splice(lastItem);
  };
  
}); */
  



