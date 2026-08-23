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
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "http://api.football-data.org/v4",
                "auth" => [
                    "prefix" => "",
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
                  'parts' => [
                    'areas',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
                  'parts' => [
                    'areas',
                    '{id}',
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
              'name' => 'address',
              'short' => 'Team address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'area',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'assists',
              'short' => 'Number of assists',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'awayTeam',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'clubColors',
              'short' => 'Team colors',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'code',
              'short' => 'Short code for the competition',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'competition',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'crest',
              'short' => 'URL to the team\'s crest image',
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
              'name' => 'founded',
              'short' => 'Year the team was founded',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'goals',
              'short' => 'Number of goals scored',
              'type' => '`$INTEGER`',
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
              'short' => 'Unique identifier for the competition',
              'type' => '`$INTEGER`',
            ],
            [
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
              'name' => 'penalties',
              'short' => 'Number of penalty goals',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'player',
              'type' => '`$OBJECT`',
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
              'name' => 'shortName',
              'short' => 'Short name of the team',
              'type' => '`$STRING`',
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
              'name' => 'table',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'team',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'tla',
              'short' => 'Three-letter abbreviation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Type of competition (LEAGUE, CUP, etc.)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'utcDate',
              'short' => 'Match date and time in UTC',
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
                  'parts' => [
                    'competitions',
                    '{id}',
                    'matches',
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
                  'parts' => [
                    'competitions',
                    '{id}',
                    'scorers',
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
                  'parts' => [
                    'competitions',
                    '{id}',
                    'standings',
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
                  'parts' => [
                    'competitions',
                    '{id}',
                    'teams',
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
                  'parts' => [
                    'competitions',
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
                  'parts' => [
                    'competitions',
                    '{id}',
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
                  'parts' => [
                    'matches',
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
                  'parts' => [
                    'matches',
                    '{id}',
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
              'name' => 'awayTeam',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'competition',
              'type' => '`$OBJECT`',
            ],
            [
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
              'short' => 'Unique identifier for the person',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'lastName',
              'short' => 'Last name',
              'type' => '`$STRING`',
            ],
            [
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
              'name' => 'score',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'season',
              'type' => '`$OBJECT`',
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
              'name' => 'utcDate',
              'short' => 'Match date and time in UTC',
              'type' => '`$STRING`',
            ],
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
                  'parts' => [
                    'persons',
                    '{id}',
                    'matches',
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
                  'parts' => [
                    'persons',
                    '{id}',
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
              'name' => 'awayTeam',
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
              'name' => 'competition',
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
              'short' => 'Unique identifier for the team',
              'type' => '`$INTEGER`',
            ],
            [
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
              'name' => 'score',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'season',
              'type' => '`$OBJECT`',
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
              'name' => 'tla',
              'short' => 'Three-letter abbreviation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'utcDate',
              'short' => 'Match date and time in UTC',
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
                  'parts' => [
                    'teams',
                    '{id}',
                    'matches',
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
                  'parts' => [
                    'teams',
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
                  'parts' => [
                    'teams',
                    '{id}',
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
