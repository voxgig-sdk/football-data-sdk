# Typed models for the FootballData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Area:
    child_area: Optional[list] = None
    country_code: Optional[str] = None
    flag: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    parent_area: Optional[str] = None
    parent_area_id: Optional[int] = None


@dataclass
class AreaLoadMatch:
    id: int


@dataclass
class AreaListMatch:
    child_area: Optional[list] = None
    country_code: Optional[str] = None
    flag: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    parent_area: Optional[str] = None
    parent_area_id: Optional[int] = None


@dataclass
class Competition:
    address: Optional[str] = None
    area: Optional[dict] = None
    assist: Optional[int] = None
    away_team: Optional[dict] = None
    club_color: Optional[str] = None
    code: Optional[str] = None
    competition: Optional[dict] = None
    crest: Optional[str] = None
    current_season: Optional[dict] = None
    emblem: Optional[str] = None
    founded: Optional[int] = None
    goal: Optional[int] = None
    group: Optional[str] = None
    home_team: Optional[dict] = None
    id: Optional[int] = None
    last_updated: Optional[str] = None
    matchday: Optional[int] = None
    name: Optional[str] = None
    number_of_available_season: Optional[int] = None
    penalty: Optional[int] = None
    player: Optional[dict] = None
    score: Optional[dict] = None
    season: Optional[dict] = None
    short_name: Optional[str] = None
    stage: Optional[str] = None
    status: Optional[str] = None
    table: Optional[list] = None
    team: Optional[dict] = None
    tla: Optional[str] = None
    type: Optional[str] = None
    utc_date: Optional[str] = None
    venue: Optional[str] = None
    website: Optional[str] = None


@dataclass
class CompetitionLoadMatch:
    id: str


@dataclass
class CompetitionListMatch:
    id: str


@dataclass
class Match:
    area: Optional[dict] = None
    away_team: Optional[dict] = None
    booking: Optional[list] = None
    competition: Optional[dict] = None
    goal: Optional[list] = None
    group: Optional[str] = None
    home_team: Optional[dict] = None
    id: Optional[int] = None
    last_updated: Optional[str] = None
    matchday: Optional[int] = None
    odd: Optional[dict] = None
    referee: Optional[list] = None
    score: Optional[dict] = None
    season: Optional[dict] = None
    stage: Optional[str] = None
    status: Optional[str] = None
    substitution: Optional[list] = None
    utc_date: Optional[str] = None
    venue: Optional[str] = None


@dataclass
class MatchLoadMatch:
    id: int


@dataclass
class MatchListMatch:
    area: Optional[dict] = None
    away_team: Optional[dict] = None
    booking: Optional[list] = None
    competition: Optional[dict] = None
    goal: Optional[list] = None
    group: Optional[str] = None
    home_team: Optional[dict] = None
    id: Optional[int] = None
    last_updated: Optional[str] = None
    matchday: Optional[int] = None
    odd: Optional[dict] = None
    referee: Optional[list] = None
    score: Optional[dict] = None
    season: Optional[dict] = None
    stage: Optional[str] = None
    status: Optional[str] = None
    substitution: Optional[list] = None
    utc_date: Optional[str] = None
    venue: Optional[str] = None


@dataclass
class Person:
    away_team: Optional[dict] = None
    competition: Optional[dict] = None
    date_of_birth: Optional[str] = None
    first_name: Optional[str] = None
    group: Optional[str] = None
    home_team: Optional[dict] = None
    id: Optional[int] = None
    last_name: Optional[str] = None
    last_updated: Optional[str] = None
    matchday: Optional[int] = None
    name: Optional[str] = None
    nationality: Optional[str] = None
    position: Optional[str] = None
    score: Optional[dict] = None
    season: Optional[dict] = None
    section: Optional[str] = None
    shirt_number: Optional[int] = None
    stage: Optional[str] = None
    status: Optional[str] = None
    utc_date: Optional[str] = None


@dataclass
class PersonLoadMatch:
    id: int


@dataclass
class PersonListMatch:
    id: int


@dataclass
class Team:
    address: Optional[str] = None
    area: Optional[dict] = None
    away_team: Optional[dict] = None
    club_color: Optional[str] = None
    coach: Optional[dict] = None
    competition: Optional[dict] = None
    crest: Optional[str] = None
    founded: Optional[int] = None
    group: Optional[str] = None
    home_team: Optional[dict] = None
    id: Optional[int] = None
    last_updated: Optional[str] = None
    matchday: Optional[int] = None
    name: Optional[str] = None
    running_competition: Optional[list] = None
    score: Optional[dict] = None
    season: Optional[dict] = None
    short_name: Optional[str] = None
    squad: Optional[list] = None
    staff: Optional[list] = None
    stage: Optional[str] = None
    status: Optional[str] = None
    tla: Optional[str] = None
    utc_date: Optional[str] = None
    venue: Optional[str] = None
    website: Optional[str] = None


@dataclass
class TeamLoadMatch:
    id: int


@dataclass
class TeamListMatch:
    id: int

