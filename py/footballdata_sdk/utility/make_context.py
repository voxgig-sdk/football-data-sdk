# FootballData SDK utility: make_context

from footballdata_sdk.core.context import FootballDataContext


def make_context_util(ctxmap, basectx):
    return FootballDataContext(ctxmap, basectx)
