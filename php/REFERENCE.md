# FootballData PHP SDK Reference

Complete API reference for the FootballData PHP SDK.


## FootballDataSDK

### Constructor

```php
require_once __DIR__ . '/footballdata_sdk.php';

$client = new FootballDataSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FootballDataSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = FootballDataSDK::test();
```


### Instance Methods

#### `Area($data = null)`

Create a new `AreaEntity` instance. Pass `null` for no initial data.

#### `Competition($data = null)`

Create a new `CompetitionEntity` instance. Pass `null` for no initial data.

#### `Match($data = null)`

Create a new `MatchEntity` instance. Pass `null` for no initial data.

#### `Person($data = null)`

Create a new `PersonEntity` instance. Pass `null` for no initial data.

#### `Team($data = null)`

Create a new `TeamEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): FootballDataUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AreaEntity

```php
$area = $client->Area();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `childAreas` | `array` | No | List of child areas |
| `countryCode` | `string` | No | ISO country code |
| `flag` | `string` | No | URL to the area's flag image |
| `id` | `int` | No | Unique identifier for the area |
| `name` | `string` | No | Name of the area |
| `parentArea` | `string` | No | Name of the parent area |
| `parentAreaId` | `int` | No | ID of the parent area |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Area()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Area()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AreaEntity`

Create a new `AreaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CompetitionEntity

```php
$competition = $client->Competition();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `array` | No |  |
| `assists` | `int` | No | Number of assists |
| `awayTeam` | `array` | No |  |
| `clubColors` | `string` | No | Team colors |
| `code` | `string` | No | Short code for the competition |
| `competition` | `array` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `currentSeason` | `array` | No |  |
| `emblem` | `string` | No | URL to the competition's emblem |
| `founded` | `int` | No | Year the team was founded |
| `goals` | `int` | No | Number of goals scored |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No | Unique identifier for the competition |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `string` | No | Name of the competition |
| `numberOfAvailableSeasons` | `int` | No | Number of seasons available |
| `penalties` | `int` | No | Number of penalty goals |
| `player` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `table` | `array` | No |  |
| `team` | `array` | No |  |
| `tla` | `string` | No | Three-letter abbreviation |
| `type` | `string` | No | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Competition()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Competition()->load(["id" => "competition_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CompetitionEntity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MatchEntity

```php
$match = $client->Match();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area` | `array` | No |  |
| `awayTeam` | `array` | No |  |
| `bookings` | `array` | No |  |
| `competition` | `array` | No |  |
| `goals` | `array` | No |  |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No | Unique identifier for the match |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `odds` | `array` | No | Match odds |
| `referees` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `substitutions` | `array` | No |  |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Stadium name |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Match()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Match()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MatchEntity`

Create a new `MatchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PersonEntity

```php
$person = $client->Person();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `awayTeam` | `array` | No |  |
| `competition` | `array` | No |  |
| `dateOfBirth` | `string` | No | Date of birth |
| `firstName` | `string` | No | First name |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No | Unique identifier for the person |
| `lastName` | `string` | No | Last name |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `string` | No | Full name of the person |
| `nationality` | `string` | No | Nationality |
| `position` | `string` | No | Playing position |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `section` | `string` | No | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `int` | No | Shirt number |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `utcDate` | `string` | No | Match date and time in UTC |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Person()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Person()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PersonEntity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TeamEntity

```php
$team = $client->Team();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `array` | No |  |
| `awayTeam` | `array` | No |  |
| `clubColors` | `string` | No | Team colors |
| `coach` | `array` | No |  |
| `competition` | `array` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `founded` | `int` | No | Year the team was founded |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No | Unique identifier for the team |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `int` | No | Matchday number |
| `name` | `string` | No | Name of the team |
| `runningCompetitions` | `array` | No | Competitions the team is currently participating in |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `squad` | `array` | No | Team squad members |
| `staff` | `array` | No | Team staff members |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `tla` | `string` | No | Three-letter abbreviation |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Team()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Team()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TeamEntity`

Create a new `TeamEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new FootballDataSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

