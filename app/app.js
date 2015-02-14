(function() {

  function calcMacro(macro, weight, isPercentage) {
    if (isPercentage) {
      return Math.round(macro * weight * 100);
    } else {
      return Number(macro * weight).toFixed(2);
    }
  }

  var app = angular.module('nutrition', []);

  app.controller(
    'FoodController',
    ['$scope', '$http', '$location', 
    function($scope, $http, $location) {
    
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

    var url;
    /* should be serving this from localhost server
     * then no conditional url
     */
    if ($location.protocol() === 'file') {
      url = 'http://localhost:50000/nutrition/food?name=';
    } else {
      url = 'https://api.damonmcminn.com/nutrition/food?name=';
    }

    /* has global scope */
    $scope.results = {
      food: [],
      noResults: undefined,
      moreResults: false,
      nextUrl: undefined,
      unit: undefined,
      prevSearch: null,
    };

    /* has global scope
     * should instead be a method
     * this.findFood
     */
    $scope.findFood = function(e) {
      if ($scope.foodForm.$invalid) {
        return;
      }
      
      if (e.target.id === 'find-food') {
        $scope.results.moreResults = false;
        $scope.results.food = [];
      }
      
      // don't bind to $scope
      $scope.results.prevSearch = new Object($scope.food.words).toString();

      var terms = $scope.food.words.split(' ').join('-');
      var isPercentage = !$scope.food.weight;
      var weight = $scope.food.weight || 1;
      
      var req = ($scope.results.moreResults ?
        $scope.results.nextUrl : (url + terms));

      $http.get(req).success(function(data, status, headers, config) {
        $scope.results.noResults = (data.foods.length === 0) ? true : false;
        $scope.results.moreResults = (data.links.next !== undefined);
        $scope.results.unit = isPercentage ? '%' : 'g';
        $scope.results.nextUrl = data.links.next;

        data.foods.forEach(function(food) {
          $scope.results.food.push({
            name: food.name,
            carbs: calcMacro(food.carbohydrate, weight, isPercentage),
          });
        });
      });
    };

    /* has global scope -- no good? */
    $scope.clearForm = function(e) {
      /* clear the form */
      $scope.results.noResults = false;
      $scope.results.food = [];
      $scope.food = '';
      $scope.foodForm.$setPristine();
      e.preventDefault();
    };

  }]);
})();
