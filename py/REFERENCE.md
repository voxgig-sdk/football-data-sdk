# FootballData Python SDK Reference

Complete API reference for the FootballData Python SDK.


## FootballDataSDK

### Constructor

```python
from footballdata_sdk import FootballDataSDK

client = FootballDataSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FootballDataSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FootballDataSDK.test()
```


### Instance Methods

#### `Area(data=None)`

Create a new `AreaEntity` instance. Pass `None` for no initial data.

#### `Competition(data=None)`

Create a new `CompetitionEntity` instance. Pass `None` for no initial data.

#### `Match(data=None)`

Create a new `MatchEntity` instance. Pass `None` for no initial data.

#### `Person(data=None)`

Create a new `PersonEntity` instance. Pass `None` for no initial data.

#### `Team(data=None)`

Create a new `TeamEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AreaEntity

```python
area = client.Area()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_area` | `list` | No |  |
| `country_code` | `str` | No |  |
| `flag` | `str` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `parent_area` | `str` | No |  |
| `parent_area_id` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Area().list()
for area in results:
    print(area)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Area().load({"id": "area_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AreaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CompetitionEntity

```python
competition = client.Competition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No |  |
| `area` | `dict` | No |  |
| `assist` | `int` | No |  |
| `away_team` | `dict` | No |  |
| `club_color` | `str` | No |  |
| `code` | `str` | No |  |
| `competition` | `dict` | No |  |
| `crest` | `str` | No |  |
| `current_season` | `dict` | No |  |
| `emblem` | `str` | No |  |
| `founded` | `int` | No |  |
| `goal` | `int` | No |  |
| `group` | `str` | No |  |
| `home_team` | `dict` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `str` | No |  |
| `matchday` | `int` | No |  |
| `name` | `str` | No |  |
| `number_of_available_season` | `int` | No |  |
| `penalty` | `int` | No |  |
| `player` | `dict` | No |  |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `short_name` | `str` | No |  |
| `stage` | `str` | No |  |
| `status` | `str` | No |  |
| `table` | `list` | No |  |
| `team` | `dict` | No |  |
| `tla` | `str` | No |  |
| `type` | `str` | No |  |
| `utc_date` | `str` | No |  |
| `venue` | `str` | No |  |
| `website` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Competition().list()
for competition in results:
    print(competition)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Competition().load({"id": "competition_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompetitionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MatchEntity

```python
match = client.Match()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area` | `dict` | No |  |
| `away_team` | `dict` | No |  |
| `booking` | `list` | No |  |
| `competition` | `dict` | No |  |
| `goal` | `list` | No |  |
| `group` | `str` | No |  |
| `home_team` | `dict` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `str` | No |  |
| `matchday` | `int` | No |  |
| `odd` | `dict` | No |  |
| `referee` | `list` | No |  |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `stage` | `str` | No |  |
| `status` | `str` | No |  |
| `substitution` | `list` | No |  |
| `utc_date` | `str` | No |  |
| `venue` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Match().list()
for match in results:
    print(match)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Match().load({"id": "match_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MatchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PersonEntity

```python
person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `away_team` | `dict` | No |  |
| `competition` | `dict` | No |  |
| `date_of_birth` | `str` | No |  |
| `first_name` | `str` | No |  |
| `group` | `str` | No |  |
| `home_team` | `dict` | No |  |
| `id` | `int` | No |  |
| `last_name` | `str` | No |  |
| `last_updated` | `str` | No |  |
| `matchday` | `int` | No |  |
| `name` | `str` | No |  |
| `nationality` | `str` | No |  |
| `position` | `str` | No |  |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `section` | `str` | No |  |
| `shirt_number` | `int` | No |  |
| `stage` | `str` | No |  |
| `status` | `str` | No |  |
| `utc_date` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Person().list()
for person in results:
    print(person)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Person().load({"id": "person_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TeamEntity

```python
team = client.Team()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No |  |
| `area` | `dict` | No |  |
| `away_team` | `dict` | No |  |
| `club_color` | `str` | No |  |
| `coach` | `dict` | No |  |
| `competition` | `dict` | No |  |
| `crest` | `str` | No |  |
| `founded` | `int` | No |  |
| `group` | `str` | No |  |
| `home_team` | `dict` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `str` | No |  |
| `matchday` | `int` | No |  |
| `name` | `str` | No |  |
| `running_competition` | `list` | No |  |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `short_name` | `str` | No |  |
| `squad` | `list` | No |  |
| `staff` | `list` | No |  |
| `stage` | `str` | No |  |
| `status` | `str` | No |  |
| `tla` | `str` | No |  |
| `utc_date` | `str` | No |  |
| `venue` | `str` | No |  |
| `website` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Team().list()
for team in results:
    print(team)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Team().load({"id": "team_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TeamEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FootballDataSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

