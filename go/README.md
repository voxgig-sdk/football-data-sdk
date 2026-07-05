# FootballData Golang SDK



The Golang SDK for the FootballData API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Area(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/football-data-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/football-data-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/football-data-sdk/go=../football-data-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/football-data-sdk/go"
)

func main() {
    client := sdk.NewFootballDataSDK(map[string]any{
        "apikey": os.Getenv("FOOTBALL_DATA_APIKEY"),
    })

    // List area records — the value is the array of records itself.
    areas, err := client.Area(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range areas.([]any) {
        fmt.Println(item)
    }

    // Load a single area — the value is the loaded record.
    area, err := client.Area(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(area)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
areas, err := client.Area(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = areas
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

area, err := client.Area(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(area) // the returned mock data
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
FOOTBALL_DATA_TEST_LIVE=TRUE
FOOTBALL_DATA_APIKEY=<your-key>
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
| `Area` | `(data map[string]any) FootballDataEntity` | Create an Area entity instance. |
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
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    area, err := client.Area(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // area is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `child_area` | `[]any` |  |
| `country_code` | `string` |  |
| `flag` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `parent_area` | `string` |  |
| `parent_area_id` | `int` |  |

#### Example: Load

```go
area, err := client.Area(nil).Load(map[string]any{"id": "area_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(area) // the loaded record
```

#### Example: List

```go
areas, err := client.Area(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(areas) // the array of records
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
| `address` | `string` |  |
| `area` | `map[string]any` |  |
| `assist` | `int` |  |
| `away_team` | `map[string]any` |  |
| `club_color` | `string` |  |
| `code` | `string` |  |
| `competition` | `map[string]any` |  |
| `crest` | `string` |  |
| `current_season` | `map[string]any` |  |
| `emblem` | `string` |  |
| `founded` | `int` |  |
| `goal` | `int` |  |
| `group` | `string` |  |
| `home_team` | `map[string]any` |  |
| `id` | `int` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `name` | `string` |  |
| `number_of_available_season` | `int` |  |
| `penalty` | `int` |  |
| `player` | `map[string]any` |  |
| `score` | `map[string]any` |  |
| `season` | `map[string]any` |  |
| `short_name` | `string` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `table` | `[]any` |  |
| `team` | `map[string]any` |  |
| `tla` | `string` |  |
| `type` | `string` |  |
| `utc_date` | `string` |  |
| `venue` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```go
competition, err := client.Competition(nil).Load(map[string]any{"id": "competition_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(competition) // the loaded record
```

#### Example: List

```go
competitions, err := client.Competition(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(competitions) // the array of records
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
| `area` | `map[string]any` |  |
| `away_team` | `map[string]any` |  |
| `booking` | `[]any` |  |
| `competition` | `map[string]any` |  |
| `goal` | `[]any` |  |
| `group` | `string` |  |
| `home_team` | `map[string]any` |  |
| `id` | `int` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `odd` | `map[string]any` |  |
| `referee` | `[]any` |  |
| `score` | `map[string]any` |  |
| `season` | `map[string]any` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `substitution` | `[]any` |  |
| `utc_date` | `string` |  |
| `venue` | `string` |  |

#### Example: Load

```go
match, err := client.Match(nil).Load(map[string]any{"id": "match_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(match) // the loaded record
```

#### Example: List

```go
matchs, err := client.Match(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(matchs) // the array of records
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
| `away_team` | `map[string]any` |  |
| `competition` | `map[string]any` |  |
| `date_of_birth` | `string` |  |
| `first_name` | `string` |  |
| `group` | `string` |  |
| `home_team` | `map[string]any` |  |
| `id` | `int` |  |
| `last_name` | `string` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `name` | `string` |  |
| `nationality` | `string` |  |
| `position` | `string` |  |
| `score` | `map[string]any` |  |
| `season` | `map[string]any` |  |
| `section` | `string` |  |
| `shirt_number` | `int` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `utc_date` | `string` |  |

#### Example: Load

```go
person, err := client.Person(nil).Load(map[string]any{"id": "person_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(person) // the loaded record
```

#### Example: List

```go
persons, err := client.Person(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(persons) // the array of records
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
| `address` | `string` |  |
| `area` | `map[string]any` |  |
| `away_team` | `map[string]any` |  |
| `club_color` | `string` |  |
| `coach` | `map[string]any` |  |
| `competition` | `map[string]any` |  |
| `crest` | `string` |  |
| `founded` | `int` |  |
| `group` | `string` |  |
| `home_team` | `map[string]any` |  |
| `id` | `int` |  |
| `last_updated` | `string` |  |
| `matchday` | `int` |  |
| `name` | `string` |  |
| `running_competition` | `[]any` |  |
| `score` | `map[string]any` |  |
| `season` | `map[string]any` |  |
| `short_name` | `string` |  |
| `squad` | `[]any` |  |
| `staff` | `[]any` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `tla` | `string` |  |
| `utc_date` | `string` |  |
| `venue` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```go
team, err := client.Team(nil).Load(map[string]any{"id": "team_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(team) // the loaded record
```

#### Example: List

```go
teams, err := client.Team(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(teams) // the array of records
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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
area := client.Area(nil)
area.List(nil, nil)

// area.Data() now returns the area data from the last list
// area.Match() returns the last match criteria
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
