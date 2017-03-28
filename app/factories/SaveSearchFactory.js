"use strict";

app.factory("SearchFactory", ($q, $http, FBCreds) => {

    let getSavedObjects = (user) => {
      
      let savedObjects = [];

      return $q( (resolve, reject) => {
        // plug in url, we want it to evaluate on (user uid)
        console.log("user list:", `${FBCreds.databaseURL}/savedObjects.json?orderBy="uid"&equalTo"${user}"`);
        $http.get(`${FBCreds.databaseURL}/savedObjects.json?orderBy="uid"&equalTo="${user}"`)
        .then( (returnedObject) => {
          let searchObjectCollection = returnedObject.data;
          console.log("searchObjectCollection", searchObjectCollection);
          Object.keys(searchObjectCollection).forEach((key) => {
            searchObjectCollection[key].id = key;
            savedObjects.push(searchObjectCollection[key]);
          });
          resolve(savedObjects);
          console.log(savedObjects);
        })
        .catch((error) => {
          reject(error);
        });
      });
};
let postSearchObject = (searchObject) => {
    return $q((resolve, reject) => {
      $http.post(`${FBCreds.databaseURL}/savedObjects.json`,
        angular.toJson(searchObject))
      .then((ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


let delSearchObject = (searchObjectId) => {
  console.log("inside function 'delSearchObject' in 'SaveSearchFactory'.", searchObjectId);
  return $q((resolve, reject) => {
    $http.delete(`${FBCreds.databaseURL}/savedObjects/${searchObjectId}.json`)
    .then((ObjectFromFirebase) => {
      resolve(ObjectFromFirebase);
    });
  });
};

let getSearchObject = (searchObjectId) => {
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
      angular.toJson(editedObject) )
    .then(function(ObjectFromFirebase){
      resolve(ObjectFromFirebase);
    })
    .catch(function(error){
      reject(error);
    });
  });
};






return {postSearchObject, getSavedObjects, delSearchObject, getSearchObject, updateSearchObject};

});