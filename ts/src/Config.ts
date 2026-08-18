
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'FootballData',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "http://api.football-data.org/v4",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      area: {
      },

      competition: {
      },

      match: {
      },

      person: {
      },

      team: {
      },

    }
  }


  entity = {
    "area": {
      "fields": [
        {
          "name": "childAreas",
          "type": "`$ARRAY`"
        },
        {
          "name": "countryCode",
          "type": "`$STRING`"
        },
        {
          "name": "flag",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "parentArea",
          "type": "`$STRING`"
        },
        {
          "name": "parentAreaId",
          "type": "`$INTEGER`"
        }
      ],
      "name": "area",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/areas",
              "parts": [
                "areas"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/areas/{id}",
              "parts": [
                "areas",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "competition": {
      "fields": [
        {
          "name": "address",
          "type": "`$STRING`"
        },
        {
          "name": "area",
          "type": "`$OBJECT`"
        },
        {
          "name": "assists",
          "type": "`$INTEGER`"
        },
        {
          "name": "awayTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "clubColors",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "type": "`$STRING`"
        },
        {
          "name": "competition",
          "type": "`$OBJECT`"
        },
        {
          "name": "crest",
          "type": "`$STRING`"
        },
        {
          "name": "currentSeason",
          "type": "`$OBJECT`"
        },
        {
          "name": "emblem",
          "type": "`$STRING`"
        },
        {
          "name": "founded",
          "type": "`$INTEGER`"
        },
        {
          "name": "goals",
          "type": "`$INTEGER`"
        },
        {
          "name": "group",
          "type": "`$STRING`"
        },
        {
          "name": "homeTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "matchday",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "numberOfAvailableSeasons",
          "type": "`$INTEGER`"
        },
        {
          "name": "penalties",
          "type": "`$INTEGER`"
        },
        {
          "name": "player",
          "type": "`$OBJECT`"
        },
        {
          "name": "score",
          "type": "`$OBJECT`"
        },
        {
          "name": "season",
          "type": "`$OBJECT`"
        },
        {
          "name": "shortName",
          "type": "`$STRING`"
        },
        {
          "name": "stage",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "table",
          "type": "`$ARRAY`"
        },
        {
          "name": "team",
          "type": "`$OBJECT`"
        },
        {
          "name": "tla",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "type": "`$STRING`"
        },
        {
          "name": "utcDate",
          "type": "`$STRING`"
        },
        {
          "name": "venue",
          "type": "`$STRING`"
        },
        {
          "name": "website",
          "type": "`$STRING`"
        }
      ],
      "name": "competition",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "date_from",
                    "orig": "date_from",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date_to",
                    "orig": "date_to",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "matchday",
                    "orig": "matchday",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/competitions/{id}/matches",
              "parts": [
                "competitions",
                "{id}",
                "matches"
              ],
              "select": {
                "$action": "match",
                "exist": [
                  "date_from",
                  "date_to",
                  "id",
                  "matchday",
                  "season",
                  "status"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.competition`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/competitions/{id}/scorers",
              "parts": [
                "competitions",
                "{id}",
                "scorers"
              ],
              "select": {
                "$action": "scorer",
                "exist": [
                  "id",
                  "limit",
                  "season"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.competition`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "matchday",
                    "orig": "matchday",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/competitions/{id}/standings",
              "parts": [
                "competitions",
                "{id}",
                "standings"
              ],
              "select": {
                "$action": "standing",
                "exist": [
                  "id",
                  "matchday",
                  "season"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.competition`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/competitions/{id}/teams",
              "parts": [
                "competitions",
                "{id}",
                "teams"
              ],
              "select": {
                "$action": "team",
                "exist": [
                  "id",
                  "season"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.competition`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "area",
                    "orig": "area",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/competitions",
              "parts": [
                "competitions"
              ],
              "select": {
                "exist": [
                  "area"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/competitions/{id}",
              "parts": [
                "competitions",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "match": {
      "fields": [
        {
          "name": "area",
          "type": "`$OBJECT`"
        },
        {
          "name": "awayTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "bookings",
          "type": "`$ARRAY`"
        },
        {
          "name": "competition",
          "type": "`$OBJECT`"
        },
        {
          "name": "goals",
          "type": "`$ARRAY`"
        },
        {
          "name": "group",
          "type": "`$STRING`"
        },
        {
          "name": "homeTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "matchday",
          "type": "`$INTEGER`"
        },
        {
          "name": "odds",
          "type": "`$OBJECT`"
        },
        {
          "name": "referees",
          "type": "`$ARRAY`"
        },
        {
          "name": "score",
          "type": "`$OBJECT`"
        },
        {
          "name": "season",
          "type": "`$OBJECT`"
        },
        {
          "name": "stage",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "substitutions",
          "type": "`$ARRAY`"
        },
        {
          "name": "utcDate",
          "type": "`$STRING`"
        },
        {
          "name": "venue",
          "type": "`$STRING`"
        }
      ],
      "name": "match",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "competition",
                    "orig": "competition",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date_from",
                    "orig": "date_from",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date_to",
                    "orig": "date_to",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/matches",
              "parts": [
                "matches"
              ],
              "select": {
                "exist": [
                  "competition",
                  "date_from",
                  "date_to",
                  "status"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/matches/{id}",
              "parts": [
                "matches",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "person": {
      "fields": [
        {
          "name": "awayTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "competition",
          "type": "`$OBJECT`"
        },
        {
          "name": "dateOfBirth",
          "type": "`$STRING`"
        },
        {
          "name": "firstName",
          "type": "`$STRING`"
        },
        {
          "name": "group",
          "type": "`$STRING`"
        },
        {
          "name": "homeTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "lastName",
          "type": "`$STRING`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "matchday",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "nationality",
          "type": "`$STRING`"
        },
        {
          "name": "position",
          "type": "`$STRING`"
        },
        {
          "name": "score",
          "type": "`$OBJECT`"
        },
        {
          "name": "season",
          "type": "`$OBJECT`"
        },
        {
          "name": "section",
          "type": "`$STRING`"
        },
        {
          "name": "shirtNumber",
          "type": "`$INTEGER`"
        },
        {
          "name": "stage",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "utcDate",
          "type": "`$STRING`"
        }
      ],
      "name": "person",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "competition",
                    "orig": "competition",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date_from",
                    "orig": "date_from",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date_to",
                    "orig": "date_to",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/persons/{id}/matches",
              "parts": [
                "persons",
                "{id}",
                "matches"
              ],
              "select": {
                "$action": "match",
                "exist": [
                  "competition",
                  "date_from",
                  "date_to",
                  "id",
                  "limit",
                  "status"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.person`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/persons/{id}",
              "parts": [
                "persons",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "team": {
      "fields": [
        {
          "name": "address",
          "type": "`$STRING`"
        },
        {
          "name": "area",
          "type": "`$OBJECT`"
        },
        {
          "name": "awayTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "clubColors",
          "type": "`$STRING`"
        },
        {
          "name": "coach",
          "type": "`$OBJECT`"
        },
        {
          "name": "competition",
          "type": "`$OBJECT`"
        },
        {
          "name": "crest",
          "type": "`$STRING`"
        },
        {
          "name": "founded",
          "type": "`$INTEGER`"
        },
        {
          "name": "group",
          "type": "`$STRING`"
        },
        {
          "name": "homeTeam",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "matchday",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "runningCompetitions",
          "type": "`$ARRAY`"
        },
        {
          "name": "score",
          "type": "`$OBJECT`"
        },
        {
          "name": "season",
          "type": "`$OBJECT`"
        },
        {
          "name": "shortName",
          "type": "`$STRING`"
        },
        {
          "name": "squad",
          "type": "`$ARRAY`"
        },
        {
          "name": "staff",
          "type": "`$ARRAY`"
        },
        {
          "name": "stage",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "tla",
          "type": "`$STRING`"
        },
        {
          "name": "utcDate",
          "type": "`$STRING`"
        },
        {
          "name": "venue",
          "type": "`$STRING`"
        },
        {
          "name": "website",
          "type": "`$STRING`"
        }
      ],
      "name": "team",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "date_from",
                    "orig": "date_from",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date_to",
                    "orig": "date_to",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "venue",
                    "orig": "venue",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/teams/{id}/matches",
              "parts": [
                "teams",
                "{id}",
                "matches"
              ],
              "select": {
                "$action": "match",
                "exist": [
                  "date_from",
                  "date_to",
                  "id",
                  "limit",
                  "season",
                  "status",
                  "venue"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/teams",
              "parts": [
                "teams"
              ],
              "select": {
                "exist": [
                  "limit",
                  "offset"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/teams/{id}",
              "parts": [
                "teams",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

