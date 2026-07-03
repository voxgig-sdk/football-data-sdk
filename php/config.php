<?php
declare(strict_types=1);

// FootballData SDK configuration

class FootballDataConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FootballData",
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
                    "prefix" => "Bearer",
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
              'active' => true,
              'name' => 'child_area',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'country_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'flag',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'parent_area',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'parent_area_id',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
          ],
          'name' => 'area',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'competition' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'address',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'area',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'assist',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'away_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'club_color',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'competition',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'crest',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'current_season',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'emblem',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'founded',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'goal',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'group',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'home_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 14,
            ],
            [
              'active' => true,
              'name' => 'last_updated',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 15,
            ],
            [
              'active' => true,
              'name' => 'matchday',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 16,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 17,
            ],
            [
              'active' => true,
              'name' => 'number_of_available_season',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 18,
            ],
            [
              'active' => true,
              'name' => 'penalty',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 19,
            ],
            [
              'active' => true,
              'name' => 'player',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 20,
            ],
            [
              'active' => true,
              'name' => 'score',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 21,
            ],
            [
              'active' => true,
              'name' => 'season',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 22,
            ],
            [
              'active' => true,
              'name' => 'short_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 23,
            ],
            [
              'active' => true,
              'name' => 'stage',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 24,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 25,
            ],
            [
              'active' => true,
              'name' => 'table',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 26,
            ],
            [
              'active' => true,
              'name' => 'team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 27,
            ],
            [
              'active' => true,
              'name' => 'tla',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 28,
            ],
            [
              'active' => true,
              'name' => 'type',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 29,
            ],
            [
              'active' => true,
              'name' => 'utc_date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 30,
            ],
            [
              'active' => true,
              'name' => 'venue',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 31,
            ],
            [
              'active' => true,
              'name' => 'website',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 32,
            ],
          ],
          'name' => 'competition',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'matchday',
                        'orig' => 'matchday',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'matchday',
                        'orig' => 'matchday',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 2,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 3,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'area',
                        'orig' => 'area',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 4,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'match' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'area',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'away_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'booking',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'competition',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'goal',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'group',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'home_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'last_updated',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'matchday',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'odd',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'referee',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'score',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'season',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'stage',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 14,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 15,
            ],
            [
              'active' => true,
              'name' => 'substitution',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 16,
            ],
            [
              'active' => true,
              'name' => 'utc_date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 17,
            ],
            [
              'active' => true,
              'name' => 'venue',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 18,
            ],
          ],
          'name' => 'match',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'competition',
                        'orig' => 'competition',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'person' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'away_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'competition',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'date_of_birth',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'first_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'group',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'home_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'last_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'last_updated',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'matchday',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'nationality',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'position',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'score',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'season',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 14,
            ],
            [
              'active' => true,
              'name' => 'section',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 15,
            ],
            [
              'active' => true,
              'name' => 'shirt_number',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 16,
            ],
            [
              'active' => true,
              'name' => 'stage',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 17,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 18,
            ],
            [
              'active' => true,
              'name' => 'utc_date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 19,
            ],
          ],
          'name' => 'person',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'competition',
                        'orig' => 'competition',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'team' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'address',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'area',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'away_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'club_color',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'coach',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'competition',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'crest',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'founded',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'group',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'home_team',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'last_updated',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'matchday',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'running_competition',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 14,
            ],
            [
              'active' => true,
              'name' => 'score',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 15,
            ],
            [
              'active' => true,
              'name' => 'season',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 16,
            ],
            [
              'active' => true,
              'name' => 'short_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 17,
            ],
            [
              'active' => true,
              'name' => 'squad',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 18,
            ],
            [
              'active' => true,
              'name' => 'staff',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 19,
            ],
            [
              'active' => true,
              'name' => 'stage',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 20,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 21,
            ],
            [
              'active' => true,
              'name' => 'tla',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 22,
            ],
            [
              'active' => true,
              'name' => 'utc_date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 23,
            ],
            [
              'active' => true,
              'name' => 'venue',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 24,
            ],
            [
              'active' => true,
              'name' => 'website',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 25,
            ],
          ],
          'name' => 'team',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'venue',
                        'orig' => 'venue',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 1,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
