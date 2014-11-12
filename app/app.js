(function() {
  var app = angular.module('nutrition', []);

  app.controller(
    'FoodController',
    ['$scope', '$http', '$location', 
    function($scope, $http, $location) {
    
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

    var url;
    if ($location.protocol() === 'file') {
      url = 'http://localhost:50000/nutrition/food?name=';
    } else {
      url = 'https://api.damonmcminn.com/nutrition/food?name=';
    }

    function calcMacro(macro, weight) {
      return Number(macro * weight).toFixed(2);
    }

    $scope.findFood = function() {
      if ($scope.foodForm.$invalid) {
        return;
      }
      var terms = $scope.food.words.split(' ').join('-');
      var weight = $scope.food.weight || 1;
      $http.get((url + terms)).success(function(data, status, headers, config) {
        var results = [];
        data.foods.forEach(function(food) {
          results.push({
            name: food.name,
            carbs: calcMacro(food.carbohydrate, weight),
          });
        });

        if (results.length === 0) {
          results = [{name: 'No results'}];
        }

        $scope.results = results;
        });

      $scope.clearForm = function() {
        /* clear the form */
        $scope.foodForm.$setPristine();
        $scope.food = null;
      };
    };
  }]);
})();
