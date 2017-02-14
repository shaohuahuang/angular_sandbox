describe('example', function(){
  describe('example config', function(){
    var $locationProvider;

    beforeEach(function(){
      module(function(_$locationProvider_) { //load an anonymous module
        $locationProvider = _$locationProvider_;
        spyOn($locationProvider, 'html5Mode');
      });
      module('example');
      inject(); //call inject to actually load and run the modules correctly
    })

    it('should set html5 mode', function() {
      expect($locationProvider.html5Mode)
        .toHaveBeenCalledWith(true);
    });
  });

  describe('example run', function(){
    var loggingService;
    beforeEach(function(){
      module('example', function($provide){
        $provide.value('loggingService',{
          start: createSpy()
        })
      })

      inject(function(_loggingService_){
        loggingService = _loggingService_
      })
    })

    //it('should start logging service', function() {
    //  expect(loggingService.start).toHaveBeenCalled();
    //});
  })
});