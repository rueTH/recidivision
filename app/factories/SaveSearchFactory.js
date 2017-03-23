"use strict";

app.factory("SaveSearchFactory", ($q, $http, FBCreds) => {

let postSavedSearchObject = (searchObject) => {
    return $q((resolve, reject) => {
      $http.post(`${FBCreds.databaseURL}/savedSearches.json`,
        angular.toJson(searchObject))
      .then((ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };
let getSavedObjects = (user) => {
  let savedObjects = [];
  return $q((resolve, reject) => {
    console.log("inside function 'getSavedObjects' in 'SaveSearchFactory'.", `${FBCreds.databaseURL}/savedSearches.json?orderBy="uid"&equalTo"${user}"`)
    $http.get(`${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`)
    .then((returnedObject) => {
      let searchObjectCollection = returnedObject.data;
      console.log("searchObjectCollection", searchObjectCollection);
      Object.keys(searchObjectCollection).forEach((key) => {
        searchObjectCollection[key].id = key;
        savedObjects.push(searchObjectCollection[key]);
      });
      resolve(savedObjects);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

let delSavedSearchObject = (searchObjectId) => {
  console.log("inside function 'delSavedSearchObject' in 'SaveSearchFactory'.", searchObjectId);
  return $q((resolve, reject) => {
    $http.delete(`${FBCreds.databaseURL}/savedObjects/${searchObjectId}.json`)
    .then((ObjectFromFirebase) => {
      resolve(ObjectFromFirebase);
    });
  });
};

let getSingleObject = (searchObjectId) => {
  return $q(function(resolve, reject){
    $http.get(`${FBCreds.databaseURL}/savedObjects/${searchObjectId}.json`)
    .then(function(returnedObject){
      resolve(returnedObject.data);
    })
    .catch(function(error){
      reject(error);
    });
  });
};

let updateSearchObject = (searchObjectId, editedObject) => {
  //Properties with leading $$ characters will be stripped since AngularJS uses this notation internally.
  console.log("angularJSON", angular.toJson(editedObject));
  console.log("JSON.stringify", JSON.stringify(editedObject));

  return $q(function(resolve, reject){
    $http.patch(`${FBCreds.databaseURL}/savedObjects/${searchObjectId}.json`,
      angular.toJson(editedObject))
    .then(function(ObjectFromFirebase){
      resolve(ObjectFromFirebase);
    })
    .catch(function(error){
      reject(error);
    });
  });
};











return {postSavedSearchObject, getSavedObjects, delSavedSearchObject, getSingleObject, updateSearchObject};

});