module.exports = CarbController;

function CarbController(CarbFactory) {
  var cf = CarbFactory;
  var vm = this;

  vm.search = function() {
    vm.prevSearch = vm.words;
    cf.search(vm.words, vm.weight)
      .then(function(data) {
        vm.food = data.food;
        vm.results = data.results;
      });
  };

  vm.loadMore = function() {
    cf.getNext(vm.results.next, vm.weight)
      .then(function(data) {
        vm.results = data.results;
        vm.food = vm.food.concat(data.food);
      });
  };

  vm.clear = function(form) {
    delete vm.food;
    delete vm.results;
  };
}
