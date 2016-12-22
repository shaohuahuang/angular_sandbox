var compile, scope, directiveElem;

describe('test sample directive', function(){
  beforeEach(function(){
    module("sampleDirectives");
    inject(function($compile, $rootScope){
      compile = $compile;
      scope = $rootScope.$new();
    });
    directiveElem = getCompiledElement();
  });

  it('should have updated text in span', function (){
    scope.text = 'some other text';
    scope.$digest();
    var spanElement = directiveElem.find('span');
    expect(spanElement).toBeDefined();
    expect(spanElement.text()).toEqual(scope.text);
  });

  function getCompiledElement(){
    var element = angular.element('<div second-directive></div>');
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});

