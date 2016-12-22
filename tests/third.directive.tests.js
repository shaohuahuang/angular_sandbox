var compile, scope, directiveElem;

describe('test third directive', function(){
  beforeEach(function() {
    module('sampleDirectives');
    inject(function ($compile, $rootScope) {
      compile=$compile;
      scope=$rootScope.$new();
      scope.config = {
        prop: 'value'
      };
      scope.notify = true;
      scope.onChange = jasmine.createSpy('onChange');
    });
    directiveElem = getCompiledElement();
  });

  it('config on isolated scope should be two-way bound', function(){
    var isolatedScope = directiveElem.isolateScope();

    isolatedScope.config.prop = "value2";

    expect(scope.config.prop).toEqual('value2');
    expect(isolatedScope.a).toBe(12);
    expect(isolatedScope.b()).toBe(12)
  });

  it('notify on isolated scope should be one-way bound', function(){
    var isolatedScope = directiveElem.isolateScope();

    isolatedScope.notify = false;

    expect(scope.notify).toEqual(true);
  });

  it('onChange should be a function', function(){
    var isolatedScope = directiveElem.isolateScope();

    expect(typeof(isolatedScope.onChange)).toEqual('function');
  });

  it('should call onChange method of scope when invoked from isolated scope', function () {
    var isolatedScope = directiveElem.isolateScope();
    isolatedScope.onChange();

    expect(scope.onChange).toHaveBeenCalled();
  });

  function getCompiledElement() {
    var compiledDirective = compile(angular.element('<third-directive config="config" notify="notify" on-change="onChange()"></third-directive>'))(scope);
    scope.$digest();
    return compiledDirective;
  }
});

