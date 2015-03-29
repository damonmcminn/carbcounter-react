module.exports = CarbFactory;

function calcMacro(macro, weight, isPercentage) {
  if (isPercentage) {
    return Math.round(macro * weight * 100);
  } else {
    return Number(macro * weight).toFixed(2);
  }
}

function CarbFactory($http, $location) {

  // CORS stuff
  $http.defaults.useXDomain = true;
  delete $http.defaults.headers.common['X-Requested-With'];

  var isLocal = ($location.host() === 'localhost');
  var localhost = 'http://localhost:50000/';
  var webhost = 'https://api.damonmcminn.com/';
  var host = (isLocal ? localhost : webhost) + 'nutrition/food?name=';
  
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
      var terms = search.split(' ').join('-');            
      var req = host + terms;
      return findFood(req, weight);
    },
    getNext: findFood,
  }
}
      
