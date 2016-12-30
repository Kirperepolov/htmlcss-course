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
        imageIndex: '<'
      },
      // controller: 'FoundItemsDirectiveController as itemsCtrl',
      // bindToController: true,
      restrict:'E'
    };

    return ddo;
  };

  ProdCardController.$inject=['GetProdService'];
  function ProdCardController(GetProdService){
    var ctrl = this;
    ctrl.product;
    ctrl.quantity = 1;
    ctrl.imageIndex = [];
    ctrl.activeSlide = 1;

    ctrl.find = function(searchItem){
      if (typeof(searchItem) !== 'number') {
        searchItem = 505795;
      };

        var foundPromise = GetProdService.getProduct(searchItem);
        foundPromise.then(function(obj){
          ctrl.product=obj;
          for (let i=0;i<ctrl.product.images;i++){
            ctrl.imageIndex.push(i);
          };
        }).catch(error=>console.log(error.message));
    };
    ctrl.find();
    
    if(ctrl.product){
      var activeSliderBar = document.querySelector('.slider-control');
      activeSliderBar.children[ctrl.activeSlide].className='active';
    }

    ctrl.more = function(){
      ctrl.quantity += 1;
    };
    ctrl.less = function(){
      if (ctrl.quantity>1){
        ctrl.quantity -= 1;
      };
    };

  };

  GetProdService.$inject = ['$http'];
  function GetProdService($http){
    var service = this;
    service.product ={};

    service.getProduct = function(searchId){
      let path = '../json/product.json';

      return $http.get(path)    //a shortcut method fot GET requests
      .then(function (result) {
        let prodList = result.data.product_items;

        for (let i=0;i<prodList.length;i++){
          // if (prodList[i].id.includes(searchId)){
            service.product = prodList[i];
          // };
        };

        return service.product;
      })
      .catch(error=>error.message);
    };

  };

}());
