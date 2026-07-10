# Typed models for the FootballData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Area(TypedDict, total=False):
    child_area: list
    country_code: str
    flag: str
    id: int
    name: str
    parent_area: str
    parent_area_id: int


class AreaLoadMatch(TypedDict):
    id: int


class AreaListMatch(TypedDict, total=False):
    child_area: list
    country_code: str
    flag: str
    id: int
    name: str
    parent_area: str
    parent_area_id: int


class Competition(TypedDict, total=False):
    address: str
    area: dict
    assist: int
    away_team: dict
    club_color: str
    code: str
    competition: dict
    crest: str
    current_season: dict
    emblem: str
    founded: int
    goal: int
    group: str
    home_team: dict
    id: int
    last_updated: str
    matchday: int
    name: str
    number_of_available_season: int
    penalty: int
    player: dict
    score: dict
    season: dict
    short_name: str
    stage: str
    status: str
    table: list
    team: dict
    tla: str
    type: str
    utc_date: str
    venue: str
    website: str


class CompetitionLoadMatch(TypedDict):
    id: str


class CompetitionListMatch(TypedDict, total=False):
    address: str
    area: dict
    assist: int
    away_team: dict
    club_color: str
    code: str
    competition: dict
    crest: str
    current_season: dict
    emblem: str
    founded: int
    goal: int
    group: str
    home_team: dict
    id: int
    last_updated: str
    matchday: int
    name: str
    number_of_available_season: int
    penalty: int
    player: dict
    score: dict
    season: dict
    short_name: str
    stage: str
    status: str
    table: list
    team: dict
    tla: str
    type: str
    utc_date: str
    venue: str
    website: str


class Match(TypedDict, total=False):
    area: dict
    away_team: dict
    booking: list
    competition: dict
    goal: list
    group: str
    home_team: dict
    id: int
    last_updated: str
    matchday: int
    odd: dict
    referee: list
    score: dict
    season: dict
    stage: str
    status: str
    substitution: list
    utc_date: str
    venue: str


class MatchLoadMatch(TypedDict):
    id: int


class MatchListMatch(TypedDict, total=False):
    area: dict
    away_team: dict
    booking: list
    competition: dict
    goal: list
    group: str
    home_team: dict
    id: int
    last_updated: str
    matchday: int
    odd: dict
    referee: list
    score: dict
    season: dict
    stage: str
    status: str
    substitution: list
    utc_date: str
    venue: str


class Person(TypedDict, total=False):
    away_team: dict
    competition: dict
    date_of_birth: str
    first_name: str
    group: str
    home_team: dict
    id: int
    last_name: str
    last_updated: str
    matchday: int
    name: str
    nationality: str
    position: str
    score: dict
    season: dict
    section: str
    shirt_number: int
    stage: str
    status: str
    utc_date: str


class PersonLoadMatch(TypedDict):
    id: int


class PersonListMatch(TypedDict):
    id: int


class Team(TypedDict, total=False):
    address: str
    area: dict
    away_team: dict
    club_color: str
    coach: dict
    competition: dict
    crest: str
    founded: int
    group: str
    home_team: dict
    id: int
    last_updated: str
    matchday: int
    name: str
    running_competition: list
    score: dict
    season: dict
    short_name: str
    squad: list
    staff: list
    stage: str
    status: str
    tla: str
    utc_date: str
    venue: str
    website: str


class TeamLoadMatch(TypedDict):
    id: int


class TeamListMatch(TypedDict, total=False):
    address: str
    area: dict
    away_team: dict
    club_color: str
    coach: dict
    competition: dict
    crest: str
    founded: int
    group: str
    home_team: dict
    id: int
    last_updated: str
    matchday: int
    name: str
    running_competition: list
    score: dict
    season: dict
    short_name: str
    squad: list
    staff: list
    stage: str
    status: str
    tla: str
    utc_date: str
    venue: str
    website: str
