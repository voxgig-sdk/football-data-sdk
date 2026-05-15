package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/football-data-sdk"
	"github.com/voxgig-sdk/football-data-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCompetitionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Competition(nil)
		if ent == nil {
			t.Fatal("expected non-nil CompetitionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := competitionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "competition." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FOOTBALLDATA_TEST_COMPETITION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		competitionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.competition", setup.data)))
		var competitionRef01Data map[string]any
		if len(competitionRef01DataRaw) > 0 {
			competitionRef01Data = core.ToMapAny(competitionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = competitionRef01Data

		// LIST
		competitionRef01Ent := client.Competition(nil)
		competitionRef01Match := map[string]any{}

		competitionRef01ListResult, err := competitionRef01Ent.List(competitionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, competitionRef01ListOk := competitionRef01ListResult.([]any)
		if !competitionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", competitionRef01ListResult)
		}

		// LOAD
		competitionRef01MatchDt0 := map[string]any{
			"id": competitionRef01Data["id"],
		}
		competitionRef01DataDt0Loaded, err := competitionRef01Ent.Load(competitionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		competitionRef01DataDt0LoadResult := core.ToMapAny(competitionRef01DataDt0Loaded)
		if competitionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if competitionRef01DataDt0LoadResult["id"] != competitionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func competitionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "competition", "CompetitionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read competition test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse competition test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"competition01", "competition02", "competition03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FOOTBALLDATA_TEST_COMPETITION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FOOTBALLDATA_TEST_COMPETITION_ENTID": idmap,
		"FOOTBALLDATA_TEST_LIVE":      "FALSE",
		"FOOTBALLDATA_TEST_EXPLAIN":   "FALSE",
		"FOOTBALLDATA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["FOOTBALLDATA_TEST_COMPETITION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FOOTBALLDATA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["FOOTBALLDATA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewFootballDataSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FOOTBALLDATA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FOOTBALLDATA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
