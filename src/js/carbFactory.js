var qs = require('querystring');

module.exports = CarbFactory;

function calcMacro(macro, weight, isPercentage) {
  if (isPercentage) {
    return Math.round(macro * weight * 100);
  } else {
    return Number(macro * weight).toFixed(2);
  }
}

function processResults(data, mass, isPercentage) {
  return {
    results: {
      none: (data.foods.length === 0),
      more: (data.links.next !== undefined),
      unit: isPercentage ? '%' : 'g',
      next: data.links.next
    },
    food: data.foods.map(function(food) {
      return {
        name: food.name,
        carbs: calcMacro(food.carbohydrate, mass, isPercentage)
      }
    })
  }
}

function CarbFactory($http, $location) {

  // CORS stuff
  $http.defaults.useXDomain = true;
  delete $http.defaults.headers.common['X-Requested-With'];

  var isLocal = ($location.host() === 'localhost');
  var localhost = 'http://api.dev/nutrition/food';
  var webhost = 'https://api.damonmcminn.com/nutrition/food';
  var host = (isLocal ? localhost : webhost);
  

  function findFood(url, weight) {
    var isPercentage = (weight === undefined);
    var mass = weight || 1;

    return $http.get(url)
      .then(function(res) {
        var OK = (res.status === 200);
        return OK ? processResults(res.data, mass, isPercentage) : {};
      });
  }

  return {
    search: function(search, weight) {
      // 'polar bear' -> 'search=polar&search=bear'
      // 'polar     bear' -> 'search=polar&search=bear'
      var terms = search.split(' ')
        .filter(function(word) {
          return word.length > 0;
        });
      var req = host + '?' + qs.stringify({search: terms});
      return findFood(req, weight);
    },
    getNext: findFood,
  }
}
