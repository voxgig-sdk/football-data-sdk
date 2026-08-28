# FootballData TypeScript SDK



The TypeScript SDK for the FootballData API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Area()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/football-data-sdk/releases](https://github.com/voxgig-sdk/football-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FootballDataSDK } from '@voxgig-sdk/football-data'

const client = new FootballDataSDK({
  apikey: process.env.FOOTBALL_DATA_APIKEY,
})
```

### 2. List area records

`list()` resolves to an array of Area ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const areas = await client.Area().list()

for (const area of areas) {
  console.log(area)
}
```

### 3. Load an area

`load()` returns the entity directly and throws on failure:

```ts
try {
  const area = await client.Area().load({ id: 1 })
  console.log(area)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const matchs = await client.Match().list()
  console.log(matchs)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FootballDataSDK.test()

const match = await client.Match().list()
// match is the entity, populated with mock response data
// — call match.data() for the record itself
console.log(match)
```

You can also use the instance method:

```ts
const client = new FootballDataSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Match()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FootballDataSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### FootballDataSDK

#### Constructor

```ts
new FootballDataSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Area(data?)` | `AreaEntity` | Create an Area entity instance. |
| `Competition(data?)` | `CompetitionEntity` | Create a Competition entity instance. |
| `Match(data?)` | `MatchEntity` | Create a Match entity instance. |
| `Person(data?)` | `PersonEntity` | Create a Person entity instance. |
| `Team(data?)` | `TeamEntity` | Create a Team entity instance. |
| `tester(testopts?, sdkopts?)` | `FootballDataSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FootballDataSDK.test(testopts?, sdkopts?)` | `FootballDataSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FootballDataSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Area

| Field | Description |
| --- | --- |
| `childAreas` | List of child areas |
| `countryCode` | ISO country code |
| `flag` | URL to the area's flag image |
| `id` | Unique identifier for the area |
| `name` | Name of the area |
| `parentArea` | Name of the parent area |
| `parentAreaId` | ID of the parent area |

Operations: list, load.

API path: `/areas`

#### Competition

| Field | Description |
| --- | --- |
| `address` | Team address |
| `area` |  |
| `assists` | Number of assists |
| `awayTeam` |  |
| `clubColors` | Team colors |
| `code` | Short code for the competition |
| `competition` |  |
| `crest` | URL to the team's crest image |
| `currentSeason` |  |
| `emblem` | URL to the competition's emblem |
| `founded` | Year the team was founded |
| `goals` | Number of goals scored |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the competition |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `name` | Name of the competition |
| `numberOfAvailableSeasons` | Number of seasons available |
| `penalties` | Number of penalty goals |
| `player` |  |
| `score` |  |
| `season` |  |
| `shortName` | Short name of the team |
| `stage` | Match stage |
| `status` | Match status |
| `table` |  |
| `team` |  |
| `tla` | Three-letter abbreviation |
| `type` | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | Match date and time in UTC |
| `venue` | Home stadium name |
| `website` | Team website URL |

Operations: list, load.

API path: `/competitions/{id}/matches`

#### Match

| Field | Description |
| --- | --- |
| `area` |  |
| `awayTeam` |  |
| `bookings` |  |
| `competition` |  |
| `goals` |  |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the match |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `odds` | Match odds |
| `referees` |  |
| `score` |  |
| `season` |  |
| `stage` | Match stage |
| `status` | Match status |
| `substitutions` |  |
| `utcDate` | Match date and time in UTC |
| `venue` | Stadium name |

Operations: list, load.

API path: `/matches`

#### Person

| Field | Description |
| --- | --- |
| `awayTeam` |  |
| `competition` |  |
| `dateOfBirth` | Date of birth |
| `firstName` | First name |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the person |
| `lastName` | Last name |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `name` | Full name of the person |
| `nationality` | Nationality |
| `position` | Playing position |
| `score` |  |
| `season` |  |
| `section` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | Shirt number |
| `stage` | Match stage |
| `status` | Match status |
| `utcDate` | Match date and time in UTC |

Operations: list, load.

API path: `/persons/{id}/matches`

#### Team

| Field | Description |
| --- | --- |
| `address` | Team address |
| `area` |  |
| `awayTeam` |  |
| `clubColors` | Team colors |
| `coach` |  |
| `competition` |  |
| `crest` | URL to the team's crest image |
| `founded` | Year the team was founded |
| `group` | Group identifier |
| `homeTeam` |  |
| `id` | Unique identifier for the team |
| `lastUpdated` | Last update timestamp |
| `matchday` | Matchday number |
| `name` | Name of the team |
| `runningCompetitions` | Competitions the team is currently participating in |
| `score` |  |
| `season` |  |
| `shortName` | Short name of the team |
| `squad` | Team squad members |
| `staff` | Team staff members |
| `stage` | Match stage |
| `status` | Match status |
| `tla` | Three-letter abbreviation |
| `utcDate` | Match date and time in UTC |
| `venue` | Home stadium name |
| `website` | Team website URL |

Operations: list, load.

API path: `/teams/{id}/matches`



## Entities


### Area

Create an instance: `const area = client.Area()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `childAreas` | `any[]` | List of child areas |
| `countryCode` | `string` | ISO country code |
| `flag` | `string` | URL to the area's flag image |
| `id` | `number` | Unique identifier for the area |
| `name` | `string` | Name of the area |
| `parentArea` | `string` | Name of the parent area |
| `parentAreaId` | `number` | ID of the parent area |

#### Example: Load

```ts
const area = await client.Area().load({ id: 1 })
```

#### Example: List

```ts
const areas = await client.Area().list()
```


### Competition

Create an instance: `const competition = client.Competition()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Team address |
| `area` | `Record<string, any>` |  |
| `assists` | `number` | Number of assists |
| `awayTeam` | `Record<string, any>` |  |
| `clubColors` | `string` | Team colors |
| `code` | `string` | Short code for the competition |
| `competition` | `Record<string, any>` |  |
| `crest` | `string` | URL to the team's crest image |
| `currentSeason` | `Record<string, any>` |  |
| `emblem` | `string` | URL to the competition's emblem |
| `founded` | `number` | Year the team was founded |
| `goals` | `number` | Number of goals scored |
| `group` | `string` | Group identifier |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` | Unique identifier for the competition |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `name` | `string` | Name of the competition |
| `numberOfAvailableSeasons` | `number` | Number of seasons available |
| `penalties` | `number` | Number of penalty goals |
| `player` | `Record<string, any>` |  |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `shortName` | `string` | Short name of the team |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `table` | `any[]` |  |
| `team` | `Record<string, any>` |  |
| `tla` | `string` | Three-letter abbreviation |
| `type` | `string` | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `string` | Match date and time in UTC |
| `venue` | `string` | Home stadium name |
| `website` | `string` | Team website URL |

#### Example: Load

```ts
const competition = await client.Competition().load({ id: 'competition_id' })
```

#### Example: List

```ts
const competitions = await client.Competition().list()
```


### Match

Create an instance: `const match = client.Match()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area` | `Record<string, any>` |  |
| `awayTeam` | `Record<string, any>` |  |
| `bookings` | `any[]` |  |
| `competition` | `Record<string, any>` |  |
| `goals` | `any[]` |  |
| `group` | `string` | Group identifier |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` | Unique identifier for the match |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `odds` | `Record<string, any>` | Match odds |
| `referees` | `any[]` |  |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `substitutions` | `any[]` |  |
| `utcDate` | `string` | Match date and time in UTC |
| `venue` | `string` | Stadium name |

#### Example: Load

```ts
const match = await client.Match().load({ id: 1 })
```

#### Example: List

```ts
const matchs = await client.Match().list()
```


### Person

Create an instance: `const person = client.Person()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `awayTeam` | `Record<string, any>` |  |
| `competition` | `Record<string, any>` |  |
| `dateOfBirth` | `string` | Date of birth |
| `firstName` | `string` | First name |
| `group` | `string` | Group identifier |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` | Unique identifier for the person |
| `lastName` | `string` | Last name |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `name` | `string` | Full name of the person |
| `nationality` | `string` | Nationality |
| `position` | `string` | Playing position |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `section` | `string` | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `number` | Shirt number |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `utcDate` | `string` | Match date and time in UTC |

#### Example: Load

```ts
const person = await client.Person().load({ id: 1 })
```

#### Example: List

```ts
const persons = await client.Person().list({ id: 1 })
```


### Team

Create an instance: `const team = client.Team()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Team address |
| `area` | `Record<string, any>` |  |
| `awayTeam` | `Record<string, any>` |  |
| `clubColors` | `string` | Team colors |
| `coach` | `Record<string, any>` |  |
| `competition` | `Record<string, any>` |  |
| `crest` | `string` | URL to the team's crest image |
| `founded` | `number` | Year the team was founded |
| `group` | `string` | Group identifier |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` | Unique identifier for the team |
| `lastUpdated` | `string` | Last update timestamp |
| `matchday` | `number` | Matchday number |
| `name` | `string` | Name of the team |
| `runningCompetitions` | `any[]` | Competitions the team is currently participating in |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `shortName` | `string` | Short name of the team |
| `squad` | `any[]` | Team squad members |
| `staff` | `any[]` | Team staff members |
| `stage` | `string` | Match stage |
| `status` | `string` | Match status |
| `tla` | `string` | Three-letter abbreviation |
| `utcDate` | `string` | Match date and time in UTC |
| `venue` | `string` | Home stadium name |
| `website` | `string` | Team website URL |

#### Example: Load

```ts
const team = await client.Team().load({ id: 1 })
```

#### Example: List

```ts
const teams = await client.Team().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
football-data/
├── src/
│   ├── FootballDataSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FootballDataSDK } from '@voxgig-sdk/football-data'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const match = client.Match()
await match.list()

// match.data() now returns the match data from the last `list`
// match.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
