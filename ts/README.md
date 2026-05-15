# FootballData TypeScript SDK

The TypeScript SDK for the FootballData API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install football-data
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FootballDataSDK } from 'football-data'

const client = new FootballDataSDK({
  apikey: process.env.FOOTBALL-DATA_APIKEY,
})
```

### 2. List areas

```ts
const result = await client.Area().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a area

```ts
const result = await client.Area().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new FootballDataSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
FOOTBALL-DATA_TEST_LIVE=TRUE
FOOTBALL-DATA_APIKEY=<your-key>
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
| `Area(data?)` | `AreaEntity` | Create a Area entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FootballDataSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `child_area` |  |
| `country_code` |  |
| `flag` |  |
| `id` |  |
| `name` |  |
| `parent_area` |  |
| `parent_area_id` |  |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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
| `child_area` | ``$ARRAY`` |  |
| `country_code` | ``$STRING`` |  |
| `flag` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `parent_area` | ``$STRING`` |  |
| `parent_area_id` | ``$INTEGER`` |  |

#### Example: Load

```ts
const area = await client.Area().load({ id: 'area_id' })
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
const match = await client.Match().load({ id: 'match_id' })
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
const person = await client.Person().load({ id: 'person_id' })
```

#### Example: List

```ts
const persons = await client.Person().list()
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
const team = await client.Team().load({ id: 'team_id' })
```

#### Example: List

```ts
const teams = await client.Team().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { FootballDataSDK } from 'football-data'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
