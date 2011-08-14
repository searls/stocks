window.stocks = {
  populatePredictedValue: function(stockSymbol) {
    $.getJSON('/stock/'+stockSymbol,function(data) {
      var predictedValue = data.supers.ROOT.divisions[0].absVal;
      $('.predictedValue').text(predictedValue);
    });
  }
};