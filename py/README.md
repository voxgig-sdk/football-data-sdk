# FootballData Python SDK



The Python SDK for the FootballData API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Area()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/football-data-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from footballdata_sdk import FootballDataSDK

client = FootballDataSDK({
    "apikey": os.environ.get("FOOTBALL_DATA_APIKEY"),
})
```

### 2. List area records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    areas = client.Area().list()
    for area in areas:
        print(area)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an area

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    area = client.Area().load({"id": 1})
    print(area)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    matchs = client.Match().list()
    print(matchs)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = FootballDataSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
match = client.Match().list()
# match contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = FootballDataSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### FootballDataSDK

```python
from footballdata_sdk import FootballDataSDK

client = FootballDataSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = FootballDataSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### FootballDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `area = client.Area()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `childAreas` | `list` | List of child areas |
| `countryCode` | `str` | ISO country code |
| `flag` | `str` | URL to the area's flag image |
| `id` | `int` | Unique identifier for the area |
| `name` | `str` | Name of the area |
| `parentArea` | `str` | Name of the parent area |
| `parentAreaId` | `int` | ID of the parent area |

#### Example: Load

```python
area = client.Area().load({"id": 1})
```

#### Example: List

```python
areas = client.Area().list()
```


### Competition

Create an instance: `competition = client.Competition()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` | Team address |
| `area` | `dict` |  |
| `assists` | `int` | Number of assists |
| `awayTeam` | `dict` |  |
| `clubColors` | `str` | Team colors |
| `code` | `str` | Short code for the competition |
| `competition` | `dict` |  |
| `crest` | `str` | URL to the team's crest image |
| `currentSeason` | `dict` |  |
| `emblem` | `str` | URL to the competition's emblem |
| `founded` | `int` | Year the team was founded |
| `goals` | `int` | Number of goals scored |
| `group` | `str` | Group identifier |
| `homeTeam` | `dict` |  |
| `id` | `int` | Unique identifier for the competition |
| `lastUpdated` | `str` | Last update timestamp |
| `matchday` | `int` | Matchday number |
| `name` | `str` | Name of the competition |
| `numberOfAvailableSeasons` | `int` | Number of seasons available |
| `penalties` | `int` | Number of penalty goals |
| `player` | `dict` |  |
| `score` | `dict` |  |
| `season` | `dict` |  |
| `shortName` | `str` | Short name of the team |
| `stage` | `str` | Match stage |
| `status` | `str` | Match status |
| `table` | `list` |  |
| `team` | `dict` |  |
| `tla` | `str` | Three-letter abbreviation |
| `type` | `str` | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `str` | Match date and time in UTC |
| `venue` | `str` | Home stadium name |
| `website` | `str` | Team website URL |

#### Example: Load

```python
competition = client.Competition().load({"id": "competition_id"})
```

#### Example: List

```python
competitions = client.Competition().list()
```


### Match

Create an instance: `match = client.Match()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area` | `dict` |  |
| `awayTeam` | `dict` |  |
| `bookings` | `list` |  |
| `competition` | `dict` |  |
| `goals` | `list` |  |
| `group` | `str` | Group identifier |
| `homeTeam` | `dict` |  |
| `id` | `int` | Unique identifier for the match |
| `lastUpdated` | `str` | Last update timestamp |
| `matchday` | `int` | Matchday number |
| `odds` | `dict` | Match odds |
| `referees` | `list` |  |
| `score` | `dict` |  |
| `season` | `dict` |  |
| `stage` | `str` | Match stage |
| `status` | `str` | Match status |
| `substitutions` | `list` |  |
| `utcDate` | `str` | Match date and time in UTC |
| `venue` | `str` | Stadium name |

#### Example: Load

```python
match = client.Match().load({"id": 1})
```

#### Example: List

```python
matchs = client.Match().list()
```


### Person

Create an instance: `person = client.Person()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `awayTeam` | `dict` |  |
| `competition` | `dict` |  |
| `dateOfBirth` | `str` | Date of birth |
| `firstName` | `str` | First name |
| `group` | `str` | Group identifier |
| `homeTeam` | `dict` |  |
| `id` | `int` | Unique identifier for the person |
| `lastName` | `str` | Last name |
| `lastUpdated` | `str` | Last update timestamp |
| `matchday` | `int` | Matchday number |
| `name` | `str` | Full name of the person |
| `nationality` | `str` | Nationality |
| `position` | `str` | Playing position |
| `score` | `dict` |  |
| `season` | `dict` |  |
| `section` | `str` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `int` | Shirt number |
| `stage` | `str` | Match stage |
| `status` | `str` | Match status |
| `utcDate` | `str` | Match date and time in UTC |

#### Example: Load

```python
person = client.Person().load({"id": 1})
```

#### Example: List

```python
persons = client.Person().list({"id": 1})
```


### Team

Create an instance: `team = client.Team()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` | Team address |
| `area` | `dict` |  |
| `awayTeam` | `dict` |  |
| `clubColors` | `str` | Team colors |
| `coach` | `dict` |  |
| `competition` | `dict` |  |
| `crest` | `str` | URL to the team's crest image |
| `founded` | `int` | Year the team was founded |
| `group` | `str` | Group identifier |
| `homeTeam` | `dict` |  |
| `id` | `int` | Unique identifier for the team |
| `lastUpdated` | `str` | Last update timestamp |
| `matchday` | `int` | Matchday number |
| `name` | `str` | Name of the team |
| `runningCompetitions` | `list` | Competitions the team is currently participating in |
| `score` | `dict` |  |
| `season` | `dict` |  |
| `shortName` | `str` | Short name of the team |
| `squad` | `list` | Team squad members |
| `staff` | `list` | Team staff members |
| `stage` | `str` | Match stage |
| `status` | `str` | Match status |
| `tla` | `str` | Three-letter abbreviation |
| `utcDate` | `str` | Match date and time in UTC |
| `venue` | `str` | Home stadium name |
| `website` | `str` | Team website URL |

#### Example: Load

```python
team = client.Team().load({"id": 1})
```

#### Example: List

```python
teams = client.Team().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── footballdata_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`footballdata_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
match = client.Match()
match.list()

# match.data_get() now returns the match data from the last list
# match.match_get() returns the last match criteria
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
