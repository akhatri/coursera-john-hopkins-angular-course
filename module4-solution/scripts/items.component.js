(function () {
'use strict';

angular.module('data')
.component('itemsData', {
  templateUrl: 'snippet/itemsData.html',
  bindings: {
    items: '<'
  }
});

})();
