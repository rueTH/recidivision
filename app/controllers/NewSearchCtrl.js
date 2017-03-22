"use strict";
console.log("You are in the 'New Search' Controller!");
app.controller("NewSearchCtrl", function($scope, $window, $location) {

  // this.selectedDropdownItem = null;
  // this.dropdownItems = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
//adding new search criteria:


  let searchPairs = [];
  


  $scope.searchPairs = searchPairs;
  $scope.searchPair = {};
  // $scope.searchPair = 
  $scope.parameter = '';
  $scope.newterm = '';  
  
  $scope.saveButtonLabel = 'Save this search';
  
  $('.dropdown-menu a').click(function(){
    $('#parameter').text($(this).text());
  });
//bind pair and add to array
   $scope.add = function() {
    let parameter = $scope.parameter; 
    let newTerm = $scope.newTerm;
    let searchPair = {};
    searchPair[parameter] = newTerm;
    console.log("function is firing");
    searchPairs.push(searchPair);
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
    alert ($scope.searchPairs);
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
  



