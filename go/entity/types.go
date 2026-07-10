// Typed models for the FootballData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Area is the typed data model for the area entity.
type Area struct {
	ChildArea *[]any `json:"child_area,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Flag *string `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentArea *string `json:"parent_area,omitempty"`
	ParentAreaId *int `json:"parent_area_id,omitempty"`
}

// AreaLoadMatch is the typed request payload for Area.LoadTyped.
type AreaLoadMatch struct {
	Id int `json:"id"`
}

// AreaListMatch is the typed request payload for Area.ListTyped.
type AreaListMatch struct {
	ChildArea *[]any `json:"child_area,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Flag *string `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentArea *string `json:"parent_area,omitempty"`
	ParentAreaId *int `json:"parent_area_id,omitempty"`
}

// Competition is the typed data model for the competition entity.
type Competition struct {
	Address *string `json:"address,omitempty"`
	Area *map[string]any `json:"area,omitempty"`
	Assist *int `json:"assist,omitempty"`
	AwayTeam *map[string]any `json:"away_team,omitempty"`
	ClubColor *string `json:"club_color,omitempty"`
	Code *string `json:"code,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	CurrentSeason *map[string]any `json:"current_season,omitempty"`
	Emblem *string `json:"emblem,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Goal *int `json:"goal,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"home_team,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfAvailableSeason *int `json:"number_of_available_season,omitempty"`
	Penalty *int `json:"penalty,omitempty"`
	Player *map[string]any `json:"player,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"short_name,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Table *[]any `json:"table,omitempty"`
	Team *map[string]any `json:"team,omitempty"`
	Tla *string `json:"tla,omitempty"`
	Type *string `json:"type,omitempty"`
	UtcDate *string `json:"utc_date,omitempty"`
	Venue *string `json:"venue,omitempty"`
	Website *string `json:"website,omitempty"`
}

// CompetitionLoadMatch is the typed request payload for Competition.LoadTyped.
type CompetitionLoadMatch struct {
	Id string `json:"id"`
}

// CompetitionListMatch is the typed request payload for Competition.ListTyped.
type CompetitionListMatch struct {
	Address *string `json:"address,omitempty"`
	Area *map[string]any `json:"area,omitempty"`
	Assist *int `json:"assist,omitempty"`
	AwayTeam *map[string]any `json:"away_team,omitempty"`
	ClubColor *string `json:"club_color,omitempty"`
	Code *string `json:"code,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	CurrentSeason *map[string]any `json:"current_season,omitempty"`
	Emblem *string `json:"emblem,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Goal *int `json:"goal,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"home_team,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfAvailableSeason *int `json:"number_of_available_season,omitempty"`
	Penalty *int `json:"penalty,omitempty"`
	Player *map[string]any `json:"player,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"short_name,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Table *[]any `json:"table,omitempty"`
	Team *map[string]any `json:"team,omitempty"`
	Tla *string `json:"tla,omitempty"`
	Type *string `json:"type,omitempty"`
	UtcDate *string `json:"utc_date,omitempty"`
	Venue *string `json:"venue,omitempty"`
	Website *string `json:"website,omitempty"`
}

// Match is the typed data model for the match entity.
type Match struct {
	Area *map[string]any `json:"area,omitempty"`
	AwayTeam *map[string]any `json:"away_team,omitempty"`
	Booking *[]any `json:"booking,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Goal *[]any `json:"goal,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"home_team,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Odd *map[string]any `json:"odd,omitempty"`
	Referee *[]any `json:"referee,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Substitution *[]any `json:"substitution,omitempty"`
	UtcDate *string `json:"utc_date,omitempty"`
	Venue *string `json:"venue,omitempty"`
}

// MatchLoadMatch is the typed request payload for Match.LoadTyped.
type MatchLoadMatch struct {
	Id int `json:"id"`
}

// MatchListMatch is the typed request payload for Match.ListTyped.
type MatchListMatch struct {
	Area *map[string]any `json:"area,omitempty"`
	AwayTeam *map[string]any `json:"away_team,omitempty"`
	Booking *[]any `json:"booking,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Goal *[]any `json:"goal,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"home_team,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Odd *map[string]any `json:"odd,omitempty"`
	Referee *[]any `json:"referee,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Substitution *[]any `json:"substitution,omitempty"`
	UtcDate *string `json:"utc_date,omitempty"`
	Venue *string `json:"venue,omitempty"`
}

// Person is the typed data model for the person entity.
type Person struct {
	AwayTeam *map[string]any `json:"away_team,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	DateOfBirth *string `json:"date_of_birth,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"home_team,omitempty"`
	Id *int `json:"id,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	Nationality *string `json:"nationality,omitempty"`
	Position *string `json:"position,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	Section *string `json:"section,omitempty"`
	ShirtNumber *int `json:"shirt_number,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	UtcDate *string `json:"utc_date,omitempty"`
}

// PersonLoadMatch is the typed request payload for Person.LoadTyped.
type PersonLoadMatch struct {
	Id int `json:"id"`
}

// PersonListMatch is the typed request payload for Person.ListTyped.
type PersonListMatch struct {
	Id int `json:"id"`
}

// Team is the typed data model for the team entity.
type Team struct {
	Address *string `json:"address,omitempty"`
	Area *map[string]any `json:"area,omitempty"`
	AwayTeam *map[string]any `json:"away_team,omitempty"`
	ClubColor *string `json:"club_color,omitempty"`
	Coach *map[string]any `json:"coach,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"home_team,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	RunningCompetition *[]any `json:"running_competition,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"short_name,omitempty"`
	Squad *[]any `json:"squad,omitempty"`
	Staff *[]any `json:"staff,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Tla *string `json:"tla,omitempty"`
	UtcDate *string `json:"utc_date,omitempty"`
	Venue *string `json:"venue,omitempty"`
	Website *string `json:"website,omitempty"`
}

// TeamLoadMatch is the typed request payload for Team.LoadTyped.
type TeamLoadMatch struct {
	Id int `json:"id"`
}

// TeamListMatch is the typed request payload for Team.ListTyped.
type TeamListMatch struct {
	Address *string `json:"address,omitempty"`
	Area *map[string]any `json:"area,omitempty"`
	AwayTeam *map[string]any `json:"away_team,omitempty"`
	ClubColor *string `json:"club_color,omitempty"`
	Coach *map[string]any `json:"coach,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"home_team,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	RunningCompetition *[]any `json:"running_competition,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"short_name,omitempty"`
	Squad *[]any `json:"squad,omitempty"`
	Staff *[]any `json:"staff,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Tla *string `json:"tla,omitempty"`
	UtcDate *string `json:"utc_date,omitempty"`
	Venue *string `json:"venue,omitempty"`
	Website *string `json:"website,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
