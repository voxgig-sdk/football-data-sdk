

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FootballDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TeamEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOTBALL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOTBALL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FootballDataSDK.test()
    const ent = testsdk.Team()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOTBALL_DATA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'team.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"address","req":false,"short":"Team address","type":"`$STRING`","index$":0},{"active":true,"name":"area","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"clubColors","req":false,"short":"Team colors","type":"`$STRING`","index$":2},{"active":true,"name":"coach","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"crest","req":false,"short":"URL to the team's crest image","type":"`$STRING`","index$":4},{"active":true,"name":"founded","req":false,"short":"Year the team was founded","type":"`$INTEGER`","index$":5},{"active":true,"name":"id","req":false,"short":"Unique identifier for the team","type":"`$INTEGER`","index$":6},{"active":true,"format":"date-time","name":"lastUpdated","req":false,"short":"Last update timestamp","type":"`$STRING`","index$":7},{"active":true,"name":"name","req":false,"short":"Name of the team","type":"`$STRING`","index$":8},{"active":true,"name":"runningCompetitions","req":false,"short":"Competitions the team is currently participating in","type":"`$ARRAY`","index$":9},{"active":true,"name":"shortName","req":false,"short":"Short name of the team","type":"`$STRING`","index$":10},{"active":true,"name":"squad","req":false,"short":"Team squad members","type":"`$ARRAY`","index$":11},{"active":true,"name":"staff","req":false,"short":"Team staff members","type":"`$ARRAY`","index$":12},{"active":true,"name":"tla","req":false,"short":"Three-letter abbreviation","type":"`$STRING`","index$":13},{"active":true,"name":"venue","req":false,"short":"Home stadium name","type":"`$STRING`","index$":14},{"active":true,"name":"website","req":false,"short":"Team website URL","type":"`$STRING`","index$":15}],"id":{"field":"id","name":"id"},"name":"team","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`"}],"query":[{"active":true,"kind":"query","name":"date_from","orig":"date_from","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"date_to","orig":"date_to","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`"},{"active":true,"kind":"query","name":"season","orig":"season","reqd":false,"type":"`$INTEGER`"},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"venue","orig":"venue","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /teams/{id}/matches","json":"{\"operationId\":\"getTeamMatches\",\"parameters\":[{\"description\":\"The ID of the team\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter by season year\",\"in\":\"query\",\"name\":\"season\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter by match status\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter matches from this date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"dateFrom\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter matches until this date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"dateTo\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter by venue (HOME or AWAY)\",\"in\":\"query\",\"name\":\"venue\",\"schema\":{\"enum\":[\"HOME\",\"AWAY\"],\"type\":\"string\"}},{\"description\":\"Limit the number of matches returned\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"filters\":{\"type\":\"object\"},\"matches\":{\"items\":{\"properties\":{\"awayTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"competition\":{\"properties\":{\"code\":{\"type\":\"string\"},\"emblem\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"group\":{\"description\":\"Group identifier\",\"nullable\":true,\"type\":\"string\"},\"homeTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"description\":\"Unique identifier for the match\",\"type\":\"integer\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"matchday\":{\"description\":\"Matchday number\",\"nullable\":true,\"type\":\"integer\"},\"score\":{\"properties\":{\"duration\":{\"enum\":[\"REGULAR\",\"EXTRA_TIME\",\"PENALTY_SHOOTOUT\"],\"type\":\"string\"},\"fullTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"halfTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"winner\":{\"enum\":[\"HOME_TEAM\",\"AWAY_TEAM\",\"DRAW\"],\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"season\":{\"properties\":{\"currentMatchday\":{\"type\":\"integer\"},\"endDate\":{\"format\":\"date\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"startDate\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"stage\":{\"description\":\"Match stage\",\"type\":\"string\"},\"status\":{\"description\":\"Match status\",\"enum\":[\"SCHEDULED\",\"LIVE\",\"IN_PLAY\",\"PAUSED\",\"FINISHED\",\"POSTPONED\",\"SUSPENDED\",\"CANCELLED\"],\"type\":\"string\"},\"utcDate\":{\"description\":\"Match date and time in UTC\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"resultSet\":{\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with matches\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"404\":{\"description\":\"Team not found\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/teams/{id}/matches","segments":[{"lit":"teams"},{"var":"id"},{"lit":"matches"}],"select":{"$action":"match","exist":["date_from","date_to","id","limit","season","status","venue"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /teams","json":"{\"operationId\":\"getTeams\",\"parameters\":[{\"description\":\"Limit the number of teams returned\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"filters\":{\"type\":\"object\"},\"teams\":{\"items\":{\"properties\":{\"address\":{\"description\":\"Team address\",\"type\":\"string\"},\"clubColors\":{\"description\":\"Team colors\",\"type\":\"string\"},\"crest\":{\"description\":\"URL to the team's crest image\",\"nullable\":true,\"type\":\"string\"},\"founded\":{\"description\":\"Year the team was founded\",\"nullable\":true,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the team\",\"type\":\"integer\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the team\",\"type\":\"string\"},\"shortName\":{\"description\":\"Short name of the team\",\"type\":\"string\"},\"tla\":{\"description\":\"Three-letter abbreviation\",\"type\":\"string\"},\"venue\":{\"description\":\"Home stadium name\",\"type\":\"string\"},\"website\":{\"description\":\"Team website URL\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of teams\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/teams","segments":[{"lit":"teams"}],"select":{"exist":["limit","offset"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /teams/{id}","json":"{\"operationId\":\"getTeamById\",\"parameters\":[{\"description\":\"The ID of the team\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"address\":{\"description\":\"Team address\",\"type\":\"string\"},\"clubColors\":{\"description\":\"Team colors\",\"type\":\"string\"},\"crest\":{\"description\":\"URL to the team's crest image\",\"nullable\":true,\"type\":\"string\"},\"founded\":{\"description\":\"Year the team was founded\",\"nullable\":true,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the team\",\"type\":\"integer\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the team\",\"type\":\"string\"},\"shortName\":{\"description\":\"Short name of the team\",\"type\":\"string\"},\"tla\":{\"description\":\"Three-letter abbreviation\",\"type\":\"string\"},\"venue\":{\"description\":\"Home stadium name\",\"type\":\"string\"},\"website\":{\"description\":\"Team website URL\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"area\":{\"properties\":{\"countryCode\":{\"description\":\"ISO country code\",\"nullable\":true,\"type\":\"string\"},\"flag\":{\"description\":\"URL to the area's flag image\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the area\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the area\",\"type\":\"string\"},\"parentArea\":{\"description\":\"Name of the parent area\",\"nullable\":true,\"type\":\"string\"},\"parentAreaId\":{\"description\":\"ID of the parent area\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"coach\":{\"properties\":{\"dateOfBirth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"firstName\":{\"description\":\"First name\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"integer\"},\"lastName\":{\"description\":\"Last name\",\"nullable\":true,\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"nationality\":{\"description\":\"Nationality\",\"nullable\":true,\"type\":\"string\"},\"position\":{\"description\":\"Playing position\",\"nullable\":true,\"type\":\"string\"},\"section\":{\"description\":\"Section (e.g., Offence, Defence, Midfield, Goalkeeper)\",\"nullable\":true,\"type\":\"string\"},\"shirtNumber\":{\"description\":\"Shirt number\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"runningCompetitions\":{\"description\":\"Competitions the team is currently participating in\",\"items\":{\"properties\":{\"area\":{\"properties\":{\"countryCode\":{\"description\":\"ISO country code\",\"nullable\":true,\"type\":\"string\"},\"flag\":{\"description\":\"URL to the area's flag image\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the area\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the area\",\"type\":\"string\"},\"parentArea\":{\"description\":\"Name of the parent area\",\"nullable\":true,\"type\":\"string\"},\"parentAreaId\":{\"description\":\"ID of the parent area\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"code\":{\"description\":\"Short code for the competition\",\"nullable\":true,\"type\":\"string\"},\"currentSeason\":{\"properties\":{\"currentMatchday\":{\"description\":\"Current matchday number\",\"nullable\":true,\"type\":\"integer\"},\"endDate\":{\"description\":\"Season end date\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the season\",\"type\":\"integer\"},\"startDate\":{\"description\":\"Season start date\",\"format\":\"date\",\"type\":\"string\"},\"winner\":{\"description\":\"Winner of the season\",\"nullable\":true,\"type\":\"object\"}},\"type\":\"object\"},\"emblem\":{\"description\":\"URL to the competition's emblem\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the competition\",\"type\":\"integer\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the competition\",\"type\":\"string\"},\"numberOfAvailableSeasons\":{\"description\":\"Number of seasons available\",\"type\":\"integer\"},\"type\":{\"description\":\"Type of competition (LEAGUE, CUP, etc.)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"squad\":{\"description\":\"Team squad members\",\"items\":{\"properties\":{\"dateOfBirth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"firstName\":{\"description\":\"First name\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"integer\"},\"lastName\":{\"description\":\"Last name\",\"nullable\":true,\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"nationality\":{\"description\":\"Nationality\",\"nullable\":true,\"type\":\"string\"},\"position\":{\"description\":\"Playing position\",\"nullable\":true,\"type\":\"string\"},\"section\":{\"description\":\"Section (e.g., Offence, Defence, Midfield, Goalkeeper)\",\"nullable\":true,\"type\":\"string\"},\"shirtNumber\":{\"description\":\"Shirt number\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"staff\":{\"description\":\"Team staff members\",\"items\":{\"properties\":{\"dateOfBirth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"firstName\":{\"description\":\"First name\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"integer\"},\"lastName\":{\"description\":\"Last name\",\"nullable\":true,\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"nationality\":{\"description\":\"Nationality\",\"nullable\":true,\"type\":\"string\"},\"position\":{\"description\":\"Playing position\",\"nullable\":true,\"type\":\"string\"},\"section\":{\"description\":\"Section (e.g., Offence, Defence, Midfield, Goalkeeper)\",\"nullable\":true,\"type\":\"string\"},\"shirtNumber\":{\"description\":\"Shirt number\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response with team details\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"404\":{\"description\":\"Team not found\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/teams/{id}","segments":[{"lit":"teams"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"team","name__orig":"team","Name":"Team","name_":"team","name-":"team","NAME":"TEAM","index$":4}, {"active":true,"entity":"team","key$":"BasicTeamFlow","kind":"basic","name":"BasicTeamFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"team_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"team_ref01","srcdatavar":"team_ref01_data","suffix":"_dt0"},"match":{"id":"team01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-team_ref01"}}],"index$":1}]}, 'Team')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let team_ref01_data = Object.values(setup.data.existing.team)[0] as any

    // LIST
    const team_ref01_ent = client.Team()
    const team_ref01_match: any = {}

    const team_ref01_list = (await team_ref01_ent.list(team_ref01_match)).map((e: any) => e.data())


    // LOAD
    const team_ref01_match_dt0: any = {}
    team_ref01_match_dt0.id = team_ref01_data.id
    const team_ref01_data_dt0 = (await team_ref01_ent.load(team_ref01_match_dt0)).data()
    assert(team_ref01_data_dt0.id === team_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/team/TeamTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FootballDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['team01','team02','team03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FOOTBALL_DATA_TEST_TEAM_ENTID': idmap,
    'FOOTBALL_DATA_TEST_LIVE': 'FALSE',
    'FOOTBALL_DATA_TEST_EXPLAIN': 'FALSE',
    'FOOTBALL_DATA_APIKEY': '',
  })

  idmap = env['FOOTBALL_DATA_TEST_TEAM_ENTID']

  const live = 'TRUE' === env.FOOTBALL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FOOTBALL_DATA_TEST_TEAM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FootballDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.FOOTBALL_DATA_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FOOTBALL_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
