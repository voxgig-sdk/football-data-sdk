package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAreaEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewCompetitionEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewMatchEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewPersonEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

var NewTeamEntityFunc func(client *FootballDataSDK, entopts map[string]any) FootballDataEntity

