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
    puts "#{item["id"]} #{item["childAreas"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an area

```ruby
begin
  # load returns the ENTITY — call data_get for the Area record (raises on error).
  area = client.Area.load({ "id" => 1 })
  puts area
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  matchs = client.Match.list()
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
  "entity" => { "match" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
match = client.Match.list()
puts match
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
| `childAreas` | List of child areas |
| `countryCode` | ISO country code |
| `flag` | URL to the area's flag image |
| `id` | Unique identifier for the area |
| `name` | Name of the area |
| `parentArea` | Name of the parent area |
| `parentAreaId` | ID of the parent area |

Operations: List, Load.

API path: `/areas`

#### Competition

| Field | Description |
| --- | --- |
| `address` | Team address |
| `area` |  |
| `assists` | Number of assists |
| `awayTeam` |  |
| `clubColors` | Team colors |
| `code` | Short code for the competition |
| `competition` |  |
| `crest` | URL to the team's crest image |
| `currentSeason` |  |
| `emblem` | URL to the competition's emblem |
| `founded` | Year the team was founded |
| `goals` | Number of goals scored |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the competition |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `name` | Name of the competition |
| `numberOfAvailableSeasons` | Number of seasons available |
| `penalties` | Number of penalty goals |
| `player` |  |
| `score` |  |
| `season` |  |
| `shortName` | Short name of the team |
| `stage` | Match stage |
| `status` | Match status |
| `table` |  |
| `team` |  |
| `tla` | Three-letter abbreviation |
| `type` | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | Match date and time in UTC |
| `venue` | Home stadium name |
| `website` | Team website URL |

Operations: List, Load.

API path: `/competitions/{id}/matches`

#### Match

| Field | Description |
| --- | --- |
| `area` |  |
| `awayTeam` |  |
| `bookings` |  |
| `competition` |  |
| `goals` |  |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the match |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `odds` | Match odds |
| `referees` |  |
| `score` |  |
| `season` |  |
| `stage` | Match stage |
| `status` | Match status |
| `substitutions` |  |
| `utcDate` | Match date and time in UTC |
| `venue` | Stadium name |

Operations: List, Load.

API path: `/matches`

#### Person

| Field | Description |
| --- | --- |
| `awayTeam` |  |
| `competition` |  |
| `dateOfBirth` | Date of birth |
| `firstName` | First name |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the person |
| `lastName` | Last name |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `name` | Full name of the person |
| `nationality` | Nationality |
| `position` | Playing position |
| `score` |  |
| `season` |  |
| `section` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | Shirt number |
| `stage` | Match stage |
| `status` | Match status |
| `utcDate` | Match date and time in UTC |

Operations: List, Load.

API path: `/persons/{id}/matches`

#### Team

| Field | Description |
| --- | --- |
| `address` | Team address |
| `area` |  |
| `awayTeam` |  |
| `clubColors` | Team colors |
| `coach` |  |
| `competition` |  |
| `crest` | URL to the team's crest image |
| `founded` | Year the team was founded |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the team |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `name` | Name of the team |
| `runningCompetitions` | Competitions the team is currently participating in |
| `score` |  |
| `season` |  |
| `shortName` | Short name of the team |
| `squad` | Team squad members |
| `staff` | Team staff members |
| `stage` | Match stage |
| `status` | Match status |
| `tla` | Three-letter abbreviation |
| `utcDate` | Match date and time in UTC |
| `venue` | Home stadium name |
| `website` | Team website URL |

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
| `childAreas` | `Array` | List of child areas |
| `countryCode` | `String` | ISO country code |
| `flag` | `String` | URL to the area's flag image |
| `id` | `Integer` | Unique identifier for the area |
| `name` | `String` | Name of the area |
| `parentArea` | `String` | Name of the parent area |
| `parentAreaId` | `Integer` | ID of the parent area |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Area record (raises on error).
area = client.Area.load({ "id" => 1 })
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
| `address` | `String` | Team address |
| `area` | `Hash` |  |
| `assists` | `Integer` | Number of assists |
| `awayTeam` | `Hash` |  |
| `clubColors` | `String` | Team colors |
| `code` | `String` | Short code for the competition |
| `competition` | `Hash` |  |
| `crest` | `String` | URL to the team's crest image |
| `currentSeason` | `Hash` |  |
| `emblem` | `String` | URL to the competition's emblem |
| `founded` | `Integer` | Year the team was founded |
| `goals` | `Integer` | Number of goals scored |
| `group` | `String` | Group identifier |
| `homeTeam` | `Hash` |  |
| `id` | `Integer` | Unique identifier for the competition |
| `lastUpdated` | `String` | Last update timestamp |
| `matchday` | `Integer` | Matchday number |
| `name` | `String` | Name of the competition |
| `numberOfAvailableSeasons` | `Integer` | Number of seasons available |
| `penalties` | `Integer` | Number of penalty goals |
| `player` | `Hash` |  |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `shortName` | `String` | Short name of the team |
| `stage` | `String` | Match stage |
| `status` | `String` | Match status |
| `table` | `Array` |  |
| `team` | `Hash` |  |
| `tla` | `String` | Three-letter abbreviation |
| `type` | `String` | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `String` | Match date and time in UTC |
| `venue` | `String` | Home stadium name |
| `website` | `String` | Team website URL |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Competition record (raises on error).
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
| `awayTeam` | `Hash` |  |
| `bookings` | `Array` |  |
| `competition` | `Hash` |  |
| `goals` | `Array` |  |
| `group` | `String` | Group identifier |
| `homeTeam` | `Hash` |  |
| `id` | `Integer` | Unique identifier for the match |
| `lastUpdated` | `String` | Last update timestamp |
| `matchday` | `Integer` | Matchday number |
| `odds` | `Hash` | Match odds |
| `referees` | `Array` |  |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `stage` | `String` | Match stage |
| `status` | `String` | Match status |
| `substitutions` | `Array` |  |
| `utcDate` | `String` | Match date and time in UTC |
| `venue` | `String` | Stadium name |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Match record (raises on error).
match = client.Match.load({ "id" => 1 })
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
| `awayTeam` | `Hash` |  |
| `competition` | `Hash` |  |
| `dateOfBirth` | `String` | Date of birth |
| `firstName` | `String` | First name |
| `group` | `String` | Group identifier |
| `homeTeam` | `Hash` |  |
| `id` | `Integer` | Unique identifier for the person |
| `lastName` | `String` | Last name |
| `lastUpdated` | `String` | Last update timestamp |
| `matchday` | `Integer` | Matchday number |
| `name` | `String` | Full name of the person |
| `nationality` | `String` | Nationality |
| `position` | `String` | Playing position |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `section` | `String` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `Integer` | Shirt number |
| `stage` | `String` | Match stage |
| `status` | `String` | Match status |
| `utcDate` | `String` | Match date and time in UTC |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Person record (raises on error).
person = client.Person.load({ "id" => 1 })
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
| `address` | `String` | Team address |
| `area` | `Hash` |  |
| `awayTeam` | `Hash` |  |
| `clubColors` | `String` | Team colors |
| `coach` | `Hash` |  |
| `competition` | `Hash` |  |
| `crest` | `String` | URL to the team's crest image |
| `founded` | `Integer` | Year the team was founded |
| `group` | `String` | Group identifier |
| `homeTeam` | `Hash` |  |
| `id` | `Integer` | Unique identifier for the team |
| `lastUpdated` | `String` | Last update timestamp |
| `matchday` | `Integer` | Matchday number |
| `name` | `String` | Name of the team |
| `runningCompetitions` | `Array` | Competitions the team is currently participating in |
| `score` | `Hash` |  |
| `season` | `Hash` |  |
| `shortName` | `String` | Short name of the team |
| `squad` | `Array` | Team squad members |
| `staff` | `Array` | Team staff members |
| `stage` | `String` | Match stage |
| `status` | `String` | Match status |
| `tla` | `String` | Three-letter abbreviation |
| `utcDate` | `String` | Match date and time in UTC |
| `venue` | `String` | Home stadium name |
| `website` | `String` | Team website URL |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Team record (raises on error).
team = client.Team.load({ "id" => 1 })
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
match = client.Match
match.list()

# match.data_get now returns the match data from the last list
# match.match_get returns the last match criteria
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
