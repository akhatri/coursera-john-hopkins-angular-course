(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {

  $scope.items = '';
  $scope.message = '';

  $scope.check = function() {

    var itemString = $scope.items;

    if ($scope.items.length == 0) {
      $scope.message = "Please enter data first!";
      return false;
    }
    else {
      var splitItems = itemString.split(',');
      checkItems(splitItems);
    }
  }

  function checkItems(itemArray) {
    if (itemArray.length <=3) {
      $scope.message = "Enjoy!";
    } else if (itemArray.length > 3) {
      $scope.message = "Too much!";
    }
  }

});


})();
