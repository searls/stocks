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

describe("jQuery event wiring", function() {
  var $input, expectedEvent, expected = "PANDA";

  describe("changing the stock symbol field", function() {
    beforeEach(function() {
      $input = $.jasmine.inject('<input name="stockSymbol" value="'+expected+'"/>');
      spyOn(stocks, "populatePredictedValue");
      expectedEvent = jQuery.Event("change");
      spyOn(expectedEvent, "preventDefault");
      
      $input.trigger(expectedEvent);
    });
    
    it("populates the predicted value for the stock", function() {
      expect(stocks.populatePredictedValue).toHaveBeenCalledWith(expected);
    });
    
    it("prevents the default event behavior", function() {
      expect(expectedEvent.preventDefault).toHaveBeenCalled();
    });
  });
});