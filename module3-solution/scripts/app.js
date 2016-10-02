(function() {

    'use strict';

    angular
        .module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .directive('foundItems', FoundItemsDirective)
        .service('MenuSearchService', MenuSearchService);


    function FoundItemsDirective() {
      var directive = {
        templateUrl: 'foundItems.html',
        scope: {
          found: '<',
          onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
      };

      return directive;
    }

    function FoundItemsDirectiveController() {
      var list = this;

      list.isEmpty = function() {
        return list.found.length === 0;
      }

    }

    NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];

    function NarrowItDownController($scope, MenuSearchService) {
        var vm = this;

        vm.searchTerm = '';
        vm.items = [];

        vm.narrowMenu = function() {

          if (vm.searchTerm.length == 0) {
            vm.items = [];
            console.log('empty');
            return false;
          } else {
            var promise = MenuSearchService.getMatchedMenuItems(vm.searchTerm);

            promise.then(function(response) {
              vm.items = response;

            }).catch(function(error) {
              console.log('error has occured');
            });
          }
        };

        vm.removeItem = function(index) {
          vm.items.splice(index, 1);
        };

    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {

        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
          return $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
          })
          .then(function(response) {

            // process all results
            var items = response.data.menu_items;
            var foundItems = [];

            for (var i = 0; i < items.length; i++) {

              if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
                foundItems.push(items[i]);
              }
            }
            return foundItems;
          });

        };
    }

})();
