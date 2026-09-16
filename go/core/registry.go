package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAreaEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewCompetitionEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewMatchEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewPersonEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewTeamEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

