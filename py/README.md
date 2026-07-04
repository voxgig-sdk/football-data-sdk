# FootballData Python SDK



The Python SDK for the FootballData API — an entity-oriented client following Pythonic conventions.

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

### 2. List areas

```python
try:
    result = client.area.list()
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an area

```python
try:
    result = client.area.load({"id": "example_id"})
    print(result)
except Exception as err:
    print(f"load failed: {err}")
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
    print(result["err"])     # error value
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

result = client.area.load({"id": "test01"})
# result contains mock response data
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
| `Area` | `(data) -> AreaEntity` | Create a Area entity instance. |
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
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `const area = client.area`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_area` | ``$ARRAY`` |  |
| `country_code` | ``$STRING`` |  |
| `flag` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `parent_area` | ``$STRING`` |  |
| `parent_area_id` | ``$INTEGER`` |  |

#### Example: Load

```ts
const area = await client.area.load({ id: 'area_id' })
```

#### Example: List

```ts
const areas = await client.area.list()
```


### Competition

Create an instance: `const competition = client.competition`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `area` | ``$OBJECT`` |  |
| `assist` | ``$INTEGER`` |  |
| `away_team` | ``$OBJECT`` |  |
| `club_color` | ``$STRING`` |  |
| `code` | ``$STRING`` |  |
| `competition` | ``$OBJECT`` |  |
| `crest` | ``$STRING`` |  |
| `current_season` | ``$OBJECT`` |  |
| `emblem` | ``$STRING`` |  |
| `founded` | ``$INTEGER`` |  |
| `goal` | ``$INTEGER`` |  |
| `group` | ``$STRING`` |  |
| `home_team` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `last_updated` | ``$STRING`` |  |
| `matchday` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `number_of_available_season` | ``$INTEGER`` |  |
| `penalty` | ``$INTEGER`` |  |
| `player` | ``$OBJECT`` |  |
| `score` | ``$OBJECT`` |  |
| `season` | ``$OBJECT`` |  |
| `short_name` | ``$STRING`` |  |
| `stage` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `table` | ``$ARRAY`` |  |
| `team` | ``$OBJECT`` |  |
| `tla` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `utc_date` | ``$STRING`` |  |
| `venue` | ``$STRING`` |  |
| `website` | ``$STRING`` |  |

#### Example: Load

```ts
const competition = await client.competition.load({ id: 'competition_id' })
```

#### Example: List

```ts
const competitions = await client.competition.list()
```


### Match

Create an instance: `const match = client.match`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area` | ``$OBJECT`` |  |
| `away_team` | ``$OBJECT`` |  |
| `booking` | ``$ARRAY`` |  |
| `competition` | ``$OBJECT`` |  |
| `goal` | ``$ARRAY`` |  |
| `group` | ``$STRING`` |  |
| `home_team` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `last_updated` | ``$STRING`` |  |
| `matchday` | ``$INTEGER`` |  |
| `odd` | ``$OBJECT`` |  |
| `referee` | ``$ARRAY`` |  |
| `score` | ``$OBJECT`` |  |
| `season` | ``$OBJECT`` |  |
| `stage` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `substitution` | ``$ARRAY`` |  |
| `utc_date` | ``$STRING`` |  |
| `venue` | ``$STRING`` |  |

#### Example: Load

```ts
const match = await client.match.load({ id: 'match_id' })
```

#### Example: List

```ts
const matchs = await client.match.list()
```


### Person

Create an instance: `const person = client.person`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `away_team` | ``$OBJECT`` |  |
| `competition` | ``$OBJECT`` |  |
| `date_of_birth` | ``$STRING`` |  |
| `first_name` | ``$STRING`` |  |
| `group` | ``$STRING`` |  |
| `home_team` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `last_name` | ``$STRING`` |  |
| `last_updated` | ``$STRING`` |  |
| `matchday` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `nationality` | ``$STRING`` |  |
| `position` | ``$STRING`` |  |
| `score` | ``$OBJECT`` |  |
| `season` | ``$OBJECT`` |  |
| `section` | ``$STRING`` |  |
| `shirt_number` | ``$INTEGER`` |  |
| `stage` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `utc_date` | ``$STRING`` |  |

#### Example: Load

```ts
const person = await client.person.load({ id: 'person_id' })
```

#### Example: List

```ts
const persons = await client.person.list()
```


### Team

Create an instance: `const team = client.team`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `area` | ``$OBJECT`` |  |
| `away_team` | ``$OBJECT`` |  |
| `club_color` | ``$STRING`` |  |
| `coach` | ``$OBJECT`` |  |
| `competition` | ``$OBJECT`` |  |
| `crest` | ``$STRING`` |  |
| `founded` | ``$INTEGER`` |  |
| `group` | ``$STRING`` |  |
| `home_team` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `last_updated` | ``$STRING`` |  |
| `matchday` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `running_competition` | ``$ARRAY`` |  |
| `score` | ``$OBJECT`` |  |
| `season` | ``$OBJECT`` |  |
| `short_name` | ``$STRING`` |  |
| `squad` | ``$ARRAY`` |  |
| `staff` | ``$ARRAY`` |  |
| `stage` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `tla` | ``$STRING`` |  |
| `utc_date` | ``$STRING`` |  |
| `venue` | ``$STRING`` |  |
| `website` | ``$STRING`` |  |

#### Example: Load

```ts
const team = await client.team.load({ id: 'team_id' })
```

#### Example: List

```ts
const teams = await client.team.list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
area = client.area
area.load({"id": "example_id"})

# area.data_get() now returns the loaded area data
# area.match_get() returns the last match criteria
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
