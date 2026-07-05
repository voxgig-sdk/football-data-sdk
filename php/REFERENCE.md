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
| `child_area` | `array` | No |  |
| `country_code` | `string` | No |  |
| `flag` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `parent_area` | `string` | No |  |
| `parent_area_id` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Area()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Area()->load(["id" => "area_id"]);
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
| `assist` | `int` | No |  |
| `away_team` | `array` | No |  |
| `club_color` | `string` | No |  |
| `code` | `string` | No |  |
| `competition` | `array` | No |  |
| `crest` | `string` | No |  |
| `current_season` | `array` | No |  |
| `emblem` | `string` | No |  |
| `founded` | `int` | No |  |
| `goal` | `int` | No |  |
| `group` | `string` | No |  |
| `home_team` | `array` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `number_of_available_season` | `int` | No |  |
| `penalty` | `int` | No |  |
| `player` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `short_name` | `string` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `table` | `array` | No |  |
| `team` | `array` | No |  |
| `tla` | `string` | No |  |
| `type` | `string` | No |  |
| `utc_date` | `string` | No |  |
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
| `away_team` | `array` | No |  |
| `booking` | `array` | No |  |
| `competition` | `array` | No |  |
| `goal` | `array` | No |  |
| `group` | `string` | No |  |
| `home_team` | `array` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `odd` | `array` | No |  |
| `referee` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `substitution` | `array` | No |  |
| `utc_date` | `string` | No |  |
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
$result = $client->Match()->load(["id" => "match_id"]);
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
| `away_team` | `array` | No |  |
| `competition` | `array` | No |  |
| `date_of_birth` | `string` | No |  |
| `first_name` | `string` | No |  |
| `group` | `string` | No |  |
| `home_team` | `array` | No |  |
| `id` | `int` | No |  |
| `last_name` | `string` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `position` | `string` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `section` | `string` | No |  |
| `shirt_number` | `int` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `utc_date` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Person()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Person()->load(["id" => "person_id"]);
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
| `away_team` | `array` | No |  |
| `club_color` | `string` | No |  |
| `coach` | `array` | No |  |
| `competition` | `array` | No |  |
| `crest` | `string` | No |  |
| `founded` | `int` | No |  |
| `group` | `string` | No |  |
| `home_team` | `array` | No |  |
| `id` | `int` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `int` | No |  |
| `name` | `string` | No |  |
| `running_competition` | `array` | No |  |
| `score` | `array` | No |  |
| `season` | `array` | No |  |
| `short_name` | `string` | No |  |
| `squad` | `array` | No |  |
| `staff` | `array` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `tla` | `string` | No |  |
| `utc_date` | `string` | No |  |
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
$result = $client->Team()->load(["id" => "team_id"]);
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

