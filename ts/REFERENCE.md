# FootballData TypeScript SDK Reference

Complete API reference for the FootballData TypeScript SDK.


## FootballDataSDK

### Constructor

```ts
new FootballDataSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FootballDataSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FootballDataSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FootballDataSDK` instance in test mode.


### Instance Methods

#### `Area(data?: object)`

Create a new `Area` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AreaEntity` instance.

#### `Competition(data?: object)`

Create a new `Competition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompetitionEntity` instance.

#### `Match(data?: object)`

Create a new `Match` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MatchEntity` instance.

#### `Person(data?: object)`

Create a new `Person` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PersonEntity` instance.

#### `Team(data?: object)`

Create a new `Team` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TeamEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FootballDataSDK.test()`.

**Returns:** `FootballDataSDK` instance in test mode.


---

## AreaEntity

```ts
const area = client.Area()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `childAreas` | `any[]` | No | List of child areas |
| `countryCode` | `string` | No | ISO country code |
| `flag` | `string` | No | URL to the area's flag image |
| `id` | `number` | No | Unique identifier for the area |
| `name` | `string` | No | Name of the area |
| `parentArea` | `string` | No | Name of the parent area |
| `parentAreaId` | `number` | No | ID of the parent area |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Area().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Area().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AreaEntity` instance with the same client and
options.

#### `client()`

Return the parent `FootballDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompetitionEntity

```ts
const competition = client.Competition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `Record<string, any>` | No |  |
| `assists` | `number` | No | Number of assists |
| `awayTeam` | `Record<string, any>` | No |  |
| `clubColors` | `string` | No | Team colors |
| `code` | `string` | No | Short code for the competition |
| `competition` | `Record<string, any>` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `currentSeason` | `Record<string, any>` | No |  |
| `emblem` | `string` | No | URL to the competition's emblem |
| `founded` | `number` | No | Year the team was founded |
| `goals` | `number` | No | Number of goals scored |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `Record<string, any>` | No |  |
| `id` | `number` | No | Unique identifier for the competition |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `name` | `string` | No | Name of the competition |
| `numberOfAvailableSeasons` | `number` | No | Number of seasons available |
| `penalties` | `number` | No | Number of penalty goals |
| `player` | `Record<string, any>` | No |  |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `table` | `any[]` | No |  |
| `team` | `Record<string, any>` | No |  |
| `tla` | `string` | No | Three-letter abbreviation |
| `type` | `string` | No | Type of competition (LEAGUE, CUP, etc.) |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `match` | `/competitions/{id}/matches` | `client.Competition().list({ $action: 'match', ... })` |
| `scorer` | `/competitions/{id}/scorers` | `client.Competition().list({ $action: 'scorer', ... })` |
| `standing` | `/competitions/{id}/standings` | `client.Competition().list({ $action: 'standing', ... })` |
| `team` | `/competitions/{id}/teams` | `client.Competition().list({ $action: 'team', ... })` |

An action returns that action's OWN response, which is not necessarily a
Competition record — check the API definition for its shape.

```ts
const result = await client.Competition().list({
  $action: 'match',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Competition().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Competition().load({ id: 'competition_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `client()`

Return the parent `FootballDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MatchEntity

```ts
const match = client.Match()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area` | `Record<string, any>` | No |  |
| `awayTeam` | `Record<string, any>` | No |  |
| `bookings` | `any[]` | No |  |
| `competition` | `Record<string, any>` | No |  |
| `goals` | `any[]` | No |  |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `Record<string, any>` | No |  |
| `id` | `number` | No | Unique identifier for the match |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `odds` | `Record<string, any>` | No | Match odds |
| `referees` | `any[]` | No |  |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `substitutions` | `any[]` | No |  |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Stadium name |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Match().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Match().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `FootballDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PersonEntity

```ts
const person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `awayTeam` | `Record<string, any>` | No |  |
| `competition` | `Record<string, any>` | No |  |
| `dateOfBirth` | `string` | No | Date of birth |
| `firstName` | `string` | No | First name |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `Record<string, any>` | No |  |
| `id` | `number` | No | Unique identifier for the person |
| `lastName` | `string` | No | Last name |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `name` | `string` | No | Full name of the person |
| `nationality` | `string` | No | Nationality |
| `position` | `string` | No | Playing position |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `section` | `string` | No | Section (e.g., Offence, Defence, Midfield, Goalkeeper) |
| `shirtNumber` | `number` | No | Shirt number |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `utcDate` | `string` | No | Match date and time in UTC |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `match` | `/persons/{id}/matches` | `client.Person().list({ $action: 'match', ... })` |

An action returns that action's OWN response, which is not necessarily a
Person record — check the API definition for its shape.

```ts
const result = await client.Person().list({
  $action: 'match',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Person().list({ id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Person().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PersonEntity` instance with the same client and
options.

#### `client()`

Return the parent `FootballDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TeamEntity

```ts
const team = client.Team()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Team address |
| `area` | `Record<string, any>` | No |  |
| `awayTeam` | `Record<string, any>` | No |  |
| `clubColors` | `string` | No | Team colors |
| `coach` | `Record<string, any>` | No |  |
| `competition` | `Record<string, any>` | No |  |
| `crest` | `string` | No | URL to the team's crest image |
| `founded` | `number` | No | Year the team was founded |
| `group` | `string` | No | Group identifier |
| `homeTeam` | `Record<string, any>` | No |  |
| `id` | `number` | No | Unique identifier for the team |
| `lastUpdated` | `string` | No | Last update timestamp |
| `matchday` | `number` | No | Matchday number |
| `name` | `string` | No | Name of the team |
| `runningCompetitions` | `any[]` | No | Competitions the team is currently participating in |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `shortName` | `string` | No | Short name of the team |
| `squad` | `any[]` | No | Team squad members |
| `staff` | `any[]` | No | Team staff members |
| `stage` | `string` | No | Match stage |
| `status` | `string` | No | Match status |
| `tla` | `string` | No | Three-letter abbreviation |
| `utcDate` | `string` | No | Match date and time in UTC |
| `venue` | `string` | No | Home stadium name |
| `website` | `string` | No | Team website URL |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `match` | `/teams/{id}/matches` | `client.Team().list({ $action: 'match', ... })` |

An action returns that action's OWN response, which is not necessarily a
Team record — check the API definition for its shape.

```ts
const result = await client.Team().list({
  $action: 'match',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Team().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Team().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TeamEntity` instance with the same client and
options.

#### `client()`

Return the parent `FootballDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ts
const client = new FootballDataSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

