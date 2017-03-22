"use strict";

app.factory("SaveSearchFactory", ($q, $http, FBCreds) => {

let saveSearch = (searchObject) => {
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



return {saveSearch};

});