"use strict";

// Ctrl for navigation links
app.controller("NavbarCtrl", function ($scope, $window, AuthFactory) {
console.log("inside NavbarCtrl");
  // $scope.searchText = SearchTermData;
  $scope.isLoggedIn = false;
  // Authenticate user
  // add a listener for login/logout to show/hide nav items
  $scope.logoutUser = function() {
    console.log("you are in logoutUser in NavbarCtrl.js");
    AuthFactory.logoutUser()
      .then(function(data) {
        console.log("logged out");
    });
  };
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      $scope.isLoggedIn = true;
      console.log("currentUser logged in", $scope.isLoggedIn);

    } else {
      $scope.isLoggedIn = false;
      console.log("currentUser NOT logged in", $scope.isLoggedIn);
      // $window.location forces the page to completely reload
      $window.location.href = "#!/visitor-home";
    }
  });
}); 