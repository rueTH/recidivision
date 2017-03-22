"use strict";
console.log("inside AuthFactory");
app.factory("AuthFactory", function() {
  let currentUser = null;
  // Function for creating user
  /* let createUser = function(userObj){
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch( function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("error inside createUser func in Authfactory:", errorCode, errorMessage);
    });
  }; */
  // Function for user to login
/*  let loginUser = function(userObj) {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch( function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("error inside loginUser in Authfactory:", errorCode, errorMessage);
    });
  }; */
  // Function for user to logout
  let logoutUser = function() {
    console.log("i'm inside the AuthFactory logoutUser function! Oh boy!!");
    return firebase.auth().signOut();
    
  };
  // Function to verify user is authenticated
  let isAuthenticated = function() {
    console.log("Authfactory: is Authenticated");
    return new Promise( (resolve, reject) => {
      firebase.auth().onAuthStateChanged( (user) => {
        if (user){
          currentUser = user.uid;
          console.log("currentUser is: ", currentUser);
          resolve(true);
        } else{
          resolve(false);
          console.log("Error: Not an authenticated user. Please register.");
        }
      });  
    });
  };
  let getUser = function() {
    return currentUser;
  };
  // Provider for sign in method is google
  let provider = new firebase.auth.GoogleAuthProvider();
  let authWithProvider = function() {
    return firebase.auth().signInWithPopup(provider);
  };

  return {logoutUser, isAuthenticated, getUser, authWithProvider};
});