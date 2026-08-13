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
| `childAreas` | `table` | No |  |
| `countryCode` | `string` | No |  |
| `flag` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `parentArea` | `string` | No |  |
| `parentAreaId` | `number` | No |  |

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
| `address` | `string` | No |  |
| `area` | `table` | No |  |
| `assists` | `number` | No |  |
| `awayTeam` | `table` | No |  |
| `clubColors` | `string` | No |  |
| `code` | `string` | No |  |
| `competition` | `table` | No |  |
| `crest` | `string` | No |  |
| `currentSeason` | `table` | No |  |
| `emblem` | `string` | No |  |
| `founded` | `number` | No |  |
| `goals` | `number` | No |  |
| `group` | `string` | No |  |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `numberOfAvailableSeasons` | `number` | No |  |
| `penalties` | `number` | No |  |
| `player` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `shortName` | `string` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `table` | `table` | No |  |
| `team` | `table` | No |  |
| `tla` | `string` | No |  |
| `type` | `string` | No |  |
| `utcDate` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

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
| `group` | `string` | No |  |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `odds` | `table` | No |  |
| `referees` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `substitutions` | `table` | No |  |
| `utcDate` | `string` | No |  |
| `venue` | `string` | No |  |

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
| `dateOfBirth` | `string` | No |  |
| `firstName` | `string` | No |  |
| `group` | `string` | No |  |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No |  |
| `lastName` | `string` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `position` | `string` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `section` | `string` | No |  |
| `shirtNumber` | `number` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `utcDate` | `string` | No |  |

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
| `address` | `string` | No |  |
| `area` | `table` | No |  |
| `awayTeam` | `table` | No |  |
| `clubColors` | `string` | No |  |
| `coach` | `table` | No |  |
| `competition` | `table` | No |  |
| `crest` | `string` | No |  |
| `founded` | `number` | No |  |
| `group` | `string` | No |  |
| `homeTeam` | `table` | No |  |
| `id` | `number` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `runningCompetitions` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `shortName` | `string` | No |  |
| `squad` | `table` | No |  |
| `staff` | `table` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `tla` | `string` | No |  |
| `utcDate` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

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

