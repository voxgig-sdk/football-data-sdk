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
| `child_area` | `table` | No |  |
| `country_code` | `string` | No |  |
| `flag` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `parent_area` | `string` | No |  |
| `parent_area_id` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Area():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Area():load({ id = "area_id" })
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
| `assist` | `number` | No |  |
| `away_team` | `table` | No |  |
| `club_color` | `string` | No |  |
| `code` | `string` | No |  |
| `competition` | `table` | No |  |
| `crest` | `string` | No |  |
| `current_season` | `table` | No |  |
| `emblem` | `string` | No |  |
| `founded` | `number` | No |  |
| `goal` | `number` | No |  |
| `group` | `string` | No |  |
| `home_team` | `table` | No |  |
| `id` | `number` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `number_of_available_season` | `number` | No |  |
| `penalty` | `number` | No |  |
| `player` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `short_name` | `string` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `table` | `table` | No |  |
| `team` | `table` | No |  |
| `tla` | `string` | No |  |
| `type` | `string` | No |  |
| `utc_date` | `string` | No |  |
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
| `away_team` | `table` | No |  |
| `booking` | `table` | No |  |
| `competition` | `table` | No |  |
| `goal` | `table` | No |  |
| `group` | `string` | No |  |
| `home_team` | `table` | No |  |
| `id` | `number` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `odd` | `table` | No |  |
| `referee` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `substitution` | `table` | No |  |
| `utc_date` | `string` | No |  |
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
local result, err = client:Match():load({ id = "match_id" })
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
| `away_team` | `table` | No |  |
| `competition` | `table` | No |  |
| `date_of_birth` | `string` | No |  |
| `first_name` | `string` | No |  |
| `group` | `string` | No |  |
| `home_team` | `table` | No |  |
| `id` | `number` | No |  |
| `last_name` | `string` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `position` | `string` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `section` | `string` | No |  |
| `shirt_number` | `number` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `utc_date` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Person():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Person():load({ id = "person_id" })
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
| `away_team` | `table` | No |  |
| `club_color` | `string` | No |  |
| `coach` | `table` | No |  |
| `competition` | `table` | No |  |
| `crest` | `string` | No |  |
| `founded` | `number` | No |  |
| `group` | `string` | No |  |
| `home_team` | `table` | No |  |
| `id` | `number` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `running_competition` | `table` | No |  |
| `score` | `table` | No |  |
| `season` | `table` | No |  |
| `short_name` | `string` | No |  |
| `squad` | `table` | No |  |
| `staff` | `table` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `tla` | `string` | No |  |
| `utc_date` | `string` | No |  |
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
local result, err = client:Team():load({ id = "team_id" })
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

