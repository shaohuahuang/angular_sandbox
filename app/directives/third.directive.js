angular.module('sampleDirectives').directive('thirdDirective', function () {
  return {
    scope:{
      config: '=',
      notify: '@',
      onChange:'&'
    },
    link: function(scope){
      console.log('fun');
      scope.a = 12;
      scope.b = function () {
        return 12
      }
    }
  }
});