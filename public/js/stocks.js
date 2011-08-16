window.stocks = {
  populatePredictedValue: function(stockSymbol) {
    $.getJSON('/stock/'+stockSymbol,function(data) {
      var predictedValue = data.supers.ROOT.divisions[0].absVal;
      $('.predictedValue').text(predictedValue);
    });
  }
};

$(function() {
  $('input[name="stockSymbol"]').live('change',function(e) {
    e.preventDefault();
    stocks.populatePredictedValue($(this).val());
  });
});
