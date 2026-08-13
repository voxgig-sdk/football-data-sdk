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
    childAreas: list
    countryCode: str
    flag: str
    id: int
    name: str
    parentArea: str
    parentAreaId: int


class AreaLoadMatch(TypedDict):
    id: int


class AreaListMatch(TypedDict, total=False):
    childAreas: list
    countryCode: str
    flag: str
    id: int
    name: str
    parentArea: str
    parentAreaId: int


class Competition(TypedDict, total=False):
    address: str
    area: dict
    assists: int
    awayTeam: dict
    clubColors: str
    code: str
    competition: dict
    crest: str
    currentSeason: dict
    emblem: str
    founded: int
    goals: int
    group: str
    homeTeam: dict
    id: int
    lastUpdated: str
    matchday: int
    name: str
    numberOfAvailableSeasons: int
    penalties: int
    player: dict
    score: dict
    season: dict
    shortName: str
    stage: str
    status: str
    table: list
    team: dict
    tla: str
    type: str
    utcDate: str
    venue: str
    website: str


class CompetitionLoadMatch(TypedDict):
    id: str


class CompetitionListMatch(TypedDict, total=False):
    address: str
    area: dict
    assists: int
    awayTeam: dict
    clubColors: str
    code: str
    competition: dict
    crest: str
    currentSeason: dict
    emblem: str
    founded: int
    goals: int
    group: str
    homeTeam: dict
    id: int
    lastUpdated: str
    matchday: int
    name: str
    numberOfAvailableSeasons: int
    penalties: int
    player: dict
    score: dict
    season: dict
    shortName: str
    stage: str
    status: str
    table: list
    team: dict
    tla: str
    type: str
    utcDate: str
    venue: str
    website: str


class Match(TypedDict, total=False):
    area: dict
    awayTeam: dict
    bookings: list
    competition: dict
    goals: list
    group: str
    homeTeam: dict
    id: int
    lastUpdated: str
    matchday: int
    odds: dict
    referees: list
    score: dict
    season: dict
    stage: str
    status: str
    substitutions: list
    utcDate: str
    venue: str


class MatchLoadMatch(TypedDict):
    id: int


class MatchListMatch(TypedDict, total=False):
    area: dict
    awayTeam: dict
    bookings: list
    competition: dict
    goals: list
    group: str
    homeTeam: dict
    id: int
    lastUpdated: str
    matchday: int
    odds: dict
    referees: list
    score: dict
    season: dict
    stage: str
    status: str
    substitutions: list
    utcDate: str
    venue: str


class Person(TypedDict, total=False):
    awayTeam: dict
    competition: dict
    dateOfBirth: str
    firstName: str
    group: str
    homeTeam: dict
    id: int
    lastName: str
    lastUpdated: str
    matchday: int
    name: str
    nationality: str
    position: str
    score: dict
    season: dict
    section: str
    shirtNumber: int
    stage: str
    status: str
    utcDate: str


class PersonLoadMatch(TypedDict):
    id: int


class PersonListMatch(TypedDict):
    id: int


class Team(TypedDict, total=False):
    address: str
    area: dict
    awayTeam: dict
    clubColors: str
    coach: dict
    competition: dict
    crest: str
    founded: int
    group: str
    homeTeam: dict
    id: int
    lastUpdated: str
    matchday: int
    name: str
    runningCompetitions: list
    score: dict
    season: dict
    shortName: str
    squad: list
    staff: list
    stage: str
    status: str
    tla: str
    utcDate: str
    venue: str
    website: str


class TeamLoadMatch(TypedDict):
    id: int


class TeamListMatch(TypedDict, total=False):
    address: str
    area: dict
    awayTeam: dict
    clubColors: str
    coach: dict
    competition: dict
    crest: str
    founded: int
    group: str
    homeTeam: dict
    id: int
    lastUpdated: str
    matchday: int
    name: str
    runningCompetitions: list
    score: dict
    season: dict
    shortName: str
    squad: list
    staff: list
    stage: str
    status: str
    tla: str
    utcDate: str
    venue: str
    website: str
