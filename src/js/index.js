var CarbController = require('./carbController');
var CarbFactory = require('./carbFactory');

angular.module('nutrition', [])
  .factory('CarbFactory', ['$http', '$location', CarbFactory])
  .controller('CarbController', ['CarbFactory', CarbController])
