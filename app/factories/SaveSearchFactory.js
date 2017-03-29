"use strict";

app.factory("SearchFactory", function ($q, $http, FBCreds, AuthFactory){

  let user = AuthFactory.getUser();

      
      let savedObjects = [];

    
    let postSearchObject = (searchObject) => {
        return $q((resolve, reject) => {
          $http.post(`${FBCreds.databaseURL}/savedSearches.json`,
            angular.toJson(searchObject))
          .then((ObjectFromFirebase) => {
            console.log("data from search factory", searchObject);
            resolve(ObjectFromFirebase);
          })
          .catch((error) => {
            reject(error);
          });
        });
      };

    let getSavedObjects = (user) => {
      return $q( (resolve, reject) => {
        // plug in url, we want it to evaluate on (user uid)
        console.log("user list:", `${FBCreds.databaseURL}/savedSearches.json?orderBy="uid"&equalTo"${user}"`);

        $http.get(`${FBCreds.databaseURL}/savedSearches.json?orderBy="uid"&equalTo="${user}"`)
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


    let delSearchObject = (searchObjectId) => {
      console.log("inside function 'delSearchObject' in 'SearchFactory'.", searchObjectId);
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