# FootballData Lua SDK Reference

Complete API reference for the FootballData Lua SDK.


## FootballDataSDK

### Constructor

```lua
local sdk = require("football-data_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Area(data)`

Create a new `Area` entity instance. Pass `nil` for no initial data.

#### `Competition(data)`

Create a new `Competition` entity instance. Pass `nil` for no initial data.

#### `Match(data)`

Create a new `Match` entity instance. Pass `nil` for no initial data.

#### `Person(data)`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `Team(data)`

Create a new `Team` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AreaEntity

```lua
local area = client:Area(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `childAreas` | `table` | No | List of child areas |
| `countryCode` | `string` | No | ISO country code |
| `flag` | `string` | No | URL to the area's flag image |
| `id` | `number` | No | Unique identifier for the area |
| `name` | `string` | No | Name of the area |
| `parentArea` | `string` | No | Name of the parent area |
| `parentAreaId` | `number` | No | ID of the parent area |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Area():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Area():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AreaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CompetitionEntity

```lua
local competition = client:Competition(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `table` | No |  |
| `assists` | `number` | No | Number of assists |
| `awayTeam` | `table` | No |  |
| `clubColors` | `string` | No | Team colors |
| `code` | `string` | No | Short code for the competition |
| `competition` | `table` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `currentSeason` | `table` | No |  |
| `emblem` | `string` | No | URL to the competition's emblem |
| `founded` | `number` | No | Year the team was founded |
| `goals` | `number` | No | Number of goals scored |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No | Unique identifier for the competition |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `name` | `string` | No | Name of the competition |
| `numberOfAvailableSeasons` | `number` | No | Number of seasons available |
| `penalties` | `number` | No | Number of penalty goals |
| `player` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `table` | `table` | No |  |
| `team` | `table` | No |  |
| `tla` | `string` | No | Three-letter abbreviation |
| `type` | `string` | No | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Competition():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Competition():load({ id = "competition_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MatchEntity

```lua
local match = client:Match(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area` | `table` | No |  |
| `awayTeam` | `table` | No |  |
| `bookings` | `table` | No |  |
| `competition` | `table` | No |  |
| `goals` | `table` | No |  |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No | Unique identifier for the match |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `odds` | `table` | No | Match odds |
| `referees` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `substitutions` | `table` | No |  |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Stadium name |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Match():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Match():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MatchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PersonEntity

```lua
local person = client:Person(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `awayTeam` | `table` | No |  |
| `competition` | `table` | No |  |
| `dateOfBirth` | `string` | No | Date of birth |
| `firstName` | `string` | No | First name |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No | Unique identifier for the person |
| `lastName` | `string` | No | Last name |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `name` | `string` | No | Full name of the person |
| `nationality` | `string` | No | Nationality |
| `position` | `string` | No | Playing position |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `section` | `string` | No | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `number` | No | Shirt number |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `utcDate` | `string` | No | Match date and time in UTC |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Person():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Person():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TeamEntity

```lua
local team = client:Team(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `table` | No |  |
| `awayTeam` | `table` | No |  |
| `clubColors` | `string` | No | Team colors |
| `coach` | `table` | No |  |
| `competition` | `table` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `founded` | `number` | No | Year the team was founded |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No | Unique identifier for the team |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `name` | `string` | No | Name of the team |
| `runningCompetitions` | `table` | No | Competitions the team is currently participating in |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `squad` | `table` | No | Team squad members |
| `staff` | `table` | No | Team staff members |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `tla` | `string` | No | Three-letter abbreviation |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Team():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Team():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TeamEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

