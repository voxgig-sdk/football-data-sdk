# FootballData PHP SDK



The PHP SDK for the FootballData API — an entity-oriented client using PHP conventions.

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

### 2. List areas

```php
try {
    $result = $client->area()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an area

```php
try {
    $result = $client->area()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
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
    echo "Error: " . $result["err"]->getMessage();
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

Create a mock client for unit testing — no server required:

```php
$client = FootballDataSDK::test();

$result = $client->area()->load(["id" => "test01"]);
// $result contains mock response data
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
| `Area` | `($data): AreaEntity` | Create a Area entity instance. |
| `Competition` | `($data): CompetitionEntity` | Create a Competition entity instance. |
| `Match` | `($data): MatchEntity` | Create a Match entity instance. |
| `Person` | `($data): PersonEntity` | Create a Person entity instance. |
| `Team` | `($data): TeamEntity` | Create a Team entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
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
error is returned to the caller as the second element in the return array.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$area = $client->area();
$area->load(["id" => "example_id"]);

// $area->dataGet() now returns the loaded area data
// $area->matchGet() returns the last match criteria
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
