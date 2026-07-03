package voxgigfootballdatasdk

import (
	"github.com/voxgig-sdk/football-data-sdk/go/core"
	"github.com/voxgig-sdk/football-data-sdk/go/entity"
	"github.com/voxgig-sdk/football-data-sdk/go/feature"
	_ "github.com/voxgig-sdk/football-data-sdk/go/utility"
)

// Type aliases preserve external API.
type FootballDataSDK = core.FootballDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FootballDataEntity = core.FootballDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FootballDataError = core.FootballDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAreaEntityFunc = func(client *core.FootballDataSDK, entopts map[string]any) core.FootballDataEntity {
		return entity.NewAreaEntity(client, entopts)
	}
	core.NewCompetitionEntityFunc = func(client *core.FootballDataSDK, entopts map[string]any) core.FootballDataEntity {
		return entity.NewCompetitionEntity(client, entopts)
	}
	core.NewMatchEntityFunc = func(client *core.FootballDataSDK, entopts map[string]any) core.FootballDataEntity {
		return entity.NewMatchEntity(client, entopts)
	}
	core.NewPersonEntityFunc = func(client *core.FootballDataSDK, entopts map[string]any) core.FootballDataEntity {
		return entity.NewPersonEntity(client, entopts)
	}
	core.NewTeamEntityFunc = func(client *core.FootballDataSDK, entopts map[string]any) core.FootballDataEntity {
		return entity.NewTeamEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFootballDataSDK = core.NewFootballDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFootballDataSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FootballDataSDK  { return NewFootballDataSDK(nil) }
func Test() *FootballDataSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
