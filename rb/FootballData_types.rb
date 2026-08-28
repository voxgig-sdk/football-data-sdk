# frozen_string_literal: true

# Typed models for the FootballData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Area entity data model.
#
# @!attribute [rw] childAreas
#   @return [Array, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] flag
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] parentArea
#   @return [String, nil]
#
# @!attribute [rw] parentAreaId
#   @return [Integer, nil]
Area = Struct.new(
  :childAreas,
  :countryCode,
  :flag,
  :id,
  :name,
  :parentArea,
  :parentAreaId,
  keyword_init: true
)

# Request payload for Area#load.
#
# @!attribute [rw] id
#   @return [Integer]
AreaLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Area#list.
#
# @!attribute [rw] childAreas
#   @return [Array, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] flag
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] parentArea
#   @return [String, nil]
#
# @!attribute [rw] parentAreaId
#   @return [Integer, nil]
AreaListMatch = Struct.new(
  :childAreas,
  :countryCode,
  :flag,
  :id,
  :name,
  :parentArea,
  :parentAreaId,
  keyword_init: true
)

# Competition entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [Hash, nil]
#
# @!attribute [rw] assists
#   @return [Integer, nil]
#
# @!attribute [rw] awayTeam
#   @return [Hash, nil]
#
# @!attribute [rw] clubColors
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] competition
#   @return [Hash, nil]
#
# @!attribute [rw] crest
#   @return [String, nil]
#
# @!attribute [rw] currentSeason
#   @return [Hash, nil]
#
# @!attribute [rw] emblem
#   @return [String, nil]
#
# @!attribute [rw] founded
#   @return [Integer, nil]
#
# @!attribute [rw] goals
#   @return [Integer, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] homeTeam
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] numberOfAvailableSeasons
#   @return [Integer, nil]
#
# @!attribute [rw] penalties
#   @return [Integer, nil]
#
# @!attribute [rw] player
#   @return [Hash, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] season
#   @return [Hash, nil]
#
# @!attribute [rw] shortName
#   @return [String, nil]
#
# @!attribute [rw] stage
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] table
#   @return [Array, nil]
#
# @!attribute [rw] team
#   @return [Hash, nil]
#
# @!attribute [rw] tla
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] utcDate
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
Competition = Struct.new(
  :address,
  :area,
  :assists,
  :awayTeam,
  :clubColors,
  :code,
  :competition,
  :crest,
  :currentSeason,
  :emblem,
  :founded,
  :goals,
  :group,
  :homeTeam,
  :id,
  :lastUpdated,
  :matchday,
  :name,
  :numberOfAvailableSeasons,
  :penalties,
  :player,
  :score,
  :season,
  :shortName,
  :stage,
  :status,
  :table,
  :team,
  :tla,
  :type,
  :utcDate,
  :venue,
  :website,
  keyword_init: true
)

# Request payload for Competition#load.
#
# @!attribute [rw] id
#   @return [String]
CompetitionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Competition#list.
#
# @!attribute [rw] area
#   @return [String, nil]
CompetitionListMatch = Struct.new(
  :area,
  keyword_init: true
)

# Match entity data model.
#
# @!attribute [rw] area
#   @return [Hash, nil]
#
# @!attribute [rw] awayTeam
#   @return [Hash, nil]
#
# @!attribute [rw] bookings
#   @return [Array, nil]
#
# @!attribute [rw] competition
#   @return [Hash, nil]
#
# @!attribute [rw] goals
#   @return [Array, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] homeTeam
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] odds
#   @return [Hash, nil]
#
# @!attribute [rw] referees
#   @return [Array, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] season
#   @return [Hash, nil]
#
# @!attribute [rw] stage
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] substitutions
#   @return [Array, nil]
#
# @!attribute [rw] utcDate
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
Match = Struct.new(
  :area,
  :awayTeam,
  :bookings,
  :competition,
  :goals,
  :group,
  :homeTeam,
  :id,
  :lastUpdated,
  :matchday,
  :odds,
  :referees,
  :score,
  :season,
  :stage,
  :status,
  :substitutions,
  :utcDate,
  :venue,
  keyword_init: true
)

# Request payload for Match#load.
#
# @!attribute [rw] id
#   @return [Integer]
MatchLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Match#list.
#
# @!attribute [rw] competition
#   @return [String, nil]
#
# @!attribute [rw] date_from
#   @return [String, nil]
#
# @!attribute [rw] date_to
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
MatchListMatch = Struct.new(
  :competition,
  :date_from,
  :date_to,
  :status,
  keyword_init: true
)

# Person entity data model.
#
# @!attribute [rw] awayTeam
#   @return [Hash, nil]
#
# @!attribute [rw] competition
#   @return [Hash, nil]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] firstName
#   @return [String, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] homeTeam
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastName
#   @return [String, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nationality
#   @return [String, nil]
#
# @!attribute [rw] position
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] season
#   @return [Hash, nil]
#
# @!attribute [rw] section
#   @return [String, nil]
#
# @!attribute [rw] shirtNumber
#   @return [Integer, nil]
#
# @!attribute [rw] stage
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] utcDate
#   @return [String, nil]
Person = Struct.new(
  :awayTeam,
  :competition,
  :dateOfBirth,
  :firstName,
  :group,
  :homeTeam,
  :id,
  :lastName,
  :lastUpdated,
  :matchday,
  :name,
  :nationality,
  :position,
  :score,
  :season,
  :section,
  :shirtNumber,
  :stage,
  :status,
  :utcDate,
  keyword_init: true
)

# Request payload for Person#load.
#
# @!attribute [rw] id
#   @return [Integer]
PersonLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Person#list.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] competition
#   @return [String, nil]
#
# @!attribute [rw] date_from
#   @return [String, nil]
#
# @!attribute [rw] date_to
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
PersonListMatch = Struct.new(
  :id,
  :competition,
  :date_from,
  :date_to,
  :limit,
  :status,
  keyword_init: true
)

# Team entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [Hash, nil]
#
# @!attribute [rw] awayTeam
#   @return [Hash, nil]
#
# @!attribute [rw] clubColors
#   @return [String, nil]
#
# @!attribute [rw] coach
#   @return [Hash, nil]
#
# @!attribute [rw] competition
#   @return [Hash, nil]
#
# @!attribute [rw] crest
#   @return [String, nil]
#
# @!attribute [rw] founded
#   @return [Integer, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] homeTeam
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] runningCompetitions
#   @return [Array, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] season
#   @return [Hash, nil]
#
# @!attribute [rw] shortName
#   @return [String, nil]
#
# @!attribute [rw] squad
#   @return [Array, nil]
#
# @!attribute [rw] staff
#   @return [Array, nil]
#
# @!attribute [rw] stage
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] tla
#   @return [String, nil]
#
# @!attribute [rw] utcDate
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
Team = Struct.new(
  :address,
  :area,
  :awayTeam,
  :clubColors,
  :coach,
  :competition,
  :crest,
  :founded,
  :group,
  :homeTeam,
  :id,
  :lastUpdated,
  :matchday,
  :name,
  :runningCompetitions,
  :score,
  :season,
  :shortName,
  :squad,
  :staff,
  :stage,
  :status,
  :tla,
  :utcDate,
  :venue,
  :website,
  keyword_init: true
)

# Request payload for Team#load.
#
# @!attribute [rw] id
#   @return [Integer]
TeamLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Team#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
TeamListMatch = Struct.new(
  :limit,
  :offset,
  keyword_init: true
)

