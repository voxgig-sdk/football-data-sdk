# FootballData Golang SDK Reference

Complete API reference for the FootballData Golang SDK.


## FootballDataSDK

### Constructor

```go
func NewFootballDataSDK(options map[string]any) *FootballDataSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *FootballDataSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *FootballDataSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Area(data map[string]any) FootballDataEntity`

Create a new `Area` entity instance. Pass `nil` for no initial data.

#### `Competition(data map[string]any) FootballDataEntity`

Create a new `Competition` entity instance. Pass `nil` for no initial data.

#### `Match(data map[string]any) FootballDataEntity`

Create a new `Match` entity instance. Pass `nil` for no initial data.

#### `Person(data map[string]any) FootballDataEntity`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `Team(data map[string]any) FootballDataEntity`

Create a new `Team` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AreaEntity

```go
area := client.Area(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_area` | `[]any` | No |  |
| `country_code` | `string` | No |  |
| `flag` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `parent_area` | `string` | No |  |
| `parent_area_id` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Area(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Area(nil).Load(map[string]any{"id": "area_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AreaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CompetitionEntity

```go
competition := client.Competition(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `area` | `map[string]any` | No |  |
| `assist` | `int` | No |  |
| `away_team` | `map[string]any` | No |  |
| `club_color` | `string` | No |  |
| `code` | `string` | No |  |
| `competition` | `map[string]any` | No |  |
| `crest` | `string` | No |  |
| `current_season` | `map[string]any` | No |  |
| `emblem` | `string` | No |  |
| `founded` | `int` | No |  |
| `goal` | `int` | No |  |
| `group` | `string` | No |  |
| `home_team` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `number_of_available_season` | `int` | No |  |
| `penalty` | `int` | No |  |
| `player` | `map[string]any` | No |  |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `short_name` | `string` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `table` | `[]any` | No |  |
| `team` | `map[string]any` | No |  |
| `tla` | `string` | No |  |
| `type` | `string` | No |  |
| `utc_date` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Competition(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Competition(nil).Load(map[string]any{"id": "competition_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MatchEntity

```go
match := client.Match(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area` | `map[string]any` | No |  |
| `away_team` | `map[string]any` | No |  |
| `booking` | `[]any` | No |  |
| `competition` | `map[string]any` | No |  |
| `goal` | `[]any` | No |  |
| `group` | `string` | No |  |
| `home_team` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `odd` | `map[string]any` | No |  |
| `referee` | `[]any` | No |  |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `substitution` | `[]any` | No |  |
| `utc_date` | `string` | No |  |
| `venue` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Match(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Match(nil).Load(map[string]any{"id": "match_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MatchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PersonEntity

```go
person := client.Person(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `away_team` | `map[string]any` | No |  |
| `competition` | `map[string]any` | No |  |
| `date_of_birth` | `string` | No |  |
| `first_name` | `string` | No |  |
| `group` | `string` | No |  |
| `home_team` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `last_name` | `string` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `position` | `string` | No |  |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `section` | `string` | No |  |
| `shirt_number` | `int` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `utc_date` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Person(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Person(nil).Load(map[string]any{"id": "person_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TeamEntity

```go
team := client.Team(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `area` | `map[string]any` | No |  |
| `away_team` | `map[string]any` | No |  |
| `club_color` | `string` | No |  |
| `coach` | `map[string]any` | No |  |
| `competition` | `map[string]any` | No |  |
| `crest` | `string` | No |  |
| `founded` | `int` | No |  |
| `group` | `string` | No |  |
| `home_team` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `running_competition` | `[]any` | No |  |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `short_name` | `string` | No |  |
| `squad` | `[]any` | No |  |
| `staff` | `[]any` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `tla` | `string` | No |  |
| `utc_date` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Team(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Team(nil).Load(map[string]any{"id": "team_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TeamEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewFootballDataSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

