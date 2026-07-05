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
    public ?array $child_area = null;
    public ?string $country_code = null;
    public ?string $flag = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $parent_area = null;
    public ?int $parent_area_id = null;
}

/** Request payload for Area#load. */
class AreaLoadMatch
{
    public int $id;
}

/** Request payload for Area#list. */
class AreaListMatch
{
    public ?array $child_area = null;
    public ?string $country_code = null;
    public ?string $flag = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $parent_area = null;
    public ?int $parent_area_id = null;
}

/** Competition entity data model. */
class Competition
{
    public ?string $address = null;
    public ?array $area = null;
    public ?int $assist = null;
    public ?array $away_team = null;
    public ?string $club_color = null;
    public ?string $code = null;
    public ?array $competition = null;
    public ?string $crest = null;
    public ?array $current_season = null;
    public ?string $emblem = null;
    public ?int $founded = null;
    public ?int $goal = null;
    public ?string $group = null;
    public ?array $home_team = null;
    public ?int $id = null;
    public ?string $last_updated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?int $number_of_available_season = null;
    public ?int $penalty = null;
    public ?array $player = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $short_name = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?array $table = null;
    public ?array $team = null;
    public ?string $tla = null;
    public ?string $type = null;
    public ?string $utc_date = null;
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
    public string $id;
}

/** Match entity data model. */
class Match
{
    public ?array $area = null;
    public ?array $away_team = null;
    public ?array $booking = null;
    public ?array $competition = null;
    public ?array $goal = null;
    public ?string $group = null;
    public ?array $home_team = null;
    public ?int $id = null;
    public ?string $last_updated = null;
    public ?int $matchday = null;
    public ?array $odd = null;
    public ?array $referee = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?array $substitution = null;
    public ?string $utc_date = null;
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
    public ?array $away_team = null;
    public ?array $booking = null;
    public ?array $competition = null;
    public ?array $goal = null;
    public ?string $group = null;
    public ?array $home_team = null;
    public ?int $id = null;
    public ?string $last_updated = null;
    public ?int $matchday = null;
    public ?array $odd = null;
    public ?array $referee = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?array $substitution = null;
    public ?string $utc_date = null;
    public ?string $venue = null;
}

/** Person entity data model. */
class Person
{
    public ?array $away_team = null;
    public ?array $competition = null;
    public ?string $date_of_birth = null;
    public ?string $first_name = null;
    public ?string $group = null;
    public ?array $home_team = null;
    public ?int $id = null;
    public ?string $last_name = null;
    public ?string $last_updated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?string $nationality = null;
    public ?string $position = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $section = null;
    public ?int $shirt_number = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?string $utc_date = null;
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
    public ?array $away_team = null;
    public ?string $club_color = null;
    public ?array $coach = null;
    public ?array $competition = null;
    public ?string $crest = null;
    public ?int $founded = null;
    public ?string $group = null;
    public ?array $home_team = null;
    public ?int $id = null;
    public ?string $last_updated = null;
    public ?int $matchday = null;
    public ?string $name = null;
    public ?array $running_competition = null;
    public ?array $score = null;
    public ?array $season = null;
    public ?string $short_name = null;
    public ?array $squad = null;
    public ?array $staff = null;
    public ?string $stage = null;
    public ?string $status = null;
    public ?string $tla = null;
    public ?string $utc_date = null;
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
    public int $id;
}

