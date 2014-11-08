(function() {
  var app = angular.module('nutrition', []);

  app.controller('FoodController', ['$scope', '$http', function($scope, $http) {

    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

    var url = 'http://localhost:50000/food?name=';

    $scope.findFood = function() {
      var terms = $scope.food.words.split(' ').join('-');
      var weight = $scope.food.weight || 1;
      $http.get((url + terms)).success(function(data, status, headers, config) {
        var results = [];
        data.foods.forEach(function(food) {
          results.push({
            name: food.name,
            carbs: Number(food.carbohydrate * weight).toFixed(2) + food.values.unit
          });
        });

        if (results.length === 0) {
          results = [{name: 'No results'}];
        }

        $scope.results = results;
        /* clear the form */
        $scope.food = null;
        $scope.foodForm.$setPristine();
        });
    };
  }]);
})();
