# FootballData SDK feature factory

from footballdata_sdk.feature.base_feature import FootballDataBaseFeature
from footballdata_sdk.feature.ratelimit_feature import FootballDataRatelimitFeature
from footballdata_sdk.feature.retry_feature import FootballDataRetryFeature
from footballdata_sdk.feature.test_feature import FootballDataTestFeature
from footballdata_sdk.feature.timeout_feature import FootballDataTimeoutFeature


_FEATURES = {
    "base": lambda: FootballDataBaseFeature(),
    "ratelimit": lambda: FootballDataRatelimitFeature(),
    "retry": lambda: FootballDataRetryFeature(),
    "test": lambda: FootballDataTestFeature(),
    "timeout": lambda: FootballDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
