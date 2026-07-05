# FootballData Ruby SDK Reference

Complete API reference for the FootballData Ruby SDK.


## FootballDataSDK

### Constructor

```ruby
require_relative 'FootballData_sdk'

client = FootballDataSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FootballDataSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = FootballDataSDK.test
```


### Instance Methods

#### `Area(data = nil)`

Create a new `Area` entity instance. Pass `nil` for no initial data.

#### `Competition(data = nil)`

Create a new `Competition` entity instance. Pass `nil` for no initial data.

#### `Match(data = nil)`

Create a new `Match` entity instance. Pass `nil` for no initial data.

#### `Person(data = nil)`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `Team(data = nil)`

Create a new `Team` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AreaEntity

```ruby
area = client.Area
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_area` | `Array` | No |  |
| `country_code` | `String` | No |  |
| `flag` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `parent_area` | `String` | No |  |
| `parent_area_id` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Area.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Area.load({ "id" => "area_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AreaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CompetitionEntity

```ruby
competition = client.Competition
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | No |  |
| `area` | `Hash` | No |  |
| `assist` | `Integer` | No |  |
| `away_team` | `Hash` | No |  |
| `club_color` | `String` | No |  |
| `code` | `String` | No |  |
| `competition` | `Hash` | No |  |
| `crest` | `String` | No |  |
| `current_season` | `Hash` | No |  |
| `emblem` | `String` | No |  |
| `founded` | `Integer` | No |  |
| `goal` | `Integer` | No |  |
| `group` | `String` | No |  |
| `home_team` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `last_updated` | `String` | No |  |
| `matchday` | `Integer` | No |  |
| `name` | `String` | No |  |
| `number_of_available_season` | `Integer` | No |  |
| `penalty` | `Integer` | No |  |
| `player` | `Hash` | No |  |
| `score` | `Hash` | No |  |
| `season` | `Hash` | No |  |
| `short_name` | `String` | No |  |
| `stage` | `String` | No |  |
| `status` | `String` | No |  |
| `table` | `Array` | No |  |
| `team` | `Hash` | No |  |
| `tla` | `String` | No |  |
| `type` | `String` | No |  |
| `utc_date` | `String` | No |  |
| `venue` | `String` | No |  |
| `website` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Competition.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Competition.load({ "id" => "competition_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MatchEntity

```ruby
match = client.Match
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area` | `Hash` | No |  |
| `away_team` | `Hash` | No |  |
| `booking` | `Array` | No |  |
| `competition` | `Hash` | No |  |
| `goal` | `Array` | No |  |
| `group` | `String` | No |  |
| `home_team` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `last_updated` | `String` | No |  |
| `matchday` | `Integer` | No |  |
| `odd` | `Hash` | No |  |
| `referee` | `Array` | No |  |
| `score` | `Hash` | No |  |
| `season` | `Hash` | No |  |
| `stage` | `String` | No |  |
| `status` | `String` | No |  |
| `substitution` | `Array` | No |  |
| `utc_date` | `String` | No |  |
| `venue` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Match.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Match.load({ "id" => "match_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MatchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PersonEntity

```ruby
person = client.Person
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `away_team` | `Hash` | No |  |
| `competition` | `Hash` | No |  |
| `date_of_birth` | `String` | No |  |
| `first_name` | `String` | No |  |
| `group` | `String` | No |  |
| `home_team` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `last_name` | `String` | No |  |
| `last_updated` | `String` | No |  |
| `matchday` | `Integer` | No |  |
| `name` | `String` | No |  |
| `nationality` | `String` | No |  |
| `position` | `String` | No |  |
| `score` | `Hash` | No |  |
| `season` | `Hash` | No |  |
| `section` | `String` | No |  |
| `shirt_number` | `Integer` | No |  |
| `stage` | `String` | No |  |
| `status` | `String` | No |  |
| `utc_date` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Person.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Person.load({ "id" => "person_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TeamEntity

```ruby
team = client.Team
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | No |  |
| `area` | `Hash` | No |  |
| `away_team` | `Hash` | No |  |
| `club_color` | `String` | No |  |
| `coach` | `Hash` | No |  |
| `competition` | `Hash` | No |  |
| `crest` | `String` | No |  |
| `founded` | `Integer` | No |  |
| `group` | `String` | No |  |
| `home_team` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `last_updated` | `String` | No |  |
| `matchday` | `Integer` | No |  |
| `name` | `String` | No |  |
| `running_competition` | `Array` | No |  |
| `score` | `Hash` | No |  |
| `season` | `Hash` | No |  |
| `short_name` | `String` | No |  |
| `squad` | `Array` | No |  |
| `staff` | `Array` | No |  |
| `stage` | `String` | No |  |
| `status` | `String` | No |  |
| `tla` | `String` | No |  |
| `utc_date` | `String` | No |  |
| `venue` | `String` | No |  |
| `website` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Team.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Team.load({ "id" => "team_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TeamEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = FootballDataSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

