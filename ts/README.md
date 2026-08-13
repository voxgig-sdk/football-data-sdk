# FootballData TypeScript SDK



The TypeScript SDK for the FootballData API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Area()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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
| `childAreas` |  |
| `countryCode` |  |
| `flag` |  |
| `id` |  |
| `name` |  |
| `parentArea` |  |
| `parentAreaId` |  |

Operations: list, load.

API path: `/areas`

#### Competition

| Field | Description |
| --- | --- |
| `address` |  |
| `area` |  |
| `assists` |  |
| `awayTeam` |  |
| `clubColors` |  |
| `code` |  |
| `competition` |  |
| `crest` |  |
| `currentSeason` |  |
| `emblem` |  |
| `founded` |  |
| `goals` |  |
| `group` |  |
| `homeTeam` |  |
| `id` |  |
| `lastUpdated` |  |
| `matchday` |  |
| `name` |  |
| `numberOfAvailableSeasons` |  |
| `penalties` |  |
| `player` |  |
| `score` |  |
| `season` |  |
| `shortName` |  |
| `stage` |  |
| `status` |  |
| `table` |  |
| `team` |  |
| `tla` |  |
| `type` |  |
| `utcDate` |  |
| `venue` |  |
| `website` |  |

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
| `group` |  |
| `homeTeam` |  |
| `id` |  |
| `lastUpdated` |  |
| `matchday` |  |
| `odds` |  |
| `referees` |  |
| `score` |  |
| `season` |  |
| `stage` |  |
| `status` |  |
| `substitutions` |  |
| `utcDate` |  |
| `venue` |  |

Operations: list, load.

API path: `/matches`

#### Person

| Field | Description |
| --- | --- |
| `awayTeam` |  |
| `competition` |  |
| `dateOfBirth` |  |
| `firstName` |  |
| `group` |  |
| `homeTeam` |  |
| `id` |  |
| `lastName` |  |
| `lastUpdated` |  |
| `matchday` |  |
| `name` |  |
| `nationality` |  |
| `position` |  |
| `score` |  |
| `season` |  |
| `section` |  |
| `shirtNumber` |  |
| `stage` |  |
| `status` |  |
| `utcDate` |  |

Operations: list, load.

API path: `/persons/{id}/matches`

#### Team

| Field | Description |
| --- | --- |
| `address` |  |
| `area` |  |
| `awayTeam` |  |
| `clubColors` |  |
| `coach` |  |
| `competition` |  |
| `crest` |  |
| `founded` |  |
| `group` |  |
| `homeTeam` |  |
| `id` |  |
| `lastUpdated` |  |
| `matchday` |  |
| `name` |  |
| `runningCompetitions` |  |
| `score` |  |
| `season` |  |
| `shortName` |  |
| `squad` |  |
| `staff` |  |
| `stage` |  |
| `status` |  |
| `tla` |  |
| `utcDate` |  |
| `venue` |  |
| `website` |  |

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
| `childAreas` | `any[]` |  |
| `countryCode` | `string` |  |
| `flag` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `parentArea` | `string` |  |
| `parentAreaId` | `number` |  |

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
| `address` | `string` |  |
| `area` | `Record<string, any>` |  |
| `assists` | `number` |  |
| `awayTeam` | `Record<string, any>` |  |
| `clubColors` | `string` |  |
| `code` | `string` |  |
| `competition` | `Record<string, any>` |  |
| `crest` | `string` |  |
| `currentSeason` | `Record<string, any>` |  |
| `emblem` | `string` |  |
| `founded` | `number` |  |
| `goals` | `number` |  |
| `group` | `string` |  |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` |  |
| `lastUpdated` | `string` |  |
| `matchday` | `number` |  |
| `name` | `string` |  |
| `numberOfAvailableSeasons` | `number` |  |
| `penalties` | `number` |  |
| `player` | `Record<string, any>` |  |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `shortName` | `string` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `table` | `any[]` |  |
| `team` | `Record<string, any>` |  |
| `tla` | `string` |  |
| `type` | `string` |  |
| `utcDate` | `string` |  |
| `venue` | `string` |  |
| `website` | `string` |  |

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
| `group` | `string` |  |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` |  |
| `lastUpdated` | `string` |  |
| `matchday` | `number` |  |
| `odds` | `Record<string, any>` |  |
| `referees` | `any[]` |  |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `substitutions` | `any[]` |  |
| `utcDate` | `string` |  |
| `venue` | `string` |  |

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
| `dateOfBirth` | `string` |  |
| `firstName` | `string` |  |
| `group` | `string` |  |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` |  |
| `lastName` | `string` |  |
| `lastUpdated` | `string` |  |
| `matchday` | `number` |  |
| `name` | `string` |  |
| `nationality` | `string` |  |
| `position` | `string` |  |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `section` | `string` |  |
| `shirtNumber` | `number` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `utcDate` | `string` |  |

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
| `address` | `string` |  |
| `area` | `Record<string, any>` |  |
| `awayTeam` | `Record<string, any>` |  |
| `clubColors` | `string` |  |
| `coach` | `Record<string, any>` |  |
| `competition` | `Record<string, any>` |  |
| `crest` | `string` |  |
| `founded` | `number` |  |
| `group` | `string` |  |
| `homeTeam` | `Record<string, any>` |  |
| `id` | `number` |  |
| `lastUpdated` | `string` |  |
| `matchday` | `number` |  |
| `name` | `string` |  |
| `runningCompetitions` | `any[]` |  |
| `score` | `Record<string, any>` |  |
| `season` | `Record<string, any>` |  |
| `shortName` | `string` |  |
| `squad` | `any[]` |  |
| `staff` | `any[]` |  |
| `stage` | `string` |  |
| `status` | `string` |  |
| `tla` | `string` |  |
| `utcDate` | `string` |  |
| `venue` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```ts
const team = await client.Team().load({ id: 1 })
```

#### Example: List

```ts
const teams = await client.Team().list()
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
