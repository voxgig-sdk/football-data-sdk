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
    area: dict
    code: str
    currentSeason: dict
    emblem: str
    id: int
    lastUpdated: str
    name: str
    numberOfAvailableSeasons: int
    type: str


class CompetitionLoadMatch(TypedDict):
    id: str


class CompetitionListMatch(TypedDict, total=False):
    area: str


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
    competition: str
    date_from: str
    date_to: str
    status: str


class Person(TypedDict, total=False):
    dateOfBirth: str
    firstName: str
    id: int
    lastName: str
    lastUpdated: str
    name: str
    nationality: str
    position: str
    section: str
    shirtNumber: int


class PersonLoadMatch(TypedDict):
    id: int


class PersonListMatchRequired(TypedDict):
    id: int


class PersonListMatch(PersonListMatchRequired, total=False):
    competition: str
    date_from: str
    date_to: str
    limit: int
    status: str


class Team(TypedDict, total=False):
    address: str
    area: dict
    clubColors: str
    coach: dict
    crest: str
    founded: int
    id: int
    lastUpdated: str
    name: str
    runningCompetitions: list
    shortName: str
    squad: list
    staff: list
    tla: str
    venue: str
    website: str


class TeamLoadMatch(TypedDict):
    id: int


class TeamListMatch(TypedDict, total=False):
    limit: int
    offset: int
