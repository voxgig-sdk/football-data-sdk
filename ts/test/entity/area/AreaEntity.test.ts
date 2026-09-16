

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


describe('AreaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FOOTBALL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FOOTBALL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FootballDataSDK.test()
    const ent = testsdk.Area()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FOOTBALL_DATA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'area.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"childAreas","req":false,"short":"List of child areas","type":"`$ARRAY`","index$":0},{"active":true,"name":"countryCode","req":false,"short":"ISO country code","type":"`$STRING`","index$":1},{"active":true,"name":"flag","req":false,"short":"URL to the area's flag image","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the area","type":"`$INTEGER`","index$":3},{"active":true,"name":"name","req":false,"short":"Name of the area","type":"`$STRING`","index$":4},{"active":true,"name":"parentArea","req":false,"short":"Name of the parent area","type":"`$STRING`","index$":5},{"active":true,"name":"parentAreaId","req":false,"short":"ID of the parent area","type":"`$INTEGER`","index$":6}],"id":{"field":"id","name":"id"},"name":"area","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /areas","json":"{\"operationId\":\"getAreas\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"areas\":{\"items\":{\"properties\":{\"countryCode\":{\"description\":\"ISO country code\",\"nullable\":true,\"type\":\"string\"},\"flag\":{\"description\":\"URL to the area's flag image\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the area\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the area\",\"type\":\"string\"},\"parentArea\":{\"description\":\"Name of the parent area\",\"nullable\":true,\"type\":\"string\"},\"parentAreaId\":{\"description\":\"ID of the parent area\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"count\":{\"description\":\"Total number of areas\",\"type\":\"integer\"},\"filters\":{\"description\":\"Applied filters\",\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of areas\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/areas","segments":[{"lit":"areas"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /areas/{id}","json":"{\"operationId\":\"getAreaById\",\"parameters\":[{\"description\":\"The ID of the area to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"countryCode\":{\"description\":\"ISO country code\",\"nullable\":true,\"type\":\"string\"},\"flag\":{\"description\":\"URL to the area's flag image\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the area\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the area\",\"type\":\"string\"},\"parentArea\":{\"description\":\"Name of the parent area\",\"nullable\":true,\"type\":\"string\"},\"parentAreaId\":{\"description\":\"ID of the parent area\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},{\"properties\":{\"childAreas\":{\"description\":\"List of child areas\",\"items\":{\"properties\":{\"countryCode\":{\"description\":\"ISO country code\",\"nullable\":true,\"type\":\"string\"},\"flag\":{\"description\":\"URL to the area's flag image\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the area\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the area\",\"type\":\"string\"},\"parentArea\":{\"description\":\"Name of the parent area\",\"nullable\":true,\"type\":\"string\"},\"parentAreaId\":{\"description\":\"ID of the parent area\",\"nullable\":true,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response with area details\"},\"400\":{\"description\":\"Bad request\"},\"403\":{\"description\":\"Forbidden - Invalid API key\"},\"404\":{\"description\":\"Area not found\"},\"429\":{\"description\":\"Too many requests\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://www.football-data.org\",\"in\":\"header\",\"name\":\"X-Auth-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/areas/{id}","segments":[{"lit":"areas"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"area","name__orig":"area","Name":"Area","name_":"area","name-":"area","NAME":"AREA","index$":0}, {"active":true,"entity":"area","key$":"BasicAreaFlow","kind":"basic","name":"BasicAreaFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"area_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"area_ref01","srcdatavar":"area_ref01_data","suffix":"_dt0"},"match":{"id":"area01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-area_ref01"}}],"index$":1}]}, 'Area')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let area_ref01_data = Object.values(setup.data.existing.area)[0] as any

    // LIST
    const area_ref01_ent = client.Area()
    const area_ref01_match: any = {}

    const area_ref01_list = (await area_ref01_ent.list(area_ref01_match)).map((e: any) => e.data())


    // LOAD
    const area_ref01_match_dt0: any = {}
    area_ref01_match_dt0.id = area_ref01_data.id
    const area_ref01_data_dt0 = (await area_ref01_ent.load(area_ref01_match_dt0)).data()
    assert(area_ref01_data_dt0.id === area_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/area/AreaTestData.json')

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
    ['area01','area02','area03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FOOTBALL_DATA_TEST_AREA_ENTID': idmap,
    'FOOTBALL_DATA_TEST_LIVE': 'FALSE',
    'FOOTBALL_DATA_TEST_EXPLAIN': 'FALSE',
    'FOOTBALL_DATA_APIKEY': '',
  })

  idmap = env['FOOTBALL_DATA_TEST_AREA_ENTID']

  const live = 'TRUE' === env.FOOTBALL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FOOTBALL_DATA_TEST_AREA_ENTID']
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
  
