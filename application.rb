require 'sinatra'
require 'httparty'
require 'nokogiri'

get '/stock/:stock_symbol' do |stock_symbol|
  grab "http://www.trefis.com/servlet/HtmlService/getSuperDivisionSankeys?symbol=#{stock_symbol}&width=380"
end

get '/scrape/:stock_symbol' do |stock_symbol|
  grab "http://www.bing.com/finance/search?q=#{stock_symbol}&ss=7&FORM=DTPFIO"
end

def grab url
  response = HTTParty.get(url)
  
  response.body
end
