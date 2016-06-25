module.exports = CarbController;

function CarbController(CarbFactory) {
  var cf = CarbFactory;
  var vm = this;
  var serverError = 'There was an error contacting the server.';

  vm.httpError = false;
  vm.food = [];

  function success(data) {
    vm.food = vm.food.concat(data.food);
    vm.results = data.results;
  }

  function error(res) {
    vm.httpError = true;
    vm.errorMessage = res.data ? res.data.message : serverError;
    vm.food = [];
    vm.results = {};
  }

  vm.search = function() {
    vm.httpError = false;
    vm.prevSearch = vm.words;
    // success callback concats
    vm.food = [];
    cf.search(vm.words, vm.weight)
      .then(success, error);
  };

  vm.loadMore = function() {
    vm.httpError = false;
    cf.getNext(vm.results.next, vm.weight)
      .then(success, error);
  };

  vm.clear = function(form) {
    vm.httpError = false;
    vm.food = [];
    vm.results = {};
  };
}
