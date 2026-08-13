<?php
declare(strict_types=1);

// Typed models for the FootballData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Area entity data model. */
class Area
{
    public ?array $childAreas = null;
    public ?string $countryCode = null;
    public ?string $flag = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $parentArea = null;
    public ?int $parentAreaId = null;
}

/** Request payload for Area#load. */
class AreaLoadMatch
{
    public int $id;
}

/** Request payload for Area#list. */
class AreaListMatch
{
    public ?array $childAreas = null;
    public ?string $countryCode = null;
    public ?string $flag = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $parentArea = null;
    public ?int $parentAreaId = null;
}

/** Competition entity data model. */
class Competition
{
    public ?string $address = null;
    public ?array $area = null;
    public ?int $assists = null;
    public ?array $awayTeam = null;
    public ?string $clubColors = null;
    public ?string $code = null;
    public ?array $competition = null;
    public ?string $crest = null;
    public ?array $currentSeason = null;
    public ?string $emblem = null;
    public ?int $founded = null;
    public ?int $goals = null;
    public ?string $group = null;
    public ?array $homeTeam = null;
    public ?int $id = null;
    public ?string $lastUpdated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?int $numberOfAvailableSeasons = null;
    public ?int $penalties = null;
    public ?array $player = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $shortName = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?array $table = null;
    public ?array $team = null;
    public ?string $tla = null;
    public ?string $type = null;
    public ?string $utcDate = null;
    public ?string $venue = null;
    public ?string $website = null;
}

/** Request payload for Competition#load. */
class CompetitionLoadMatch
{
    public string $id;
}

/** Request payload for Competition#list. */
class CompetitionListMatch
{
    public ?string $address = null;
    public ?array $area = null;
    public ?int $assists = null;
    public ?array $awayTeam = null;
    public ?string $clubColors = null;
    public ?string $code = null;
    public ?array $competition = null;
    public ?string $crest = null;
    public ?array $currentSeason = null;
    public ?string $emblem = null;
    public ?int $founded = null;
    public ?int $goals = null;
    public ?string $group = null;
    public ?array $homeTeam = null;
    public ?int $id = null;
    public ?string $lastUpdated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?int $numberOfAvailableSeasons = null;
    public ?int $penalties = null;
    public ?array $player = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $shortName = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?array $table = null;
    public ?array $team = null;
    public ?string $tla = null;
    public ?string $type = null;
    public ?string $utcDate = null;
    public ?string $venue = null;
    public ?string $website = null;
}

/** Match entity data model. */
class Match
{
    public ?array $area = null;
    public ?array $awayTeam = null;
    public ?array $bookings = null;
    public ?array $competition = null;
    public ?array $goals = null;
    public ?string $group = null;
    public ?array $homeTeam = null;
    public ?int $id = null;
    public ?string $lastUpdated = null;
    public ?int $matchday = null;
    public ?array $odds = null;
    public ?array $referees = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?array $substitutions = null;
    public ?string $utcDate = null;
    public ?string $venue = null;
}

/** Request payload for Match#load. */
class MatchLoadMatch
{
    public int $id;
}

/** Request payload for Match#list. */
class MatchListMatch
{
    public ?array $area = null;
    public ?array $awayTeam = null;
    public ?array $bookings = null;
    public ?array $competition = null;
    public ?array $goals = null;
    public ?string $group = null;
    public ?array $homeTeam = null;
    public ?int $id = null;
    public ?string $lastUpdated = null;
    public ?int $matchday = null;
    public ?array $odds = null;
    public ?array $referees = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?array $substitutions = null;
    public ?string $utcDate = null;
    public ?string $venue = null;
}

/** Person entity data model. */
class Person
{
    public ?array $awayTeam = null;
    public ?array $competition = null;
    public ?string $dateOfBirth = null;
    public ?string $firstName = null;
    public ?string $group = null;
    public ?array $homeTeam = null;
    public ?int $id = null;
    public ?string $lastName = null;
    public ?string $lastUpdated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?string $nationality = null;
    public ?string $position = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $section = null;
    public ?int $shirtNumber = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?string $utcDate = null;
}

/** Request payload for Person#load. */
class PersonLoadMatch
{
    public int $id;
}

/** Request payload for Person#list. */
class PersonListMatch
{
    public int $id;
}

/** Team entity data model. */
class Team
{
    public ?string $address = null;
    public ?array $area = null;
    public ?array $awayTeam = null;
    public ?string $clubColors = null;
    public ?array $coach = null;
    public ?array $competition = null;
    public ?string $crest = null;
    public ?int $founded = null;
    public ?string $group = null;
    public ?array $homeTeam = null;
    public ?int $id = null;
    public ?string $lastUpdated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?array $runningCompetitions = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $shortName = null;
    public ?array $squad = null;
    public ?array $staff = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?string $tla = null;
    public ?string $utcDate = null;
    public ?string $venue = null;
    public ?string $website = null;
}

/** Request payload for Team#load. */
class TeamLoadMatch
{
    public int $id;
}

/** Request payload for Team#list. */
class TeamListMatch
{
    public ?string $address = null;
    public ?array $area = null;
    public ?array $awayTeam = null;
    public ?string $clubColors = null;
    public ?array $coach = null;
    public ?array $competition = null;
    public ?string $crest = null;
    public ?int $founded = null;
    public ?string $group = null;
    public ?array $homeTeam = null;
    public ?int $id = null;
    public ?string $lastUpdated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?array $runningCompetitions = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $shortName = null;
    public ?array $squad = null;
    public ?array $staff = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?string $tla = null;
    public ?string $utcDate = null;
    public ?string $venue = null;
    public ?string $website = null;
}

