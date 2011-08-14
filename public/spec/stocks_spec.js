describe("stocks", function() {
  var $result;
  describe("#populatePredictedValue", function() {
    beforeEach(function() {
      $result = $.jasmine.inject('<span class="predictedValue"></span>');
      spyOn($, "getJSON").andCallFake(function(url,response) {
        response({
          "supers": {
            "ROOT": { 
              "divisions": [{"absVal":"$678"}]
            }
          }
        });
      });
      
      stocks.populatePredictedValue("CORY");
    });
    
    it("populates a span with the value", function() {
      expect($result).toHaveText("$678");
    });
    
    it("hits the right url for the stock", function() {
      expect($.getJSON.mostRecentCall.args[0]).toBe('/stock/CORY');
    });
  });
});
