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
| `childAreas` | `list` | No | List of child areas |
| `countryCode` | `str` | No | ISO country code |
| `flag` | `str` | No | URL to the area's flag image |
| `id` | `int` | No | Unique identifier for the area |
| `name` | `str` | No | Name of the area |
| `parentArea` | `str` | No | Name of the parent area |
| `parentAreaId` | `int` | No | ID of the parent area |

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
result = client.Area().load({"id": 1})
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
| `address` | `str` | No | Team address |
| `area` | `dict` | No |  |
| `assists` | `int` | No | Number of assists |
| `awayTeam` | `dict` | No |  |
| `clubColors` | `str` | No | Team colors |
| `code` | `str` | No | Short code for the competition |
| `competition` | `dict` | No |  |
| `crest` | `str` | No | URL to the team's crest image |
| `currentSeason` | `dict` | No |  |
| `emblem` | `str` | No | URL to the competition's emblem |
| `founded` | `int` | No | Year the team was founded |
| `goals` | `int` | No | Number of goals scored |
| `group` | `str` | No | Group identifier |
| `homeTeam` | `dict` | No |  |
| `id` | `int` | No | Unique identifier for the competition |
| `lastUpdated` | `str` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `str` | No | Name of the competition |
| `numberOfAvailableSeasons` | `int` | No | Number of seasons available |
| `penalties` | `int` | No | Number of penalty goals |
| `player` | `dict` | No |  |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `shortName` | `str` | No | Short name of the team |
| `stage` | `str` | No | Match stage |
| `status` | `str` | No | Match status |
| `table` | `list` | No |  |
| `team` | `dict` | No |  |
| `tla` | `str` | No | Three-letter abbreviation |
| `type` | `str` | No | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `str` | No | Match date and time in UTC |
| `venue` | `str` | No | Home stadium name |
| `website` | `str` | No | Team website URL |

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
| `awayTeam` | `dict` | No |  |
| `bookings` | `list` | No |  |
| `competition` | `dict` | No |  |
| `goals` | `list` | No |  |
| `group` | `str` | No | Group identifier |
| `homeTeam` | `dict` | No |  |
| `id` | `int` | No | Unique identifier for the match |
| `lastUpdated` | `str` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `odds` | `dict` | No | Match odds |
| `referees` | `list` | No |  |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `stage` | `str` | No | Match stage |
| `status` | `str` | No | Match status |
| `substitutions` | `list` | No |  |
| `utcDate` | `str` | No | Match date and time in UTC |
| `venue` | `str` | No | Stadium name |

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
result = client.Match().load({"id": 1})
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
| `awayTeam` | `dict` | No |  |
| `competition` | `dict` | No |  |
| `dateOfBirth` | `str` | No | Date of birth |
| `firstName` | `str` | No | First name |
| `group` | `str` | No | Group identifier |
| `homeTeam` | `dict` | No |  |
| `id` | `int` | No | Unique identifier for the person |
| `lastName` | `str` | No | Last name |
| `lastUpdated` | `str` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `str` | No | Full name of the person |
| `nationality` | `str` | No | Nationality |
| `position` | `str` | No | Playing position |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `section` | `str` | No | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `int` | No | Shirt number |
| `stage` | `str` | No | Match stage |
| `status` | `str` | No | Match status |
| `utcDate` | `str` | No | Match date and time in UTC |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Person().list({"id": 1})
for person in results:
    print(person)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Person().load({"id": 1})
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
| `address` | `str` | No | Team address |
| `area` | `dict` | No |  |
| `awayTeam` | `dict` | No |  |
| `clubColors` | `str` | No | Team colors |
| `coach` | `dict` | No |  |
| `competition` | `dict` | No |  |
| `crest` | `str` | No | URL to the team's crest image |
| `founded` | `int` | No | Year the team was founded |
| `group` | `str` | No | Group identifier |
| `homeTeam` | `dict` | No |  |
| `id` | `int` | No | Unique identifier for the team |
| `lastUpdated` | `str` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `str` | No | Name of the team |
| `runningCompetitions` | `list` | No | Competitions the team is currently participating in |
| `score` | `dict` | No |  |
| `season` | `dict` | No |  |
| `shortName` | `str` | No | Short name of the team |
| `squad` | `list` | No | Team squad members |
| `staff` | `list` | No | Team staff members |
| `stage` | `str` | No | Match stage |
| `status` | `str` | No | Match status |
| `tla` | `str` | No | Three-letter abbreviation |
| `utcDate` | `str` | No | Match date and time in UTC |
| `venue` | `str` | No | Home stadium name |
| `website` | `str` | No | Team website URL |

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
result = client.Team().load({"id": 1})
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

