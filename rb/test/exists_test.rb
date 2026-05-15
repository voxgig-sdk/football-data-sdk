# FootballData SDK exists test

require "minitest/autorun"
require_relative "../FootballData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FootballDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
