angular.module('sampleDirectives', []).directive('firstDirective', function() {
  return function(scope, elem){
    elem.append('<span>This span is appended from directive.</span>');
  };
});