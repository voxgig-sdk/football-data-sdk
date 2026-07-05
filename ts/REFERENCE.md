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
| `child_area` | `any[]` | No |  |
| `country_code` | `string` | No |  |
| `flag` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `parent_area` | `string` | No |  |
| `parent_area_id` | `number` | No |  |

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
| `address` | `string` | No |  |
| `area` | `Record<string, any>` | No |  |
| `assist` | `number` | No |  |
| `away_team` | `Record<string, any>` | No |  |
| `club_color` | `string` | No |  |
| `code` | `string` | No |  |
| `competition` | `Record<string, any>` | No |  |
| `crest` | `string` | No |  |
| `current_season` | `Record<string, any>` | No |  |
| `emblem` | `string` | No |  |
| `founded` | `number` | No |  |
| `goal` | `number` | No |  |
| `group` | `string` | No |  |
| `home_team` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `number_of_available_season` | `number` | No |  |
| `penalty` | `number` | No |  |
| `player` | `Record<string, any>` | No |  |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `short_name` | `string` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `table` | `any[]` | No |  |
| `team` | `Record<string, any>` | No |  |
| `tla` | `string` | No |  |
| `type` | `string` | No |  |
| `utc_date` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

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
| `away_team` | `Record<string, any>` | No |  |
| `booking` | `any[]` | No |  |
| `competition` | `Record<string, any>` | No |  |
| `goal` | `any[]` | No |  |
| `group` | `string` | No |  |
| `home_team` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `odd` | `Record<string, any>` | No |  |
| `referee` | `any[]` | No |  |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `substitution` | `any[]` | No |  |
| `utc_date` | `string` | No |  |
| `venue` | `string` | No |  |

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
| `away_team` | `Record<string, any>` | No |  |
| `competition` | `Record<string, any>` | No |  |
| `date_of_birth` | `string` | No |  |
| `first_name` | `string` | No |  |
| `group` | `string` | No |  |
| `home_team` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `last_name` | `string` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `position` | `string` | No |  |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `section` | `string` | No |  |
| `shirt_number` | `number` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `utc_date` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Person().list()
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
| `address` | `string` | No |  |
| `area` | `Record<string, any>` | No |  |
| `away_team` | `Record<string, any>` | No |  |
| `club_color` | `string` | No |  |
| `coach` | `Record<string, any>` | No |  |
| `competition` | `Record<string, any>` | No |  |
| `crest` | `string` | No |  |
| `founded` | `number` | No |  |
| `group` | `string` | No |  |
| `home_team` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `last_updated` | `string` | No |  |
| `matchday` | `number` | No |  |
| `name` | `string` | No |  |
| `running_competition` | `any[]` | No |  |
| `score` | `Record<string, any>` | No |  |
| `season` | `Record<string, any>` | No |  |
| `short_name` | `string` | No |  |
| `squad` | `any[]` | No |  |
| `staff` | `any[]` | No |  |
| `stage` | `string` | No |  |
| `status` | `string` | No |  |
| `tla` | `string` | No |  |
| `utc_date` | `string` | No |  |
| `venue` | `string` | No |  |
| `website` | `string` | No |  |

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new FootballDataSDK({
  feature: {
    test: { active: true },
  }
})
```

