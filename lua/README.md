# FootballData Lua SDK



The Lua SDK for the FootballData API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Area()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/football-data-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("football-data_sdk")

local client = sdk.new({
  apikey = os.getenv("FOOTBALL_DATA_APIKEY"),
})
```

### 2. List area records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local areas, err = client:Area():list()
if err then error(err) end

for _, item in ipairs(areas) do
  print(item["id"], item["countryCode"])
end
```

### 3. Load an area

```lua
local area, err = client:Area():load({ id = 1 })
if err then error(err) end
print(area)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local matchs, err = client:Match():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Match():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### FootballDataSDK

```lua
local sdk = require("football-data_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FootballDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Area` | `(data) -> AreaEntity` | Create an Area entity instance. |
| `Competition` | `(data) -> CompetitionEntity` | Create a Competition entity instance. |
| `Match` | `(data) -> MatchEntity` | Create a Match entity instance. |
| `Person` | `(data) -> PersonEntity` | Create a Person entity instance. |
| `Team` | `(data) -> TeamEntity` | Create a Team entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local area, err = client:Area():load({ id = "example_id" })
    if err then error(err) end
    -- area is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local area = client:Area(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `childAreas` | `table` | List of child areas |
| `countryCode` | `string` | ISO country code |
| `flag` | `string` | URL to the area's flag image |
| `id` | `number` | Unique identifier for the area |
| `name` | `string` | Name of the area |
| `parentArea` | `string` | Name of the parent area |
| `parentAreaId` | `number` | ID of the parent area |

#### Example: Load

```lua
local area, err = client:Area():load({ id = 1 })
```

#### Example: List

```lua
local areas, err = client:Area():list()
```


### Competition

Create an instance: `local competition = client:Competition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Team address |
| `area` | `table` |  |
| `assists` | `number` | Number of assists |
| `awayTeam` | `table` |  |
| `clubColors` | `string` | Team colors |
| `code` | `string` | Short code for the competition |
| `competition` | `table` |  |
| `crest` | `string` | URL to the team's crest image |
| `currentSeason` | `table` |  |
| `emblem` | `string` | URL to the competition's emblem |
| `founded` | `number` | Year the team was founded |
| `goals` | `number` | Number of goals scored |
| `group` | `string` | Group identifier |
| `homeTeam` | `table` |  |
| `id` | `number` | Unique identifier for the competition |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `name` | `string` | Name of the competition |
| `numberOfAvailableSeasons` | `number` | Number of seasons available |
| `penalties` | `number` | Number of penalty goals |
| `player` | `table` |  |
| `score` | `table` |  |
| `season` | `table` |  |
| `shortName` | `string` | Short name of the team |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `table` | `table` |  |
| `team` | `table` |  |
| `tla` | `string` | Three-letter abbreviation |
| `type` | `string` | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `string` | Match date and time in UTC |
| `venue` | `string` | Home stadium name |
| `website` | `string` | Team website URL |

#### Example: Load

```lua
local competition, err = client:Competition():load({ id = "competition_id" })
```

#### Example: List

```lua
local competitions, err = client:Competition():list()
```


### Match

Create an instance: `local match = client:Match(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area` | `table` |  |
| `awayTeam` | `table` |  |
| `bookings` | `table` |  |
| `competition` | `table` |  |
| `goals` | `table` |  |
| `group` | `string` | Group identifier |
| `homeTeam` | `table` |  |
| `id` | `number` | Unique identifier for the match |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `odds` | `table` | Match odds |
| `referees` | `table` |  |
| `score` | `table` |  |
| `season` | `table` |  |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `substitutions` | `table` |  |
| `utcDate` | `string` | Match date and time in UTC |
| `venue` | `string` | Stadium name |

#### Example: Load

```lua
local match, err = client:Match():load({ id = 1 })
```

#### Example: List

```lua
local matchs, err = client:Match():list()
```


### Person

Create an instance: `local person = client:Person(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `awayTeam` | `table` |  |
| `competition` | `table` |  |
| `dateOfBirth` | `string` | Date of birth |
| `firstName` | `string` | First name |
| `group` | `string` | Group identifier |
| `homeTeam` | `table` |  |
| `id` | `number` | Unique identifier for the person |
| `lastName` | `string` | Last name |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `name` | `string` | Full name of the person |
| `nationality` | `string` | Nationality |
| `position` | `string` | Playing position |
| `score` | `table` |  |
| `season` | `table` |  |
| `section` | `string` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `number` | Shirt number |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `utcDate` | `string` | Match date and time in UTC |

#### Example: Load

```lua
local person, err = client:Person():load({ id = 1 })
```

#### Example: List

```lua
local persons, err = client:Person():list()
```


### Team

Create an instance: `local team = client:Team(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Team address |
| `area` | `table` |  |
| `awayTeam` | `table` |  |
| `clubColors` | `string` | Team colors |
| `coach` | `table` |  |
| `competition` | `table` |  |
| `crest` | `string` | URL to the team's crest image |
| `founded` | `number` | Year the team was founded |
| `group` | `string` | Group identifier |
| `homeTeam` | `table` |  |
| `id` | `number` | Unique identifier for the team |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `name` | `string` | Name of the team |
| `runningCompetitions` | `table` | Competitions the team is currently participating in |
| `score` | `table` |  |
| `season` | `table` |  |
| `shortName` | `string` | Short name of the team |
| `squad` | `table` | Team squad members |
| `staff` | `table` | Team staff members |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `tla` | `string` | Three-letter abbreviation |
| `utcDate` | `string` | Match date and time in UTC |
| `venue` | `string` | Home stadium name |
| `website` | `string` | Team website URL |

#### Example: Load

```lua
local team, err = client:Team():load({ id = 1 })
```

#### Example: List

```lua
local teams, err = client:Team():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── football-data_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`football-data_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local match = client:Match()
match:list()

-- match:data_get() now returns the match data from the last list
-- match:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
