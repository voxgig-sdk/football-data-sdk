# Match entity test

require "minitest/autorun"
require "json"
require_relative "../FootballData_sdk"
require_relative "runner"

class MatchEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FootballDataSDK.test(nil, nil)
    ent = testsdk.Match(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = match_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "match." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FOOTBALLDATA_TEST_MATCH_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    match_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.match")))
    match_ref01_data = nil
    if match_ref01_data_raw.length > 0
      match_ref01_data = Helpers.to_map(match_ref01_data_raw[0][1])
    end

    # LIST
    match_ref01_ent = client.Match(nil)
    match_ref01_match = {}

    match_ref01_list_result, err = match_ref01_ent.list(match_ref01_match, nil)
    assert_nil err
    assert match_ref01_list_result.is_a?(Array)

    # LOAD
    match_ref01_match_dt0 = {
      "id" => match_ref01_data["id"],
    }
    match_ref01_data_dt0_loaded, err = match_ref01_ent.load(match_ref01_match_dt0, nil)
    assert_nil err
    match_ref01_data_dt0_load_result = Helpers.to_map(match_ref01_data_dt0_loaded)
    assert !match_ref01_data_dt0_load_result.nil?
    assert_equal match_ref01_data_dt0_load_result["id"], match_ref01_data["id"]

  end
end

def match_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "match", "MatchTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FootballDataSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["match01", "match02", "match03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FOOTBALLDATA_TEST_MATCH_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FOOTBALLDATA_TEST_MATCH_ENTID" => idmap,
    "FOOTBALLDATA_TEST_LIVE" => "FALSE",
    "FOOTBALLDATA_TEST_EXPLAIN" => "FALSE",
    "FOOTBALLDATA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["FOOTBALLDATA_TEST_MATCH_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FOOTBALLDATA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["FOOTBALLDATA_APIKEY"],
      },
      extra || {},
    ])
    client = FootballDataSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FOOTBALLDATA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FOOTBALLDATA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
