# FootballData Golang SDK



The Golang SDK for the FootballData API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Area(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
persons, err := client.Person(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = persons
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

person, err := client.Person(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(person) // the returned mock data
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
| `"childAreas"` | List of child areas |
| `"countryCode"` | ISO country code |
| `"flag"` | URL to the area's flag image |
| `"id"` | Unique identifier for the area |
| `"name"` | Name of the area |
| `"parentArea"` | Name of the parent area |
| `"parentAreaId"` | ID of the parent area |

Operations: List, Load.

API path: `/areas`

#### Competition

| Field | Description |
| --- | --- |
| `"area"` |  |
| `"code"` | Short code for the competition |
| `"currentSeason"` |  |
| `"emblem"` | URL to the competition's emblem |
| `"id"` | Unique identifier for the competition |
| `"lastUpdated"` | Last update timestamp |
| `"name"` | Name of the competition |
| `"numberOfAvailableSeasons"` | Number of seasons available |
| `"type"` | Type of competition (LEAGUE, CUP, etc.) |

Operations: List, Load.

API path: `/competitions/{id}/matches`

#### Match

| Field | Description |
| --- | --- |
| `"area"` |  |
| `"awayTeam"` |  |
| `"bookings"` |  |
| `"competition"` |  |
| `"goals"` |  |
| `"group"` | Group identifier |
| `"homeTeam"` |  |
| `"id"` | Unique identifier for the match |
| `"lastUpdated"` | Last update timestamp |
| `"matchday"` | Matchday number |
| `"odds"` | Match odds |
| `"referees"` |  |
| `"score"` |  |
| `"season"` |  |
| `"stage"` | Match stage |
| `"status"` | Match status |
| `"substitutions"` |  |
| `"utcDate"` | Match date and time in UTC |
| `"venue"` | Stadium name |

Operations: List, Load.

API path: `/matches`

#### Person

| Field | Description |
| --- | --- |
| `"dateOfBirth"` | Date of birth |
| `"firstName"` | First name |
| `"id"` | Unique identifier for the person |
| `"lastName"` | Last name |
| `"lastUpdated"` | Last update timestamp |
| `"name"` | Full name of the person |
| `"nationality"` | Nationality |
| `"position"` | Playing position |
| `"section"` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `"shirtNumber"` | Shirt number |

Operations: List, Load.

API path: `/persons/{id}/matches`

#### Team

| Field | Description |
| --- | --- |
| `"address"` | Team address |
| `"area"` |  |
| `"clubColors"` | Team colors |
| `"coach"` |  |
| `"crest"` | URL to the team's crest image |
| `"founded"` | Year the team was founded |
| `"id"` | Unique identifier for the team |
| `"lastUpdated"` | Last update timestamp |
| `"name"` | Name of the team |
| `"runningCompetitions"` | Competitions the team is currently participating in |
| `"shortName"` | Short name of the team |
| `"squad"` | Team squad members |
| `"staff"` | Team staff members |
| `"tla"` | Three-letter abbreviation |
| `"venue"` | Home stadium name |
| `"website"` | Team website URL |

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
| `childAreas` | `[]any` | List of child areas |
| `countryCode` | `string` | ISO country code |
| `flag` | `string` | URL to the area's flag image |
| `id` | `int` | Unique identifier for the area |
| `name` | `string` | Name of the area |
| `parentArea` | `string` | Name of the parent area |
| `parentAreaId` | `int` | ID of the parent area |

#### Example: Load

```go
area, err := client.Area(nil).Load(map[string]any{"id": 1}, nil)
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
| `area` | `map[string]any` |  |
| `code` | `string` | Short code for the competition |
| `currentSeason` | `map[string]any` |  |
| `emblem` | `string` | URL to the competition's emblem |
| `id` | `int` | Unique identifier for the competition |
| `lastUpdated` | `string` | Last update timestamp |
| `name` | `string` | Name of the competition |
| `numberOfAvailableSeasons` | `int` | Number of seasons available |
| `type` | `string` | Type of competition (LEAGUE, CUP, etc.) |

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
| `awayTeam` | `map[string]any` |  |
| `bookings` | `[]any` |  |
| `competition` | `map[string]any` |  |
| `goals` | `[]any` |  |
| `group` | `string` | Group identifier |
| `homeTeam` | `map[string]any` |  |
| `id` | `int` | Unique identifier for the match |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `int` | Matchday number |
| `odds` | `map[string]any` | Match odds |
| `referees` | `[]any` |  |
| `score` | `map[string]any` |  |
| `season` | `map[string]any` |  |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `substitutions` | `[]any` |  |
| `utcDate` | `string` | Match date and time in UTC |
| `venue` | `string` | Stadium name |

#### Example: Load

```go
match, err := client.Match(nil).Load(map[string]any{"id": 1}, nil)
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
| `dateOfBirth` | `string` | Date of birth |
| `firstName` | `string` | First name |
| `id` | `int` | Unique identifier for the person |
| `lastName` | `string` | Last name |
| `lastUpdated` | `string` | Last update timestamp |
| `name` | `string` | Full name of the person |
| `nationality` | `string` | Nationality |
| `position` | `string` | Playing position |
| `section` | `string` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `int` | Shirt number |

#### Example: Load

```go
person, err := client.Person(nil).Load(map[string]any{"id": 1}, nil)
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
| `address` | `string` | Team address |
| `area` | `map[string]any` |  |
| `clubColors` | `string` | Team colors |
| `coach` | `map[string]any` |  |
| `crest` | `string` | URL to the team's crest image |
| `founded` | `int` | Year the team was founded |
| `id` | `int` | Unique identifier for the team |
| `lastUpdated` | `string` | Last update timestamp |
| `name` | `string` | Name of the team |
| `runningCompetitions` | `[]any` | Competitions the team is currently participating in |
| `shortName` | `string` | Short name of the team |
| `squad` | `[]any` | Team squad members |
| `staff` | `[]any` | Team staff members |
| `tla` | `string` | Three-letter abbreviation |
| `venue` | `string` | Home stadium name |
| `website` | `string` | Team website URL |

#### Example: Load

```go
team, err := client.Team(nil).Load(map[string]any{"id": 1}, nil)
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

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
person := client.Person(nil)
person.List(nil, nil)

// person.Data() now returns the person data from the last list
// person.Match() returns the last match criteria
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
