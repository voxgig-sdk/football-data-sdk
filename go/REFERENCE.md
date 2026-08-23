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
fmt.Println(area.GetName()) // "area"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `childAreas` | `[]any` | No | List of child areas |
| `countryCode` | `string` | No | ISO country code |
| `flag` | `string` | No | URL to the area's flag image |
| `id` | `int` | No | Unique identifier for the area |
| `name` | `string` | No | Name of the area |
| `parentArea` | `string` | No | Name of the parent area |
| `parentAreaId` | `int` | No | ID of the parent area |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Area(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Area(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(competition.GetName()) // "competition"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `map[string]any` | No |  |
| `assists` | `int` | No | Number of assists |
| `awayTeam` | `map[string]any` | No |  |
| `clubColors` | `string` | No | Team colors |
| `code` | `string` | No | Short code for the competition |
| `competition` | `map[string]any` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `currentSeason` | `map[string]any` | No |  |
| `emblem` | `string` | No | URL to the competition's emblem |
| `founded` | `int` | No | Year the team was founded |
| `goals` | `int` | No | Number of goals scored |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `map[string]any` | No |  |
| `id` | `int` | No | Unique identifier for the competition |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `string` | No | Name of the competition |
| `numberOfAvailableSeasons` | `int` | No | Number of seasons available |
| `penalties` | `int` | No | Number of penalty goals |
| `player` | `map[string]any` | No |  |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `table` | `[]any` | No |  |
| `team` | `map[string]any` | No |  |
| `tla` | `string` | No | Three-letter abbreviation |
| `type` | `string` | No | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Competition(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Competition(nil).Load(map[string]any{"id": "competition_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(match.GetName()) // "match"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area` | `map[string]any` | No |  |
| `awayTeam` | `map[string]any` | No |  |
| `bookings` | `[]any` | No |  |
| `competition` | `map[string]any` | No |  |
| `goals` | `[]any` | No |  |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `map[string]any` | No |  |
| `id` | `int` | No | Unique identifier for the match |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `odds` | `map[string]any` | No | Match odds |
| `referees` | `[]any` | No |  |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `substitutions` | `[]any` | No |  |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Stadium name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Match(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Match(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(person.GetName()) // "person"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `awayTeam` | `map[string]any` | No |  |
| `competition` | `map[string]any` | No |  |
| `dateOfBirth` | `string` | No | Date of birth |
| `firstName` | `string` | No | First name |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `map[string]any` | No |  |
| `id` | `int` | No | Unique identifier for the person |
| `lastName` | `string` | No | Last name |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `string` | No | Full name of the person |
| `nationality` | `string` | No | Nationality |
| `position` | `string` | No | Playing position |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `section` | `string` | No | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `int` | No | Shirt number |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `utcDate` | `string` | No | Match date and time in UTC |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Person(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Person(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(team.GetName()) // "team"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `map[string]any` | No |  |
| `awayTeam` | `map[string]any` | No |  |
| `clubColors` | `string` | No | Team colors |
| `coach` | `map[string]any` | No |  |
| `competition` | `map[string]any` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `founded` | `int` | No | Year the team was founded |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `map[string]any` | No |  |
| `id` | `int` | No | Unique identifier for the team |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `string` | No | Name of the team |
| `runningCompetitions` | `[]any` | No | Competitions the team is currently participating in |
| `score` | `map[string]any` | No |  |
| `season` | `map[string]any` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `squad` | `[]any` | No | Team squad members |
| `staff` | `[]any` | No | Team staff members |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `tla` | `string` | No | Three-letter abbreviation |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Team(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Team(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

