# FootballData SDK feature factory

from feature.base_feature import FootballDataBaseFeature
from feature.test_feature import FootballDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FootballDataBaseFeature(),
        "test": lambda: FootballDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
