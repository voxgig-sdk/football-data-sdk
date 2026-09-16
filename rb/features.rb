# FootballData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FootballDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      FootballDataBaseFeature.new
    when "ratelimit"
      FootballDataRatelimitFeature.new
    when "retry"
      FootballDataRetryFeature.new
    when "test"
      FootballDataTestFeature.new
    when "timeout"
      FootballDataTimeoutFeature.new
    else
      FootballDataBaseFeature.new
    end
  end
end
