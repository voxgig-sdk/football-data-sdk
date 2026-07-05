# FootballData PHP SDK



The PHP SDK for the FootballData API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Area()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/football-data-sdk/releases](https://github.com/voxgig-sdk/football-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'footballdata_sdk.php';

$client = new FootballDataSDK([
    "apikey" => getenv("FOOTBALL_DATA_APIKEY"),
]);
```

### 2. List area records

```php
try {
    // list() returns an array of Area records — iterate directly.
    $areas = $client->Area()->list();
    foreach ($areas as $item) {
        echo $item["id"] . " " . $item["child_area"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an area

```php
try {
    // load() returns the bare Area record (throws on error).
    $area = $client->Area()->load(["id" => "example_id"]);
    print_r($area);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $areas = $client->Area()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = FootballDataSDK::test([
    "entity" => ["area" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$area = $client->Area()->list();
print_r($area);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new FootballDataSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
FOOTBALL_DATA_TEST_LIVE=TRUE
FOOTBALL_DATA_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### FootballDataSDK

```php
require_once 'footballdata_sdk.php';
$client = new FootballDataSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = FootballDataSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### FootballDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Area` | `($data): AreaEntity` | Create an Area entity instance. |
| `Competition` | `($data): CompetitionEntity` | Create a Competition entity instance. |
| `Match` | `($data): MatchEntity` | Create a Match entity instance. |
| `Person` | `($data): PersonEntity` | Create a Person entity instance. |
| `Team` | `($data): TeamEntity` | Create a Team entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$area = $client->Area();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_area` | `array` |  |
| `country_code` | `string` |  |
| `flag` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `parent_area` | `string` |  |
| `parent_area_id` | `int` |  |

#### Example: Load

```php
// load() returns the bare Area record (throws on error).
$area = $client->Area()->load(["id" => "area_id"]);
```

#### Example: List

```php
// list() returns an array of Area records (throws on error).
$areas = $client->Area()->list();
```


### Competition

Create an instance: `$competition = $client->Competition();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `area` | `array` |  |
| `assist` | `int` |  |
| `away_team` | `array` |  |
| `club_color` | `string` |  |
| `code` | `string` |  |
| `competition` | `array` |  |
| `crest` | `string` |  |
| `current_season` | `array` |  |
| `emblem` | `string` |  |
| `founded` | `int` |  |
| `goal` | `int` |  |
| `group` | `string` |  |
| `home_team` | `array` |  |
| `id` | `int` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `name` | `string` |  |
| `number_of_available_season` | `int` |  |
| `penalty` | `int` |  |
| `player` | `array` |  |
| `score` | `array` |  |
| `season` | `array` |  |
| `short_name` | `string` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `table` | `array` |  |
| `team` | `array` |  |
| `tla` | `string` |  |
| `type` | `string` |  |
| `utc_date` | `string` |  |
| `venue` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```php
// load() returns the bare Competition record (throws on error).
$competition = $client->Competition()->load(["id" => "competition_id"]);
```

#### Example: List

```php
// list() returns an array of Competition records (throws on error).
$competitions = $client->Competition()->list();
```


### Match

Create an instance: `$match = $client->Match();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area` | `array` |  |
| `away_team` | `array` |  |
| `booking` | `array` |  |
| `competition` | `array` |  |
| `goal` | `array` |  |
| `group` | `string` |  |
| `home_team` | `array` |  |
| `id` | `int` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `odd` | `array` |  |
| `referee` | `array` |  |
| `score` | `array` |  |
| `season` | `array` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `substitution` | `array` |  |
| `utc_date` | `string` |  |
| `venue` | `string` |  |

#### Example: Load

```php
// load() returns the bare Match record (throws on error).
$match = $client->Match()->load(["id" => "match_id"]);
```

#### Example: List

```php
// list() returns an array of Match records (throws on error).
$matchs = $client->Match()->list();
```


### Person

Create an instance: `$person = $client->Person();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `away_team` | `array` |  |
| `competition` | `array` |  |
| `date_of_birth` | `string` |  |
| `first_name` | `string` |  |
| `group` | `string` |  |
| `home_team` | `array` |  |
| `id` | `int` |  |
| `last_name` | `string` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `name` | `string` |  |
| `nationality` | `string` |  |
| `position` | `string` |  |
| `score` | `array` |  |
| `season` | `array` |  |
| `section` | `string` |  |
| `shirt_number` | `int` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `utc_date` | `string` |  |

#### Example: Load

```php
// load() returns the bare Person record (throws on error).
$person = $client->Person()->load(["id" => "person_id"]);
```

#### Example: List

```php
// list() returns an array of Person records (throws on error).
$persons = $client->Person()->list();
```


### Team

Create an instance: `$team = $client->Team();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `area` | `array` |  |
| `away_team` | `array` |  |
| `club_color` | `string` |  |
| `coach` | `array` |  |
| `competition` | `array` |  |
| `crest` | `string` |  |
| `founded` | `int` |  |
| `group` | `string` |  |
| `home_team` | `array` |  |
| `id` | `int` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `name` | `string` |  |
| `running_competition` | `array` |  |
| `score` | `array` |  |
| `season` | `array` |  |
| `short_name` | `string` |  |
| `squad` | `array` |  |
| `staff` | `array` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `tla` | `string` |  |
| `utc_date` | `string` |  |
| `venue` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```php
// load() returns the bare Team record (throws on error).
$team = $client->Team()->load(["id" => "team_id"]);
```

#### Example: List

```php
// list() returns an array of Team records (throws on error).
$teams = $client->Team()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── footballdata_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`footballdata_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$area = $client->Area();
$area->list();

// $area->data_get() now returns the area data from the last list
// $area->match_get() returns the last match criteria
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
