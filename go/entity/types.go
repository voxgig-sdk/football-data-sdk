// Typed models for the FootballData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/football-data-sdk/go/core"
)

// Area is the typed data model for the area entity.
type Area struct {
	ChildAreas *[]any `json:"childAreas,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	Flag *string `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentArea *string `json:"parentArea,omitempty"`
	ParentAreaId *int `json:"parentAreaId,omitempty"`
}

// AreaLoadMatch is the typed request payload for Area.LoadTyped.
type AreaLoadMatch struct {
	Id int `json:"id"`
}

// AreaListMatch is the typed request payload for Area.ListTyped.
type AreaListMatch struct {
	ChildAreas *[]any `json:"childAreas,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	Flag *string `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentArea *string `json:"parentArea,omitempty"`
	ParentAreaId *int `json:"parentAreaId,omitempty"`
}

// Competition is the typed data model for the competition entity.
type Competition struct {
	Address *string `json:"address,omitempty"`
	Area *map[string]any `json:"area,omitempty"`
	Assists *int `json:"assists,omitempty"`
	AwayTeam *map[string]any `json:"awayTeam,omitempty"`
	ClubColors *string `json:"clubColors,omitempty"`
	Code *string `json:"code,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	CurrentSeason *map[string]any `json:"currentSeason,omitempty"`
	Emblem *string `json:"emblem,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Goals *int `json:"goals,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"homeTeam,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfAvailableSeasons *int `json:"numberOfAvailableSeasons,omitempty"`
	Penalties *int `json:"penalties,omitempty"`
	Player *map[string]any `json:"player,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Table *[]any `json:"table,omitempty"`
	Team *map[string]any `json:"team,omitempty"`
	Tla *string `json:"tla,omitempty"`
	Type *string `json:"type,omitempty"`
	UtcDate *string `json:"utcDate,omitempty"`
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
	Assists *int `json:"assists,omitempty"`
	AwayTeam *map[string]any `json:"awayTeam,omitempty"`
	ClubColors *string `json:"clubColors,omitempty"`
	Code *string `json:"code,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	CurrentSeason *map[string]any `json:"currentSeason,omitempty"`
	Emblem *string `json:"emblem,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Goals *int `json:"goals,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"homeTeam,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfAvailableSeasons *int `json:"numberOfAvailableSeasons,omitempty"`
	Penalties *int `json:"penalties,omitempty"`
	Player *map[string]any `json:"player,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Table *[]any `json:"table,omitempty"`
	Team *map[string]any `json:"team,omitempty"`
	Tla *string `json:"tla,omitempty"`
	Type *string `json:"type,omitempty"`
	UtcDate *string `json:"utcDate,omitempty"`
	Venue *string `json:"venue,omitempty"`
	Website *string `json:"website,omitempty"`
}

// Match is the typed data model for the match entity.
type Match struct {
	Area *map[string]any `json:"area,omitempty"`
	AwayTeam *map[string]any `json:"awayTeam,omitempty"`
	Bookings *[]any `json:"bookings,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Goals *[]any `json:"goals,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"homeTeam,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Odds *map[string]any `json:"odds,omitempty"`
	Referees *[]any `json:"referees,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Substitutions *[]any `json:"substitutions,omitempty"`
	UtcDate *string `json:"utcDate,omitempty"`
	Venue *string `json:"venue,omitempty"`
}

// MatchLoadMatch is the typed request payload for Match.LoadTyped.
type MatchLoadMatch struct {
	Id int `json:"id"`
}

// MatchListMatch is the typed request payload for Match.ListTyped.
type MatchListMatch struct {
	Area *map[string]any `json:"area,omitempty"`
	AwayTeam *map[string]any `json:"awayTeam,omitempty"`
	Bookings *[]any `json:"bookings,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Goals *[]any `json:"goals,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"homeTeam,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Odds *map[string]any `json:"odds,omitempty"`
	Referees *[]any `json:"referees,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Substitutions *[]any `json:"substitutions,omitempty"`
	UtcDate *string `json:"utcDate,omitempty"`
	Venue *string `json:"venue,omitempty"`
}

// Person is the typed data model for the person entity.
type Person struct {
	AwayTeam *map[string]any `json:"awayTeam,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	DateOfBirth *string `json:"dateOfBirth,omitempty"`
	FirstName *string `json:"firstName,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"homeTeam,omitempty"`
	Id *int `json:"id,omitempty"`
	LastName *string `json:"lastName,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	Nationality *string `json:"nationality,omitempty"`
	Position *string `json:"position,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	Section *string `json:"section,omitempty"`
	ShirtNumber *int `json:"shirtNumber,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	UtcDate *string `json:"utcDate,omitempty"`
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
	AwayTeam *map[string]any `json:"awayTeam,omitempty"`
	ClubColors *string `json:"clubColors,omitempty"`
	Coach *map[string]any `json:"coach,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"homeTeam,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	RunningCompetitions *[]any `json:"runningCompetitions,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	Squad *[]any `json:"squad,omitempty"`
	Staff *[]any `json:"staff,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Tla *string `json:"tla,omitempty"`
	UtcDate *string `json:"utcDate,omitempty"`
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
	AwayTeam *map[string]any `json:"awayTeam,omitempty"`
	ClubColors *string `json:"clubColors,omitempty"`
	Coach *map[string]any `json:"coach,omitempty"`
	Competition *map[string]any `json:"competition,omitempty"`
	Crest *string `json:"crest,omitempty"`
	Founded *int `json:"founded,omitempty"`
	Group *string `json:"group,omitempty"`
	HomeTeam *map[string]any `json:"homeTeam,omitempty"`
	Id *int `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	Matchday *int `json:"matchday,omitempty"`
	Name *string `json:"name,omitempty"`
	RunningCompetitions *[]any `json:"runningCompetitions,omitempty"`
	Score *map[string]any `json:"score,omitempty"`
	Season *map[string]any `json:"season,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	Squad *[]any `json:"squad,omitempty"`
	Staff *[]any `json:"staff,omitempty"`
	Stage *string `json:"stage,omitempty"`
	Status *string `json:"status,omitempty"`
	Tla *string `json:"tla,omitempty"`
	UtcDate *string `json:"utcDate,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
