# FootballData SDK utility: make_context
require_relative '../core/context'
module FootballDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    FootballDataContext.new(ctxmap, basectx)
  }
end
