# FootballData Golang SDK

The Golang SDK for the FootballData API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/football-data-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/football-data-sdk/go=../path/to/github.com/voxgig-sdk/football-data-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/football-data-sdk/go"
    "github.com/voxgig-sdk/football-data-sdk/go/core"
)

func main() {
    client := sdk.NewFootballDataSDK(map[string]any{
        "apikey": os.Getenv("FOOTBALL-DATA_APIKEY"),
    })
```

### 2. List areas

```go
    result, err := client.Area(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a area

```go
    result, err = client.Area(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewFootballDataSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FOOTBALL-DATA_TEST_LIVE=TRUE
FOOTBALL-DATA_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewFootballDataSDK

```go
func NewFootballDataSDK(options map[string]any) *FootballDataSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *FootballDataSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FootballDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Area` | `(data map[string]any) FootballDataEntity` | Create a Area entity instance. |
| `Competition` | `(data map[string]any) FootballDataEntity` | Create a Competition entity instance. |
| `Match` | `(data map[string]any) FootballDataEntity` | Create a Match entity instance. |
| `Person` | `(data map[string]any) FootballDataEntity` | Create a Person entity instance. |
| `Team` | `(data map[string]any) FootballDataEntity` | Create a Team entity instance. |

### Entity interface (FootballDataEntity)

All entities implement the `FootballDataEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Area

| Field | Description |
| --- | --- |
| `"child_area"` |  |
| `"country_code"` |  |
| `"flag"` |  |
| `"id"` |  |
| `"name"` |  |
| `"parent_area"` |  |
| `"parent_area_id"` |  |

Operations: List, Load.

API path: `/areas`

#### Competition

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"area"` |  |
| `"assist"` |  |
| `"away_team"` |  |
| `"club_color"` |  |
| `"code"` |  |
| `"competition"` |  |
| `"crest"` |  |
| `"current_season"` |  |
| `"emblem"` |  |
| `"founded"` |  |
| `"goal"` |  |
| `"group"` |  |
| `"home_team"` |  |
| `"id"` |  |
| `"last_updated"` |  |
| `"matchday"` |  |
| `"name"` |  |
| `"number_of_available_season"` |  |
| `"penalty"` |  |
| `"player"` |  |
| `"score"` |  |
| `"season"` |  |
| `"short_name"` |  |
| `"stage"` |  |
| `"status"` |  |
| `"table"` |  |
| `"team"` |  |
| `"tla"` |  |
| `"type"` |  |
| `"utc_date"` |  |
| `"venue"` |  |
| `"website"` |  |

Operations: List, Load.

API path: `/competitions/{id}/matches`

#### Match

| Field | Description |
| --- | --- |
| `"area"` |  |
| `"away_team"` |  |
| `"booking"` |  |
| `"competition"` |  |
| `"goal"` |  |
| `"group"` |  |
| `"home_team"` |  |
| `"id"` |  |
| `"last_updated"` |  |
| `"matchday"` |  |
| `"odd"` |  |
| `"referee"` |  |
| `"score"` |  |
| `"season"` |  |
| `"stage"` |  |
| `"status"` |  |
| `"substitution"` |  |
| `"utc_date"` |  |
| `"venue"` |  |

Operations: List, Load.

API path: `/matches`

#### Person

| Field | Description |
| --- | --- |
| `"away_team"` |  |
| `"competition"` |  |
| `"date_of_birth"` |  |
| `"first_name"` |  |
| `"group"` |  |
| `"home_team"` |  |
| `"id"` |  |
| `"last_name"` |  |
| `"last_updated"` |  |
| `"matchday"` |  |
| `"name"` |  |
| `"nationality"` |  |
| `"position"` |  |
| `"score"` |  |
| `"season"` |  |
| `"section"` |  |
| `"shirt_number"` |  |
| `"stage"` |  |
| `"status"` |  |
| `"utc_date"` |  |

Operations: List, Load.

API path: `/persons/{id}/matches`

#### Team

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"area"` |  |
| `"away_team"` |  |
| `"club_color"` |  |
| `"coach"` |  |
| `"competition"` |  |
| `"crest"` |  |
| `"founded"` |  |
| `"group"` |  |
| `"home_team"` |  |
| `"id"` |  |
| `"last_updated"` |  |
| `"matchday"` |  |
| `"name"` |  |
| `"running_competition"` |  |
| `"score"` |  |
| `"season"` |  |
| `"short_name"` |  |
| `"squad"` |  |
| `"staff"` |  |
| `"stage"` |  |
| `"status"` |  |
| `"tla"` |  |
| `"utc_date"` |  |
| `"venue"` |  |
| `"website"` |  |

Operations: List, Load.

API path: `/teams/{id}/matches`



## Entities


### Area

Create an instance: `area := client.Area(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Area(nil).Load(map[string]any{"id": "area_id"}, nil)
```

#### Example: List

```go
results, err := client.Area(nil).List(nil, nil)
```


### Competition

Create an instance: `competition := client.Competition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Competition(nil).Load(map[string]any{"id": "competition_id"}, nil)
```

#### Example: List

```go
results, err := client.Competition(nil).List(nil, nil)
```


### Match

Create an instance: `match := client.Match(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Match(nil).Load(map[string]any{"id": "match_id"}, nil)
```

#### Example: List

```go
results, err := client.Match(nil).List(nil, nil)
```


### Person

Create an instance: `person := client.Person(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Person(nil).Load(map[string]any{"id": "person_id"}, nil)
```

#### Example: List

```go
results, err := client.Person(nil).List(nil, nil)
```


### Team

Create an instance: `team := client.Team(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Team(nil).Load(map[string]any{"id": "team_id"}, nil)
```

#### Example: List

```go
results, err := client.Team(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/football-data-sdk/go/
├── football-data.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/football-data-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
