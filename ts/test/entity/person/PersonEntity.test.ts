

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


describe('PersonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOTBALL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOTBALL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FootballDataSDK.test()
    const ent = testsdk.Person()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOTBALL_DATA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'person.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"awayTeam","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"competition","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"format":"date","name":"dateOfBirth","req":false,"short":"Date of birth","type":"`$STRING`","index$":2},{"active":true,"name":"firstName","req":false,"short":"First name","type":"`$STRING`","index$":3},{"active":true,"name":"group","req":false,"short":"Group identifier","type":"`$STRING`","index$":4},{"active":true,"name":"homeTeam","req":false,"type":"`$OBJECT`","index$":5},{"active":true,"name":"id","req":false,"short":"Unique identifier for the person","type":"`$INTEGER`","index$":6},{"active":true,"name":"lastName","req":false,"short":"Last name","type":"`$STRING`","index$":7},{"active":true,"format":"date-time","name":"lastUpdated","req":false,"short":"Last update timestamp","type":"`$STRING`","index$":8},{"active":true,"name":"matchday","req":false,"short":"Matchday number","type":"`$INTEGER`","index$":9},{"active":true,"name":"name","req":false,"short":"Full name of the person","type":"`$STRING`","index$":10},{"active":true,"name":"nationality","req":false,"short":"Nationality","type":"`$STRING`","index$":11},{"active":true,"name":"position","req":false,"short":"Playing position","type":"`$STRING`","index$":12},{"active":true,"name":"score","req":false,"type":"`$OBJECT`","index$":13},{"active":true,"name":"season","req":false,"type":"`$OBJECT`","index$":14},{"active":true,"name":"section","req":false,"short":"Section (e.g., Offence, Defence, Midfield, Goalkeeper)","type":"`$STRING`","index$":15},{"active":true,"name":"shirtNumber","req":false,"short":"Shirt number","type":"`$INTEGER`","index$":16},{"active":true,"name":"stage","req":false,"short":"Match stage","type":"`$STRING`","index$":17},{"active":true,"name":"status","req":false,"short":"Match status","type":"`$STRING`","index$":18},{"active":true,"format":"date-time","name":"utcDate","req":false,"short":"Match date and time in UTC","type":"`$STRING`","index$":19}],"id":{"field":"id","name":"id"},"name":"person","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"competition","orig":"competition","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"date_from","orig":"date_from","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"date_to","orig":"date_to","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /persons/{id}/matches","json":"{\"operationId\":\"getPersonMatches\",\"parameters\":[{\"description\":\"The ID of the person\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter by competition IDs (comma-separated)\",\"in\":\"query\",\"name\":\"competitions\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by match status\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter matches from this date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"dateFrom\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter matches until this date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"dateTo\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Limit the number of matches returned\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"filters\":{\"type\":\"object\"},\"matches\":{\"items\":{\"properties\":{\"awayTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"competition\":{\"properties\":{\"code\":{\"type\":\"string\"},\"emblem\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"group\":{\"description\":\"Group identifier\",\"nullable\":true,\"type\":\"string\"},\"homeTeam\":{\"properties\":{\"crest\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shortName\":{\"type\":\"string\"},\"tla\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"description\":\"Unique identifier for the match\",\"type\":\"integer\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"matchday\":{\"description\":\"Matchday number\",\"nullable\":true,\"type\":\"integer\"},\"score\":{\"properties\":{\"duration\":{\"enum\":[\"REGULAR\",\"EXTRA_TIME\",\"PENALTY_SHOOTOUT\"],\"type\":\"string\"},\"fullTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"halfTime\":{\"properties\":{\"away\":{\"nullable\":true,\"type\":\"integer\"},\"home\":{\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"winner\":{\"enum\":[\"HOME_TEAM\",\"AWAY_TEAM\",\"DRAW\"],\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"season\":{\"properties\":{\"currentMatchday\":{\"type\":\"integer\"},\"endDate\":{\"format\":\"date\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"startDate\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"stage\":{\"description\":\"Match stage\",\"type\":\"string\"},\"status\":{\"description\":\"Match status\",\"enum\":[\"SCHEDULED\",\"LIVE\",\"IN_PLAY\",\"PAUSED\",\"FINISHED\",\"POSTPONED\",\"SUSPENDED\",\"CANCELLED\"],\"type\":\"string\"},\"utcDate\":{\"description\":\"Match date and time in UTC\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"person\":{\"properties\":{\"dateOfBirth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"firstName\":{\"description\":\"First name\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"integer\"},\"lastName\":{\"description\":\"Last name\",\"nullable\":true,\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"nationality\":{\"description\":\"Nationality\",\"nullable\":true,\"type\":\"string\"},\"position\":{\"description\":\"Playing position\",\"nullable\":true,\"type\":\"string\"},\"section\":{\"description\":\"Section (e.g., Offence, Defence, Midfield, Goalkeeper)\",\"nullable\":true,\"type\":\"string\"},\"shirtNumber\":{\"description\":\"Shirt number\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"resultSet\":{\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with matches\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"404\":{\"description\":\"Person not found\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/persons/{id}/matches","segments":[{"lit":"persons"},{"var":"id"},{"lit":"matches"}],"select":{"$action":"match","exist":["competition","date_from","date_to","id","limit","status"]},"transform":{"req":"`reqdata`","res":"`body.person`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /persons/{id}","json":"{\"operationId\":\"getPersonById\",\"parameters\":[{\"description\":\"The ID of the person\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"dateOfBirth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"firstName\":{\"description\":\"First name\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"integer\"},\"lastName\":{\"description\":\"Last name\",\"nullable\":true,\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"nationality\":{\"description\":\"Nationality\",\"nullable\":true,\"type\":\"string\"},\"position\":{\"description\":\"Playing position\",\"nullable\":true,\"type\":\"string\"},\"section\":{\"description\":\"Section (e.g., Offence, Defence, Midfield, Goalkeeper)\",\"nullable\":true,\"type\":\"string\"},\"shirtNumber\":{\"description\":\"Shirt number\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with person details\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"404\":{\"description\":\"Person not found\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/persons/{id}","segments":[{"lit":"persons"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"person","name__orig":"person","Name":"Person","name_":"person","name-":"person","NAME":"PERSON","index$":3}, {"active":true,"entity":"person","key$":"BasicPersonFlow","kind":"basic","name":"BasicPersonFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"person_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"person_ref01","srcdatavar":"person_ref01_data","suffix":"_dt0"},"match":{"id":"person01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-person_ref01"}}],"index$":1}]}, 'Person')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let person_ref01_data = Object.values(setup.data.existing.person)[0] as any

    // LIST
    const person_ref01_ent = client.Person()
    const person_ref01_match: any = {}

    const person_ref01_list = (await person_ref01_ent.list(person_ref01_match)).map((e: any) => e.data())


    // LOAD
    const person_ref01_match_dt0: any = {}
    person_ref01_match_dt0.id = person_ref01_data.id
    const person_ref01_data_dt0 = (await person_ref01_ent.load(person_ref01_match_dt0)).data()
    assert(person_ref01_data_dt0.id === person_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/person/PersonTestData.json')

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
    ['person01','person02','person03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FOOTBALL_DATA_TEST_PERSON_ENTID': idmap,
    'FOOTBALL_DATA_TEST_LIVE': 'FALSE',
    'FOOTBALL_DATA_TEST_EXPLAIN': 'FALSE',
    'FOOTBALL_DATA_APIKEY': '',
  })

  idmap = env['FOOTBALL_DATA_TEST_PERSON_ENTID']

  const live = 'TRUE' === env.FOOTBALL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FOOTBALL_DATA_TEST_PERSON_ENTID']
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
  
