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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "countryCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flag",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parentArea",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parentAreaId",
						"type": "`$INTEGER`",
					},
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
								"parts": []any{
									"areas",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"areas",
									"{id}",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "area",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "assists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "awayTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "clubColors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "competition",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "crest",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currentSeason",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "emblem",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "founded",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "goals",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "group",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lastUpdated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "numberOfAvailableSeasons",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "penalties",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utcDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"competitions",
									"{id}",
									"matches",
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
								"parts": []any{
									"competitions",
									"{id}",
									"scorers",
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
								"parts": []any{
									"competitions",
									"{id}",
									"standings",
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
								"parts": []any{
									"competitions",
									"{id}",
									"teams",
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
								"parts": []any{
									"competitions",
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
								"parts": []any{
									"competitions",
									"{id}",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lastUpdated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "odds",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "substitutions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "utcDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"matches",
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
								"parts": []any{
									"matches",
									"{id}",
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
						"name": "dateOfBirth",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "group",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lastName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastUpdated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nationality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "position",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shirtNumber",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utcDate",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"persons",
									"{id}",
									"matches",
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
								"parts": []any{
									"persons",
									"{id}",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "founded",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "group",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeTeam",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lastUpdated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchday",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "runningCompetitions",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "squad",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "staff",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tla",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utcDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"teams",
									"{id}",
									"matches",
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
								"parts": []any{
									"teams",
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
								"parts": []any{
									"teams",
									"{id}",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
