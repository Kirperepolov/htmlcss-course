(function() {
  'use strict';

  angular.module('PordCard',[])
  .controller('ProdCardController',ProdCardController)
  .service('GetProdService',GetProdService)
  .directive('imageSlider',ImageSliderDirective)


  /**
   * ImageSliderDirective - a separate directive for product images
   *
   * @return {type}  description
   */
  function ImageSliderDirective(){
    let ddo = {
      templateUrl: 'snippets/slides_directive.html',
      scope: {
        product: '<',
        imageIndex: '<',
        activeSlide: '<'
      },
      restrict:'E'
    };

    return ddo;
  };



  /**
   * ProdCardController - the main application controller
   *
   * @param  {service} GetProdService the injected singleton service for
   *              data retrieving and storing
   *
   */
  ProdCardController.$inject=['GetProdService'];
  function ProdCardController(GetProdService){
    var ctrl = this;
    ctrl.product; //is supposed for the product object
    ctrl.cart;   //a shopping cart array. It is fullfiled when users add
                // products to it in format {productId:id,quantity:quantity}

    /**
     * ctrl - in this app the find function searches products by colors, but
     *        it can be easily changed
     *
     * @param  {string} color a desired color of a product
     * @return        the function returns nothing, however, it changes
     *            a set of controller parameters
     */
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
        ctrl.quantity = 1;    //resets a product quantity, which
                              //can be added to the cart;
        ctrl.activeSlide = 0; //resets an active slide in the slider
        ctrl.canRate = true;  //an option, that controls whether a user can
                              //rate the product
      }).catch(error=>console.log(error.message));
    };
    ctrl.$onInit = ctrl.find;


    /**
     * ctrl.more() - increases the quantity of products by 1
     */
    ctrl.more = function(){
      ctrl.quantity = parseInt(ctrl.quantity,10)+1;
    };
    /**
     * ctrl.less() - decreases the quantity of products by 1
     */
    ctrl.less = function(){
      if (ctrl.quantity>1){
        ctrl.quantity -= 1;
      };
    };

    //this function is used by ng-class to check what className is needed
    ctrl.activeSlideClass = function(index){
      if (ctrl.activeSlide===index){
        return "active";
      };
    };
    //next three functions are used by the slider to change images
    ctrl.changeSlide = function(id){
      ctrl.activeSlide = id;
    };
    ctrl.prevSlide = function(){
      var thisSlide = ctrl.activeSlide;
      ctrl.activeSlide = (thisSlide-1)%ctrl.product.images;
    };
    ctrl.nextSlide = function(){
      var thisSlide = ctrl.activeSlide;
      ctrl.activeSlide = (thisSlide+1)%ctrl.product.images;
    };

    /**
     * ctrl.addToChart() - the functon adds the desired quantity of products
     *            to the cart
     *
     */
    ctrl.addToChart = function(){
      if (!ctrl.cart) {ctrl.cart = []};
      var addedItem = {
        productId: ctrl.product.id,
        quantity: ctrl.quantity
      };
      ctrl.cart.push(addedItem);
      console.log(ctrl.cart); //as the cart itself is not available in the
                        //appication, it is useful to have a look in it
                        // in a console
    };

    /**
     * ctrl.addRating(index) - this function is invoked when the user
     *    rates the product. It doesn't send data to the server, but
     *    is supposed to do so.
     *
     * @param  {number} index a mark form 1 to 5 which user chooses for
     *                        the product
     *
     */
    ctrl.addRating = function(index){
      if (ctrl.canRate){
        var totalRating = ctrl.product.rating * ctrl.product.reviews;
        totalRating += index;
        ctrl.product.reviews++;
        ctrl.product.rating = Math.round(totalRating/ctrl.product.reviews*100)/100;
        ctrl.canRate = false;
      } else {alert("You are allowed to rate only once!")};
    };
  };


  /**
   * GetProdService - the service retrieves and stores all the product data
   *
   * @param  {service} $http an injected http service
   * @return {promise} service.product  - the retrieved product object
   *                            in a promise wrapping
   */
  GetProdService.$inject = ['$http'];
  function GetProdService($http){
    var service = this;
    service.product ={};

    service.getProduct = function(color){
      let path = 'json/product.json';

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
