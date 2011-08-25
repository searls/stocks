// console.log("spec is running");

//
//
// describe("stocks", function() {
//   it("calls a web service for a quote", function () {
//     var result = get_quote_for("AAPL");
//     expect(result).toEqual({"price":"600","value":"300"});
//   });
// });

var buildUrlFor = function(stockSymbol) {
  var host, path, params, url;

  host = "www.trefis.com";
  path = "/servlet/HtmlService/getSuperDivisionSankeys";
  params = "symbol=" + stockSymbol;
  url = "http://" + host + path + "?" + params;

  return url;
};

var getQuoteFor = function(stockSymbol) {
  var url = buildUrlFor(stockSymbol);
  response = $.getJSON(url, function(data) {
  });
  console.log(response);

  return response;
};

describe("stocks", function() {
  var $result;

  describe("#buildUrlFor", function() {
    it("returns a url for an api endpoint", function () {
      var result = buildUrlFor("AAPL");
      var actual = "http://www.trefis.com/servlet/HtmlService/getSuperDivisionSankeys?symbol=AAPL";
        expect(result).toEqual(actual);
    });
  });

  describe("#getQuoteFor", function() {
    it("calls a web service for a quote", function () {
      var result = getQuoteFor("AAPL");
      expect(result).toEqual({"price":"600","value":"300"});
    });
  });

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
