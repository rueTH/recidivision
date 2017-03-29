"use strict";

var app = angular.module("recidiVision", ["ngRoute"]);

  //used to authenticate user when navigating to other views
  let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
      console.log("userExists", userExists);
      if (userExists){
        console.log("Authenticated, go ahead.");
        resolve();
      } else {
      console.log("we're sorry; authentication failed");
        reject();
      }
  });

});

app.config(function ($routeProvider) {
  $routeProvider.
  when("/", {
    templateUrl: "partials/login.html",
    controller: 'UserCtrl'
  }).
  when("/login", {
    templateUrl: "partials/login.html",
    controller: 'UserCtrl'
  }).
  when("/logout", {
    templateUrl: "partials/login.html",
    controller: 'UserCtrl'
  }).
  when("/new-search", {
    templateUrl: "partials/searchForm.html",
    controller: 'NewSearchCtrl', 
    resolve: {isAuth}
  }).
  when('/user-profile', {
    templateUrl: "partials/userProfile.html",
    controller: 'SavedObjectsCtrl',
    resolve: {isAuth}
  }).
   when('/user-profile', {
    templateUrl: "partials/userProfile.html",
    controller: 'SearchObjectEditCtrl',
    resolve: {isAuth}
  }).
   when('/user-profile', {
    templateUrl: "partials/userProfile.html",
    controller: 'ObjectViewCtrl',
    resolve: {isAuth}
  }).

  // when('/savedObjects/:searchObjectId', {
  //   templateUrl: "partials/searchObjectDetails",
  //   controller: 'ObjectViewCtrl',
  //   resolve: {isAuth}
  // }).
  when('/savedObjects/:searchObjectId/edit', {
    templateUrl: 'partials/searchForm.html',
    controller: 'SearchObjectEditCtrl',
    resolve: {isAuth}
  }).

  when("/data-map", {
    templateUrl: "partials/svgMaps.html",
    controller: "SVGmapsCtrl"
  }).

  otherwise("/");  
});



// Runs when the application loads
app.run(($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain,
    databaseURL: creds.databaseURL,
    storageBucket: creds.storageBucket
  };

  firebase.initializeApp(authConfig);

});


