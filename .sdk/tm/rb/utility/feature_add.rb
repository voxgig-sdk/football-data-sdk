# FootballData SDK utility: feature_add
module FootballDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
