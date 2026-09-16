package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FootballData",
			"slug": "football-data",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "http://api.football-data.org/v4",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"area": map[string]any{},
				"competition": map[string]any{},
				"match": map[string]any{},
				"person": map[string]any{},
				"team": map[string]any{},
			},
		},
		"entity": map[string]any{
			"area": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "childAreas",
						"short": "List of child areas",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flag",
						"short": "URL to the area's flag image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the area",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the area",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parentArea",
						"short": "Name of the parent area",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parentAreaId",
						"short": "ID of the parent area",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "area",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/areas",
								"segments": []any{
									map[string]any{
										"lit": "areas",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"areas",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/areas/{id}",
								"segments": []any{
									map[string]any{
										"lit": "areas",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"areas",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"competition": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"short": "Team address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "area",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "assists",
						"short": "Number of assists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "awayTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "clubColors",
						"short": "Team colors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"short": "Short code for the competition",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "competition",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "crest",
						"short": "URL to the team's crest image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currentSeason",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "emblem",
						"short": "URL to the competition's emblem",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "founded",
						"short": "Year the team was founded",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "goals",
						"short": "Number of goals scored",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "group",
						"short": "Group identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the competition",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "lastUpdated",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"short": "Matchday number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the competition",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "numberOfAvailableSeasons",
						"short": "Number of seasons available",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "penalties",
						"short": "Number of penalty goals",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "player",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "score",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "season",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shortName",
						"short": "Short name of the team",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stage",
						"short": "Match stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Match status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "table",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "team",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tla",
						"short": "Three-letter abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of competition (LEAGUE, CUP, etc.)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "utcDate",
						"short": "Match date and time in UTC",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"short": "Home stadium name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website",
						"short": "Team website URL",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "competition",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "matchday",
											"orig": "matchday",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/competitions/{id}/matches",
								"segments": []any{
									map[string]any{
										"lit": "competitions",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "matches",
									},
								},
								"select": map[string]any{
									"$action": "match",
									"exist": []any{
										"date_from",
										"date_to",
										"id",
										"matchday",
										"season",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.competition`",
								},
								"parts": []any{
									"competitions",
									"{id}",
									"matches",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/competitions/{id}/scorers",
								"segments": []any{
									map[string]any{
										"lit": "competitions",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "scorers",
									},
								},
								"select": map[string]any{
									"$action": "scorer",
									"exist": []any{
										"id",
										"limit",
										"season",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.competition`",
								},
								"parts": []any{
									"competitions",
									"{id}",
									"scorers",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "matchday",
											"orig": "matchday",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/competitions/{id}/standings",
								"segments": []any{
									map[string]any{
										"lit": "competitions",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "standings",
									},
								},
								"select": map[string]any{
									"$action": "standing",
									"exist": []any{
										"id",
										"matchday",
										"season",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.competition`",
								},
								"parts": []any{
									"competitions",
									"{id}",
									"standings",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/competitions/{id}/teams",
								"segments": []any{
									map[string]any{
										"lit": "competitions",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "teams",
									},
								},
								"select": map[string]any{
									"$action": "team",
									"exist": []any{
										"id",
										"season",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.competition`",
								},
								"parts": []any{
									"competitions",
									"{id}",
									"teams",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "area",
											"orig": "area",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/competitions",
								"segments": []any{
									map[string]any{
										"lit": "competitions",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"area",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"competitions",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/competitions/{id}",
								"segments": []any{
									map[string]any{
										"lit": "competitions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"competitions",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"match": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "area",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "awayTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "bookings",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "competition",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "goals",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "group",
						"short": "Group identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the match",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "lastUpdated",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"short": "Matchday number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "odds",
						"short": "Match odds",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "referees",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "score",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "season",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "stage",
						"short": "Match stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Match status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "substitutions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "utcDate",
						"short": "Match date and time in UTC",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"short": "Stadium name",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "match",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "competition",
											"orig": "competition",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/matches",
								"segments": []any{
									map[string]any{
										"lit": "matches",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"competition",
										"date_from",
										"date_to",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"matches",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/matches/{id}",
								"segments": []any{
									map[string]any{
										"lit": "matches",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"matches",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"person": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "awayTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "competition",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date",
						"name": "dateOfBirth",
						"short": "Date of birth",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstName",
						"short": "First name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "group",
						"short": "Group identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the person",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lastName",
						"short": "Last name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "lastUpdated",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"short": "Matchday number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Full name of the person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nationality",
						"short": "Nationality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "position",
						"short": "Playing position",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "score",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "season",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "section",
						"short": "Section (e.g., Offence, Defence, Midfield, Goalkeeper)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shirtNumber",
						"short": "Shirt number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stage",
						"short": "Match stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Match status",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "utcDate",
						"short": "Match date and time in UTC",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "person",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "competition",
											"orig": "competition",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/persons/{id}/matches",
								"segments": []any{
									map[string]any{
										"lit": "persons",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "matches",
									},
								},
								"select": map[string]any{
									"$action": "match",
									"exist": []any{
										"competition",
										"date_from",
										"date_to",
										"id",
										"limit",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.person`",
								},
								"parts": []any{
									"persons",
									"{id}",
									"matches",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/persons/{id}",
								"segments": []any{
									map[string]any{
										"lit": "persons",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"persons",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"team": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"short": "Team address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "area",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "awayTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "clubColors",
						"short": "Team colors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "coach",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "competition",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "crest",
						"short": "URL to the team's crest image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "founded",
						"short": "Year the team was founded",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "group",
						"short": "Group identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the team",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "lastUpdated",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"short": "Matchday number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the team",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "runningCompetitions",
						"short": "Competitions the team is currently participating in",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "score",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "season",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shortName",
						"short": "Short name of the team",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "squad",
						"short": "Team squad members",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "staff",
						"short": "Team staff members",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "stage",
						"short": "Match stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Match status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tla",
						"short": "Three-letter abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "utcDate",
						"short": "Match date and time in UTC",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"short": "Home stadium name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website",
						"short": "Team website URL",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "team",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "venue",
											"orig": "venue",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/teams/{id}/matches",
								"segments": []any{
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "matches",
									},
								},
								"select": map[string]any{
									"$action": "match",
									"exist": []any{
										"date_from",
										"date_to",
										"id",
										"limit",
										"season",
										"status",
										"venue",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"teams",
									"{id}",
									"matches",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/teams",
								"segments": []any{
									map[string]any{
										"lit": "teams",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"teams",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/teams/{id}",
								"segments": []any{
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"teams",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
