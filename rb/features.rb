# FootballData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FootballDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      FootballDataBaseFeature.new
    when "test"
      FootballDataTestFeature.new
    else
      FootballDataBaseFeature.new
    end
  end
end
