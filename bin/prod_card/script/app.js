(function() {
  'use strict';

  angular.module('PordCard',[])
  .controller('ProdCardController',ProdCardController)
  .service('GetProdService',GetProdService)
  .directive('imageSlider',ImageSliderDirective)

  function ImageSliderDirective(){
    let ddo = {
      templateUrl: 'snippets/slides_directive.html',
      scope: {
        product: '<',
        imageIndex: '<',
        activeSlide: '<'
      },
      // controller: 'ImageSliderDirectiveController as sliderCtrl',
      // bindToController: true,
      restrict:'E'
    };

    return ddo;
  };

  ProdCardController.$inject=['GetProdService'];
  function ProdCardController(GetProdService){
    var ctrl = this;
    ctrl.product;
    ctrl.cart;

    ctrl.find = function(color){
      if (!color) {
        color = "black";
      };

      var foundPromise = GetProdService.getProduct(color);
      foundPromise.then(function(obj){
        ctrl.product=obj;
        ctrl.imageIndex = [];
        for (let i=0;i<ctrl.product.images;i++){
          ctrl.imageIndex.push(i);
        };
        ctrl.quantity = 1;
        ctrl.activeSlide = 0;
      }).catch(error=>console.log(error.message));
    };
    ctrl.find();


    ctrl.more = function(){
      ctrl.quantity += 1;
    };
    ctrl.less = function(){
      if (ctrl.quantity>1){
        ctrl.quantity -= 1;
      };
    };

    ctrl.activeSlideClass = function(index){
      if (ctrl.activeSlide===index){
        return "active";
      };
    };
    ctrl.changeSlide = function(id){
      ctrl.activeSlide = id;
    }

    ctrl.prevSlide = function(){
      var thisSlide = ctrl.activeSlide;
      ctrl.activeSlide = (thisSlide-1)%ctrl.product.images;
    };

    ctrl.nextSlide = function(){
      var thisSlide = ctrl.activeSlide;
      ctrl.activeSlide = (thisSlide+1)%ctrl.product.images;
    };

    ctrl.addToChart = function(){
      if (!ctrl.cart) {ctrl.cart = []};
      var addedItem = {
        productId: ctrl.product.id,
        quantity: ctrl.quantity
      };
      ctrl.cart.push(addedItem);
      console.log(ctrl.cart);
    };
  };


  GetProdService.$inject = ['$http'];
  function GetProdService($http){
    var service = this;
    service.product ={};

    service.getProduct = function(color){
      let path = '../json/product.json';

      return $http.get(path)    //a shortcut method fot GET requests
      .then(function (result) {
        let prodList = result.data.product_items;

        for (let i=0;i<prodList.length;i++){
          if (prodList[i].color.includes(color)){
            service.product = prodList[i];
            return service.product;
          } else {
            service.product = "Nothing found";
          };
        };

        return service.product;
      })
      .catch(error=>error.message);
    };

  };

}());
