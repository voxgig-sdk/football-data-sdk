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
| `childAreas` | `array` | No |  |
| `countryCode` | `string` | No |  |
| `flag` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `parentArea` | `string` | No |  |
| `parentAreaId` | `int` | No |  |

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
| `address` | `string` | No |  |
| `area` | `array` | No |  |
| `assists` | `int` | No |  |
| `awayTeam` | `array` | No |  |
| `clubColors` | `string` | No |  |
| `code` | `string` | No |  |
| `competition` | `array` | No |  |
| `crest` | `string` | No |  |
| `currentSeason` | `array` | No |  |
| `emblem` | `string` | No |  |
| `founded` | `int` | No |  |
| `goals` | `int` | No |  |
| `group` | `string` | No |  |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `numberOfAvailableSeasons` | `int` | No |  |
| `penalties` | `int` | No |  |
| `player` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `shortName` | `string` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `table` | `array` | No |  |
| `team` | `array` | No |  |
| `tla` | `string` | No |  |
| `type` | `string` | No |  |
| `utcDate` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

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
| `group` | `string` | No |  |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `odds` | `array` | No |  |
| `referees` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `substitutions` | `array` | No |  |
| `utcDate` | `string` | No |  |
| `venue` | `string` | No |  |

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
| `dateOfBirth` | `string` | No |  |
| `firstName` | `string` | No |  |
| `group` | `string` | No |  |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No |  |
| `lastName` | `string` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `position` | `string` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `section` | `string` | No |  |
| `shirtNumber` | `int` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `utcDate` | `string` | No |  |

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
| `address` | `string` | No |  |
| `area` | `array` | No |  |
| `awayTeam` | `array` | No |  |
| `clubColors` | `string` | No |  |
| `coach` | `array` | No |  |
| `competition` | `array` | No |  |
| `crest` | `string` | No |  |
| `founded` | `int` | No |  |
| `group` | `string` | No |  |
| `homeTeam` | `array` | No |  |
| `id` | `int` | No |  |
| `lastUpdated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `runningCompetitions` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `shortName` | `string` | No |  |
| `squad` | `array` | No |  |
| `staff` | `array` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `tla` | `string` | No |  |
| `utcDate` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

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

