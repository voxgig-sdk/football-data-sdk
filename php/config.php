<?php
declare(strict_types=1);

// FootballData SDK configuration

class FootballDataConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FootballData",
                "slug" => "football-data",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "http://api.football-data.org/v4",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-Auth-Token",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "area" => [],
                    "competition" => [],
                    "match" => [],
                    "person" => [],
                    "team" => [],
                ],
            ],
            "entity" => [
        'area' => [
          'fields' => [
            [
              'name' => 'childAreas',
              'short' => 'List of child areas',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'countryCode',
              'short' => 'ISO country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'flag',
              'short' => 'URL to the area\'s flag image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the area',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the area',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'parentArea',
              'short' => 'Name of the parent area',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'parentAreaId',
              'short' => 'ID of the parent area',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'area',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/areas',
                  'segments' => [
                    [
                      'lit' => 'areas',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'areas',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/areas/{id}',
                  'segments' => [
                    [
                      'lit' => 'areas',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'areas',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'competition' => [
          'fields' => [
            [
              'name' => 'area',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'code',
              'short' => 'Short code for the competition',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currentSeason',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'emblem',
              'short' => 'URL to the competition\'s emblem',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the competition',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'date-time',
              'name' => 'lastUpdated',
              'short' => 'Last update timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the competition',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'numberOfAvailableSeasons',
              'short' => 'Number of seasons available',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'type',
              'short' => 'Type of competition (LEAGUE, CUP, etc.)',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'competition',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'matchday',
                        'orig' => 'matchday',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/competitions/{id}/matches',
                  'segments' => [
                    [
                      'lit' => 'competitions',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'matches',
                    ],
                  ],
                  'select' => [
                    '$action' => 'match',
                    'exist' => [
                      'date_from',
                      'date_to',
                      'id',
                      'matchday',
                      'season',
                      'status',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.competition`',
                  ],
                  'parts' => [
                    'competitions',
                    '{id}',
                    'matches',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/competitions/{id}/scorers',
                  'segments' => [
                    [
                      'lit' => 'competitions',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'scorers',
                    ],
                  ],
                  'select' => [
                    '$action' => 'scorer',
                    'exist' => [
                      'id',
                      'limit',
                      'season',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.competition`',
                  ],
                  'parts' => [
                    'competitions',
                    '{id}',
                    'scorers',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'matchday',
                        'orig' => 'matchday',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/competitions/{id}/standings',
                  'segments' => [
                    [
                      'lit' => 'competitions',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'standings',
                    ],
                  ],
                  'select' => [
                    '$action' => 'standing',
                    'exist' => [
                      'id',
                      'matchday',
                      'season',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.competition`',
                  ],
                  'parts' => [
                    'competitions',
                    '{id}',
                    'standings',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/competitions/{id}/teams',
                  'segments' => [
                    [
                      'lit' => 'competitions',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'teams',
                    ],
                  ],
                  'select' => [
                    '$action' => 'team',
                    'exist' => [
                      'id',
                      'season',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.competition`',
                  ],
                  'parts' => [
                    'competitions',
                    '{id}',
                    'teams',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'area',
                        'orig' => 'area',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/competitions',
                  'segments' => [
                    [
                      'lit' => 'competitions',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'area',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'competitions',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/competitions/{id}',
                  'segments' => [
                    [
                      'lit' => 'competitions',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'competitions',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'match' => [
          'fields' => [
            [
              'name' => 'area',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'awayTeam',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'bookings',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'competition',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'goals',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'group',
              'short' => 'Group identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'homeTeam',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the match',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'date-time',
              'name' => 'lastUpdated',
              'short' => 'Last update timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'matchday',
              'short' => 'Matchday number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'odds',
              'short' => 'Match odds',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'referees',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'score',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'season',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'stage',
              'short' => 'Match stage',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'short' => 'Match status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'substitutions',
              'type' => '`$ARRAY`',
            ],
            [
              'format' => 'date-time',
              'name' => 'utcDate',
              'short' => 'Match date and time in UTC',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'venue',
              'short' => 'Stadium name',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'match',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'competition',
                        'orig' => 'competition',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/matches',
                  'segments' => [
                    [
                      'lit' => 'matches',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'competition',
                      'date_from',
                      'date_to',
                      'status',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'matches',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/matches/{id}',
                  'segments' => [
                    [
                      'lit' => 'matches',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'matches',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'person' => [
          'fields' => [
            [
              'format' => 'date',
              'name' => 'dateOfBirth',
              'short' => 'Date of birth',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'firstName',
              'short' => 'First name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the person',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'lastName',
              'short' => 'Last name',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'lastUpdated',
              'short' => 'Last update timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Full name of the person',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nationality',
              'short' => 'Nationality',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'position',
              'short' => 'Playing position',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'section',
              'short' => 'Section (e.g., Offence, Defence, Midfield, Goalkeeper)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'shirtNumber',
              'short' => 'Shirt number',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'person',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'competition',
                        'orig' => 'competition',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/persons/{id}/matches',
                  'segments' => [
                    [
                      'lit' => 'persons',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'matches',
                    ],
                  ],
                  'select' => [
                    '$action' => 'match',
                    'exist' => [
                      'competition',
                      'date_from',
                      'date_to',
                      'id',
                      'limit',
                      'status',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.person`',
                  ],
                  'parts' => [
                    'persons',
                    '{id}',
                    'matches',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/persons/{id}',
                  'segments' => [
                    [
                      'lit' => 'persons',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'persons',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'team' => [
          'fields' => [
            [
              'name' => 'address',
              'short' => 'Team address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'area',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'clubColors',
              'short' => 'Team colors',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'coach',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'crest',
              'short' => 'URL to the team\'s crest image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'founded',
              'short' => 'Year the team was founded',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the team',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'date-time',
              'name' => 'lastUpdated',
              'short' => 'Last update timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the team',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'runningCompetitions',
              'short' => 'Competitions the team is currently participating in',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'shortName',
              'short' => 'Short name of the team',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'squad',
              'short' => 'Team squad members',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'staff',
              'short' => 'Team staff members',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'tla',
              'short' => 'Three-letter abbreviation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'venue',
              'short' => 'Home stadium name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'website',
              'short' => 'Team website URL',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'team',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'venue',
                        'orig' => 'venue',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/teams/{id}/matches',
                  'segments' => [
                    [
                      'lit' => 'teams',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'matches',
                    ],
                  ],
                  'select' => [
                    '$action' => 'match',
                    'exist' => [
                      'date_from',
                      'date_to',
                      'id',
                      'limit',
                      'season',
                      'status',
                      'venue',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'teams',
                    '{id}',
                    'matches',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/teams',
                  'segments' => [
                    [
                      'lit' => 'teams',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'teams',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/teams/{id}',
                  'segments' => [
                    [
                      'lit' => 'teams',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'teams',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FootballDataFeatures::make_feature($name);
    }
}
