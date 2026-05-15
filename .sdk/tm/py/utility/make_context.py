# FootballData SDK utility: make_context

from core.context import FootballDataContext


def make_context_util(ctxmap, basectx):
    return FootballDataContext(ctxmap, basectx)
