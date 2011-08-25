// console.log("spec is running");

// var build_url_for = function(stockSymbol) {
//   var host = "www.trefis.com";
//   var path = "/servlet/HtmlService/getSuperDivisionSankeys";
//   var params = "symbol=" + stockSymbol;
//   var url = "http://" + host + path + "?" + params;
//
//   return url;
// };
//
// var get_quote_for = function(stockSymbol) {
//   var url = build_url_for(stockSymbol);
//   console.log(url);
//   return {"price":"600","value":"300"};
// };
//
// describe("#build_url_for", function() {
//   it("returns a url for an api endpoint", function () {
//     var result = build_url_for("AAPL");
//     var actual = "http://www.trefis.com/servlet/HtmlService/getSuperDivisionSankeys?symbol=AAPL";
//     expect(result).toEqual(actual);
//   });
// });
//
// describe("stocks", function() {
//   it("calls a web service for a quote", function () {
//     var result = get_quote_for("AAPL");
//     expect(result).toEqual({"price":"600","value":"300"});
//   });
// });

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
