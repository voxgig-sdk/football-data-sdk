

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


describe('MatchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOTBALL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOTBALL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FootballDataSDK.test()
    const ent = testsdk.Match()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOTBALL_DATA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'match.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"area","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"awayTeam","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"bookings","req":false,"type":"`$ARRAY`","index$":2},{"active":true,"name":"competition","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"goals","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"name":"group","req":false,"short":"Group identifier","type":"`$STRING`","index$":5},{"active":true,"name":"homeTeam","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"name":"id","req":false,"short":"Unique identifier for the match","type":"`$INTEGER`","index$":7},{"active":true,"format":"date-time","name":"lastUpdated","req":false,"short":"Last update timestamp","type":"`$STRING`","index$":8},{"active":true,"name":"matchday","req":false,"short":"Matchday number","type":"`$INTEGER`","index$":9},{"active":true,"name":"odds","req":false,"short":"Match odds","type":"`$OBJECT`","index$":10},{"active":true,"name":"referees","req":false,"type":"`$ARRAY`","index$":11},{"active":true,"name":"score","req":false,"type":"`$OBJECT`","index$":12},{"active":true,"name":"season","req":false,"type":"`$OBJECT`","index$":13},{"active":true,"name":"stage","req":false,"short":"Match stage","type":"`$STRING`","index$":14},{"active":true,"name":"status","req":false,"short":"Match status","type":"`$STRING`","index$":15},{"active":true,"name":"substitutions","req":false,"type":"`$ARRAY`","index$":16},{"active":true,"format":"date-time","name":"utcDate","req":false,"short":"Match date and time in UTC","type":"`$STRING`","index$":17},{"active":true,"name":"venue","req":false,"short":"Stadium name","type":"`$STRING`","index$":18}],"id":{"field":"id","name":"id"},"name":"match","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"competition","orig":"competition","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"date_from","orig":"date_from","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"date_to","orig":"date_to","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /matches","json":"{\"operationId\":\"getMatches\",\"parameters\":[{\"description\":\"Filter by competition IDs (comma-separated)\",\"in\":\"query\",\"name\":\"competitions\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by match status\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter matches from this date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"dateFrom\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter matches until this date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"dateTo\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"filters\":{\"type\":\"object\"},\"matches\":{\"items\":{\"properties\":{\"awayTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"competition\":{\"properties\":{\"code\":{\"type\":\"string\"},\"emblem\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"group\":{\"description\":\"Group identifier\",\"nullable\":true,\"type\":\"string\"},\"homeTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"description\":\"Unique identifier for the match\",\"type\":\"integer\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"matchday\":{\"description\":\"Matchday number\",\"nullable\":true,\"type\":\"integer\"},\"score\":{\"properties\":{\"duration\":{\"enum\":[\"REGULAR\",\"EXTRA_TIME\",\"PENALTY_SHOOTOUT\"],\"type\":\"string\"},\"fullTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"halfTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"winner\":{\"enum\":[\"HOME_TEAM\",\"AWAY_TEAM\",\"DRAW\"],\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"season\":{\"properties\":{\"currentMatchday\":{\"type\":\"integer\"},\"endDate\":{\"format\":\"date\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"startDate\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"stage\":{\"description\":\"Match stage\",\"type\":\"string\"},\"status\":{\"description\":\"Match status\",\"enum\":[\"SCHEDULED\",\"LIVE\",\"IN_PLAY\",\"PAUSED\",\"FINISHED\",\"POSTPONED\",\"SUSPENDED\",\"CANCELLED\"],\"type\":\"string\"},\"utcDate\":{\"description\":\"Match date and time in UTC\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"resultSet\":{\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with matches\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/matches","segments":[{"lit":"matches"}],"select":{"exist":["competition","date_from","date_to","status"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /matches/{id}","json":"{\"operationId\":\"getMatchById\",\"parameters\":[{\"description\":\"The ID of the match\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"awayTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"competition\":{\"properties\":{\"code\":{\"type\":\"string\"},\"emblem\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"group\":{\"description\":\"Group identifier\",\"nullable\":true,\"type\":\"string\"},\"homeTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"description\":\"Unique identifier for the match\",\"type\":\"integer\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"matchday\":{\"description\":\"Matchday number\",\"nullable\":true,\"type\":\"integer\"},\"score\":{\"properties\":{\"duration\":{\"enum\":[\"REGULAR\",\"EXTRA_TIME\",\"PENALTY_SHOOTOUT\"],\"type\":\"string\"},\"fullTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"halfTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"winner\":{\"enum\":[\"HOME_TEAM\",\"AWAY_TEAM\",\"DRAW\"],\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"season\":{\"properties\":{\"currentMatchday\":{\"type\":\"integer\"},\"endDate\":{\"format\":\"date\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"startDate\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"stage\":{\"description\":\"Match stage\",\"type\":\"string\"},\"status\":{\"description\":\"Match status\",\"enum\":[\"SCHEDULED\",\"LIVE\",\"IN_PLAY\",\"PAUSED\",\"FINISHED\",\"POSTPONED\",\"SUSPENDED\",\"CANCELLED\"],\"type\":\"string\"},\"utcDate\":{\"description\":\"Match date and time in UTC\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"area\":{\"properties\":{\"countryCode\":{\"description\":\"ISO country code\",\"nullable\":true,\"type\":\"string\"},\"flag\":{\"description\":\"URL to the area's flag image\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the area\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the area\",\"type\":\"string\"},\"parentArea\":{\"description\":\"Name of the parent area\",\"nullable\":true,\"type\":\"string\"},\"parentAreaId\":{\"description\":\"ID of the parent area\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"bookings\":{\"items\":{\"properties\":{\"card\":{\"enum\":[\"YELLOW_CARD\",\"RED_CARD\"],\"type\":\"string\"},\"minute\":{\"type\":\"integer\"},\"player\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"team\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"goals\":{\"items\":{\"properties\":{\"assist\":{\"nullable\":true,\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"extraTime\":{\"nullable\":true,\"type\":\"integer\"},\"minute\":{\"type\":\"integer\"},\"scorer\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"team\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"odds\":{\"description\":\"Match odds\",\"nullable\":true,\"type\":\"object\"},\"referees\":{\"items\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"nationality\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"substitutions\":{\"items\":{\"properties\":{\"minute\":{\"type\":\"integer\"},\"playerIn\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"playerOut\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"team\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"venue\":{\"description\":\"Stadium name\",\"type\":\"string\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response with match details\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"404\":{\"description\":\"Match not found\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/matches/{id}","segments":[{"lit":"matches"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"match","name__orig":"match","Name":"Match","name_":"match","name-":"match","NAME":"MATCH","index$":2}, {"active":true,"entity":"match","key$":"BasicMatchFlow","kind":"basic","name":"BasicMatchFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"match_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"match_ref01","srcdatavar":"match_ref01_data","suffix":"_dt0"},"match":{"id":"match01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-match_ref01"}}],"index$":1}]}, 'Match')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let match_ref01_data = Object.values(setup.data.existing.match)[0] as any

    // LIST
    const match_ref01_ent = client.Match()
    const match_ref01_match: any = {}

    const match_ref01_list = (await match_ref01_ent.list(match_ref01_match)).map((e: any) => e.data())


    // LOAD
    const match_ref01_match_dt0: any = {}
    match_ref01_match_dt0.id = match_ref01_data.id
    const match_ref01_data_dt0 = (await match_ref01_ent.load(match_ref01_match_dt0)).data()
    assert(match_ref01_data_dt0.id === match_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/match/MatchTestData.json')

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
    ['match01','match02','match03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FOOTBALL_DATA_TEST_MATCH_ENTID': idmap,
    'FOOTBALL_DATA_TEST_LIVE': 'FALSE',
    'FOOTBALL_DATA_TEST_EXPLAIN': 'FALSE',
    'FOOTBALL_DATA_APIKEY': '',
  })

  idmap = env['FOOTBALL_DATA_TEST_MATCH_ENTID']

  const live = 'TRUE' === env.FOOTBALL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FOOTBALL_DATA_TEST_MATCH_ENTID']
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
  
