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
# @!attribute [rw] child_area
#   @return [Array, nil]
#
# @!attribute [rw] country_code
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
# @!attribute [rw] parent_area
#   @return [String, nil]
#
# @!attribute [rw] parent_area_id
#   @return [Integer, nil]
Area = Struct.new(
  :child_area,
  :country_code,
  :flag,
  :id,
  :name,
  :parent_area,
  :parent_area_id,
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
# @!attribute [rw] child_area
#   @return [Array, nil]
#
# @!attribute [rw] country_code
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
# @!attribute [rw] parent_area
#   @return [String, nil]
#
# @!attribute [rw] parent_area_id
#   @return [Integer, nil]
AreaListMatch = Struct.new(
  :child_area,
  :country_code,
  :flag,
  :id,
  :name,
  :parent_area,
  :parent_area_id,
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
# @!attribute [rw] assist
#   @return [Integer, nil]
#
# @!attribute [rw] away_team
#   @return [Hash, nil]
#
# @!attribute [rw] club_color
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
# @!attribute [rw] current_season
#   @return [Hash, nil]
#
# @!attribute [rw] emblem
#   @return [String, nil]
#
# @!attribute [rw] founded
#   @return [Integer, nil]
#
# @!attribute [rw] goal
#   @return [Integer, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] home_team
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] number_of_available_season
#   @return [Integer, nil]
#
# @!attribute [rw] penalty
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
# @!attribute [rw] short_name
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
# @!attribute [rw] utc_date
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
  :assist,
  :away_team,
  :club_color,
  :code,
  :competition,
  :crest,
  :current_season,
  :emblem,
  :founded,
  :goal,
  :group,
  :home_team,
  :id,
  :last_updated,
  :matchday,
  :name,
  :number_of_available_season,
  :penalty,
  :player,
  :score,
  :season,
  :short_name,
  :stage,
  :status,
  :table,
  :team,
  :tla,
  :type,
  :utc_date,
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
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [Hash, nil]
#
# @!attribute [rw] assist
#   @return [Integer, nil]
#
# @!attribute [rw] away_team
#   @return [Hash, nil]
#
# @!attribute [rw] club_color
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
# @!attribute [rw] current_season
#   @return [Hash, nil]
#
# @!attribute [rw] emblem
#   @return [String, nil]
#
# @!attribute [rw] founded
#   @return [Integer, nil]
#
# @!attribute [rw] goal
#   @return [Integer, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] home_team
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] number_of_available_season
#   @return [Integer, nil]
#
# @!attribute [rw] penalty
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
# @!attribute [rw] short_name
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
# @!attribute [rw] utc_date
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
CompetitionListMatch = Struct.new(
  :address,
  :area,
  :assist,
  :away_team,
  :club_color,
  :code,
  :competition,
  :crest,
  :current_season,
  :emblem,
  :founded,
  :goal,
  :group,
  :home_team,
  :id,
  :last_updated,
  :matchday,
  :name,
  :number_of_available_season,
  :penalty,
  :player,
  :score,
  :season,
  :short_name,
  :stage,
  :status,
  :table,
  :team,
  :tla,
  :type,
  :utc_date,
  :venue,
  :website,
  keyword_init: true
)

# Match entity data model.
#
# @!attribute [rw] area
#   @return [Hash, nil]
#
# @!attribute [rw] away_team
#   @return [Hash, nil]
#
# @!attribute [rw] booking
#   @return [Array, nil]
#
# @!attribute [rw] competition
#   @return [Hash, nil]
#
# @!attribute [rw] goal
#   @return [Array, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] home_team
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] odd
#   @return [Hash, nil]
#
# @!attribute [rw] referee
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
# @!attribute [rw] substitution
#   @return [Array, nil]
#
# @!attribute [rw] utc_date
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
Match = Struct.new(
  :area,
  :away_team,
  :booking,
  :competition,
  :goal,
  :group,
  :home_team,
  :id,
  :last_updated,
  :matchday,
  :odd,
  :referee,
  :score,
  :season,
  :stage,
  :status,
  :substitution,
  :utc_date,
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
# @!attribute [rw] area
#   @return [Hash, nil]
#
# @!attribute [rw] away_team
#   @return [Hash, nil]
#
# @!attribute [rw] booking
#   @return [Array, nil]
#
# @!attribute [rw] competition
#   @return [Hash, nil]
#
# @!attribute [rw] goal
#   @return [Array, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] home_team
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] odd
#   @return [Hash, nil]
#
# @!attribute [rw] referee
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
# @!attribute [rw] substitution
#   @return [Array, nil]
#
# @!attribute [rw] utc_date
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
MatchListMatch = Struct.new(
  :area,
  :away_team,
  :booking,
  :competition,
  :goal,
  :group,
  :home_team,
  :id,
  :last_updated,
  :matchday,
  :odd,
  :referee,
  :score,
  :season,
  :stage,
  :status,
  :substitution,
  :utc_date,
  :venue,
  keyword_init: true
)

# Person entity data model.
#
# @!attribute [rw] away_team
#   @return [Hash, nil]
#
# @!attribute [rw] competition
#   @return [Hash, nil]
#
# @!attribute [rw] date_of_birth
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] home_team
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] last_updated
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
# @!attribute [rw] shirt_number
#   @return [Integer, nil]
#
# @!attribute [rw] stage
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] utc_date
#   @return [String, nil]
Person = Struct.new(
  :away_team,
  :competition,
  :date_of_birth,
  :first_name,
  :group,
  :home_team,
  :id,
  :last_name,
  :last_updated,
  :matchday,
  :name,
  :nationality,
  :position,
  :score,
  :season,
  :section,
  :shirt_number,
  :stage,
  :status,
  :utc_date,
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
PersonListMatch = Struct.new(
  :id,
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
# @!attribute [rw] away_team
#   @return [Hash, nil]
#
# @!attribute [rw] club_color
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
# @!attribute [rw] home_team
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] running_competition
#   @return [Array, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] season
#   @return [Hash, nil]
#
# @!attribute [rw] short_name
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
# @!attribute [rw] utc_date
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
  :away_team,
  :club_color,
  :coach,
  :competition,
  :crest,
  :founded,
  :group,
  :home_team,
  :id,
  :last_updated,
  :matchday,
  :name,
  :running_competition,
  :score,
  :season,
  :short_name,
  :squad,
  :staff,
  :stage,
  :status,
  :tla,
  :utc_date,
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
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [Hash, nil]
#
# @!attribute [rw] away_team
#   @return [Hash, nil]
#
# @!attribute [rw] club_color
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
# @!attribute [rw] home_team
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] matchday
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] running_competition
#   @return [Array, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] season
#   @return [Hash, nil]
#
# @!attribute [rw] short_name
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
# @!attribute [rw] utc_date
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
TeamListMatch = Struct.new(
  :address,
  :area,
  :away_team,
  :club_color,
  :coach,
  :competition,
  :crest,
  :founded,
  :group,
  :home_team,
  :id,
  :last_updated,
  :matchday,
  :name,
  :running_competition,
  :score,
  :season,
  :short_name,
  :squad,
  :staff,
  :stage,
  :status,
  :tla,
  :utc_date,
  :venue,
  :website,
  keyword_init: true
)

