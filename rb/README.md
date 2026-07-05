# FootballData Ruby SDK



The Ruby SDK for the FootballData API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Area` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/football-data-sdk/releases](https://github.com/voxgig-sdk/football-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FootballData_sdk"

client = FootballDataSDK.new({
  "apikey" => ENV["FOOTBALL_DATA_APIKEY"],
})
```

### 2. List area records

```ruby
begin
  # list returns an Array of Area records — iterate directly.
  areas = client.Area.list
  areas.each do |item|
    puts "#{item["id"]} #{item["child_area"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an area

```ruby
begin
  # load returns the bare Area record (raises on error).
  area = client.Area.load({ "id" => "example_id" })
  puts area
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  areas = client.Area.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = FootballDataSDK.test({
  "entity" => { "area" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
area = client.Area.list()
puts area
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = FootballDataSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FOOTBALL_DATA_TEST_LIVE=TRUE
FOOTBALL_DATA_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### FootballDataSDK

```ruby
require_relative "FootballData_sdk"
client = FootballDataSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = FootballDataSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FootballDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Area` | `(data) -> AreaEntity` | Create an Area entity instance. |
| `Competition` | `(data) -> CompetitionEntity` | Create a Competition entity instance. |
| `Match` | `(data) -> MatchEntity` | Create a Match entity instance. |
| `Person` | `(data) -> PersonEntity` | Create a Person entity instance. |
| `Team` | `(data) -> TeamEntity` | Create a Team entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `FootballDataError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Area

| Field | Description |
| --- | --- |
| `child_area` |  |
| `country_code` |  |
| `flag` |  |
| `id` |  |
| `name` |  |
| `parent_area` |  |
| `parent_area_id` |  |

Operations: List, Load.

API path: `/areas`

#### Competition

| Field | Description |
| --- | --- |
| `address` |  |
| `area` |  |
| `assist` |  |
| `away_team` |  |
| `club_color` |  |
| `code` |  |
| `competition` |  |
| `crest` |  |
| `current_season` |  |
| `emblem` |  |
| `founded` |  |
| `goal` |  |
| `group` |  |
| `home_team` |  |
| `id` |  |
| `last_updated` |  |
| `matchday` |  |
| `name` |  |
| `number_of_available_season` |  |
| `penalty` |  |
| `player` |  |
| `score` |  |
| `season` |  |
| `short_name` |  |
| `stage` |  |
| `status` |  |
| `table` |  |
| `team` |  |
| `tla` |  |
| `type` |  |
| `utc_date` |  |
| `venue` |  |
| `website` |  |

Operations: List, Load.

API path: `/competitions/{id}/matches`

#### Match

| Field | Description |
| --- | --- |
| `area` |  |
| `away_team` |  |
| `booking` |  |
| `competition` |  |
| `goal` |  |
| `group` |  |
| `home_team` |  |
| `id` |  |
| `last_updated` |  |
| `matchday` |  |
| `odd` |  |
| `referee` |  |
| `score` |  |
| `season` |  |
| `stage` |  |
| `status` |  |
| `substitution` |  |
| `utc_date` |  |
| `venue` |  |

Operations: List, Load.

API path: `/matches`

#### Person

| Field | Description |
| --- | --- |
| `away_team` |  |
| `competition` |  |
| `date_of_birth` |  |
| `first_name` |  |
| `group` |  |
| `home_team` |  |
| `id` |  |
| `last_name` |  |
| `last_updated` |  |
| `matchday` |  |
| `name` |  |
| `nationality` |  |
| `position` |  |
| `score` |  |
| `season` |  |
| `section` |  |
| `shirt_number` |  |
| `stage` |  |
| `status` |  |
| `utc_date` |  |

Operations: List, Load.

API path: `/persons/{id}/matches`

#### Team

| Field | Description |
| --- | --- |
| `address` |  |
| `area` |  |
| `away_team` |  |
| `club_color` |  |
| `coach` |  |
| `competition` |  |
| `crest` |  |
| `founded` |  |
| `group` |  |
| `home_team` |  |
| `id` |  |
| `last_updated` |  |
| `matchday` |  |
| `name` |  |
| `running_competition` |  |
| `score` |  |
| `season` |  |
| `short_name` |  |
| `squad` |  |
| `staff` |  |
| `stage` |  |
| `status` |  |
| `tla` |  |
| `utc_date` |  |
| `venue` |  |
| `website` |  |

Operations: List, Load.

API path: `/teams/{id}/matches`



## Entities


### Area

Create an instance: `area = client.Area`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_area` | `Array` |  |
| `country_code` | `String` |  |
| `flag` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `parent_area` | `String` |  |
| `parent_area_id` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Area record (raises on error).
area = client.Area.load({ "id" => "area_id" })
```

#### Example: List

```ruby
# list returns an Array of Area records (raises on error).
areas = client.Area.list
```


### Competition

Create an instance: `competition = client.Competition`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `String` |  |
| `area` | `Hash` |  |
| `assist` | `Integer` |  |
| `away_team` | `Hash` |  |
| `club_color` | `String` |  |
| `code` | `String` |  |
| `competition` | `Hash` |  |
| `crest` | `String` |  |
| `current_season` | `Hash` |  |
| `emblem` | `String` |  |
| `founded` | `Integer` |  |
| `goal` | `Integer` |  |
| `group` | `String` |  |
| `home_team` | `Hash` |  |
| `id` | `Integer` |  |
| `last_updated` | `String` |  |
| `matchday` | `Integer` |  |
| `name` | `String` |  |
| `number_of_available_season` | `Integer` |  |
| `penalty` | `Integer` |  |
| `player` | `Hash` |  |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `short_name` | `String` |  |
| `stage` | `String` |  |
| `status` | `String` |  |
| `table` | `Array` |  |
| `team` | `Hash` |  |
| `tla` | `String` |  |
| `type` | `String` |  |
| `utc_date` | `String` |  |
| `venue` | `String` |  |
| `website` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Competition record (raises on error).
competition = client.Competition.load({ "id" => "competition_id" })
```

#### Example: List

```ruby
# list returns an Array of Competition records (raises on error).
competitions = client.Competition.list
```


### Match

Create an instance: `match = client.Match`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area` | `Hash` |  |
| `away_team` | `Hash` |  |
| `booking` | `Array` |  |
| `competition` | `Hash` |  |
| `goal` | `Array` |  |
| `group` | `String` |  |
| `home_team` | `Hash` |  |
| `id` | `Integer` |  |
| `last_updated` | `String` |  |
| `matchday` | `Integer` |  |
| `odd` | `Hash` |  |
| `referee` | `Array` |  |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `stage` | `String` |  |
| `status` | `String` |  |
| `substitution` | `Array` |  |
| `utc_date` | `String` |  |
| `venue` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Match record (raises on error).
match = client.Match.load({ "id" => "match_id" })
```

#### Example: List

```ruby
# list returns an Array of Match records (raises on error).
matchs = client.Match.list
```


### Person

Create an instance: `person = client.Person`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `away_team` | `Hash` |  |
| `competition` | `Hash` |  |
| `date_of_birth` | `String` |  |
| `first_name` | `String` |  |
| `group` | `String` |  |
| `home_team` | `Hash` |  |
| `id` | `Integer` |  |
| `last_name` | `String` |  |
| `last_updated` | `String` |  |
| `matchday` | `Integer` |  |
| `name` | `String` |  |
| `nationality` | `String` |  |
| `position` | `String` |  |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `section` | `String` |  |
| `shirt_number` | `Integer` |  |
| `stage` | `String` |  |
| `status` | `String` |  |
| `utc_date` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Person record (raises on error).
person = client.Person.load({ "id" => "person_id" })
```

#### Example: List

```ruby
# list returns an Array of Person records (raises on error).
persons = client.Person.list
```


### Team

Create an instance: `team = client.Team`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `String` |  |
| `area` | `Hash` |  |
| `away_team` | `Hash` |  |
| `club_color` | `String` |  |
| `coach` | `Hash` |  |
| `competition` | `Hash` |  |
| `crest` | `String` |  |
| `founded` | `Integer` |  |
| `group` | `String` |  |
| `home_team` | `Hash` |  |
| `id` | `Integer` |  |
| `last_updated` | `String` |  |
| `matchday` | `Integer` |  |
| `name` | `String` |  |
| `running_competition` | `Array` |  |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `short_name` | `String` |  |
| `squad` | `Array` |  |
| `staff` | `Array` |  |
| `stage` | `String` |  |
| `status` | `String` |  |
| `tla` | `String` |  |
| `utc_date` | `String` |  |
| `venue` | `String` |  |
| `website` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Team record (raises on error).
team = client.Team.load({ "id" => "team_id" })
```

#### Example: List

```ruby
# list returns an Array of Team records (raises on error).
teams = client.Team.list
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── FootballData_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`FootballData_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
area = client.Area
area.list()

# area.data_get now returns the area data from the last list
# area.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
