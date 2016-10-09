(function () {
'use strict';

angular.module('data')
.component('categoriesData', {
  templateUrl: 'snippet/categoriesData.html',
  bindings: {
    categories: '<'
  }
});

})();
