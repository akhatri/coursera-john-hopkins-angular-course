(function() {

    'use strict';
    angular
        .module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];

    function ToBuyShoppingController($scope, ShoppingListCheckOffService) {
        var toBuy = this;

        // get the items from the service
        toBuy.items = ShoppingListCheckOffService.getInitialItems();
        toBuy.status = false; // status of the to buy list

        toBuy.addToList = function(item, index) {

            // add the items and update array list using the service
            ShoppingListCheckOffService.addItem(item.name, item.quantity, item.desc);
            ShoppingListCheckOffService.updateToBuyList(index);
        }

        toBuy.isShoppingListEmpty = function() {
          return ShoppingListCheckOffService.getToBuyListStatus();
        }
    }

    AlreadyBoughtShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];

    function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {
        var alreadyBought = this;

        // get the bought items from the service
        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

        alreadyBought.isShoppingListEmpty = function() {
          return ShoppingListCheckOffService.getBoughtListStatus();
        }
    }

    function ShoppingListCheckOffService() {

        var service = this;

        var toBuyList = [{
            name: "Cookies",
            quantity: 10,
            desc: 'bags of'
        }, {
            name: "Chips",
            quantity: 20,
            desc: 'packets of'
        }, {
            name: "Milk",
            quantity: 5,
            desc: 'bottles of'
        }];

        var boughtList = [];

        var toBuyStatus = true;
        var alreadyBoughtStatus = true;
        var shoppingListStatus;

        service.addItem = function(itemName, itemQuantity, itemDesc) {
            var item = {
                name: itemName,
                quantity: itemQuantity,
                desc: itemDesc
            }
            boughtList.push(item);
        }

        service.updateToBuyList = function(itemIndex) {
            toBuyList.splice(itemIndex, 1)
        }

        service.getInitialItems = function() {
            return toBuyList;
        }

        service.getBoughtItems = function() {
            return boughtList;
        }

        service.getToBuyListStatus = function() {
          return shoppingListStatus = toBuyList.length ? false : true;
        }

        service.getBoughtListStatus = function() {
          return shoppingListStatus = boughtList.length ? true : false;
        }

    }

})();
