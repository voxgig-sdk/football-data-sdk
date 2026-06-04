# FootballData SDK

RESTful football (soccer) data covering competitions, teams, matches, standings, scorers, and players

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Football Data API

[football-data.org](https://www.football-data.org/) is a RESTful football (soccer) data API maintained by Daniel Freitag. It exposes competitions, teams, matches, standings, scorers, and player data through a single versioned REST surface (currently v4, released May 2022).

What you get from the API:

- Areas: continents and countries with hierarchical parent/child relationships.
- Competitions: leagues and tournaments such as the Premier League, La Liga, Bundesliga, Champions League, World Cup, etc.
- Teams: club details, squads, and coaching staff.
- Matches: fixtures, live scores, and results across competitions and seasons.
- Standings: league tables including home/away splits where available.
- Scorers: top goalscorer rankings per competition.
- Persons: individual player and staff profiles.

Operational notes: the free tier requires registering for an `X-Auth-Token` API key passed as an HTTP header. Rate limits and the set of accessible competitions depend on the subscription tier. The v4 base URL is `http://api.football-data.org/v4`.

## Try it

**TypeScript**
```bash
npm install football-data
```

**Python**
```bash
pip install football-data-sdk
```

**PHP**
```bash
composer require voxgig/football-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/football-data-sdk/go
```

**Ruby**
```bash
gem install football-data-sdk
```

**Lua**
```bash
luarocks install football-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FootballDataSDK } from 'football-data'

const client = new FootballDataSDK({})

// List all areas
const areas = await client.Area().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o football-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "football-data": {
      "command": "/abs/path/to/football-data-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Area** | Geographic region (continent or country) used to group competitions and teams; typically served under `/v4/areas`. | `/areas` |
| **Competition** | A league or tournament such as the Premier League or Champions League, with seasons, standings, scorers, and matches; typically served under `/v4/competitions`. | `/competitions/{id}/matches` |
| **Match** | A single fixture with schedule, status, score, and lineups, accessible per competition, per team, or globally; typically served under `/v4/matches`. | `/matches` |
| **Person** | A player, coach, or other individual associated with teams and matches; typically served under `/v4/persons`. | `/persons/{id}/matches` |
| **Team** | A club or national side with squad, staff, and fixtures; typically served under `/v4/teams`. | `/teams/{id}/matches` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from footballdata_sdk import FootballDataSDK

client = FootballDataSDK({})

# List all areas
areas, err = client.Area(None).list(None, None)

# Load a specific area
area, err = client.Area(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'footballdata_sdk.php';

$client = new FootballDataSDK([]);

// List all areas
[$areas, $err] = $client->Area(null)->list(null, null);

// Load a specific area
[$area, $err] = $client->Area(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/football-data-sdk/go"

client := sdk.NewFootballDataSDK(map[string]any{})

// List all areas
areas, err := client.Area(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FootballData_sdk"

client = FootballDataSDK.new({})

# List all areas
areas, err = client.Area(nil).list(nil, nil)

# Load a specific area
area, err = client.Area(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("football-data_sdk")

local client = sdk.new({})

-- List all areas
local areas, err = client:Area(nil):list(nil, nil)

-- Load a specific area
local area, err = client:Area(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FootballDataSDK.test()
const result = await client.Area().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FootballDataSDK.test(None, None)
result, err = client.Area(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FootballDataSDK::test(null, null);
[$result, $err] = $client->Area(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Area(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FootballDataSDK.test(nil, nil)
result, err = client.Area(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Area(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Football Data API

- Upstream: [https://www.football-data.org/](https://www.football-data.org/)
- API docs: [https://www.football-data.org/documentation/quickstart](https://www.football-data.org/documentation/quickstart)

- Free tier requires a free account and an `X-Auth-Token` API key obtained from football-data.org.
- Paid tiers exist for higher rate limits, broader competition coverage, and commercial use.
- Consult the [football-data.org terms](https://www.football-data.org/terms) for attribution and redistribution rules.

---

Generated from the Football Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
