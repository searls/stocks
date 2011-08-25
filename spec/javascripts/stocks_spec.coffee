describe "Stocks", ->
  describe "#get_quote_for", ->
    it "returns a json hash", ->
      result = get_quote_for("AAPL")
      expect(result).toBe({"price":"500","value":"1000"})
