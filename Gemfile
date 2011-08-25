source 'http://rubygems.org'

group :production do
  gem 'httparty'
  gem 'nokogiri'
  gem 'sinatra'
end

group :test, :development do
  if RUBY_PLATFORM =~ /darwin/i
    gem 'rb-fsevent', :require => false
  end

  gem 'guard-rails-assets'
  gem 'guard-jasmine-headless-webkit'
  gem 'jasmine'
  gem 'jasmine-headless-webkit'
end
