angular.module('sampleDirectives').directive('secondDirective', function(){
  return function(scope, elem){
    var spanElement = angular.element('<span>' + scope.text + '</span>');
    elem.append(spanElement);

    scope.$watch('text', function(newVal, oldVal){
      spanElement.text(newVal);
    });
  };
});