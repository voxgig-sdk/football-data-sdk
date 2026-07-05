-- Typed models for the FootballData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Area
---@field child_area? table
---@field country_code? string
---@field flag? string
---@field id? number
---@field name? string
---@field parent_area? string
---@field parent_area_id? number

---@class AreaLoadMatch
---@field id number

---@class AreaListMatch
---@field child_area? table
---@field country_code? string
---@field flag? string
---@field id? number
---@field name? string
---@field parent_area? string
---@field parent_area_id? number

---@class Competition
---@field address? string
---@field area? table
---@field assist? number
---@field away_team? table
---@field club_color? string
---@field code? string
---@field competition? table
---@field crest? string
---@field current_season? table
---@field emblem? string
---@field founded? number
---@field goal? number
---@field group? string
---@field home_team? table
---@field id? number
---@field last_updated? string
---@field matchday? number
---@field name? string
---@field number_of_available_season? number
---@field penalty? number
---@field player? table
---@field score? table
---@field season? table
---@field short_name? string
---@field stage? string
---@field status? string
---@field table? table
---@field team? table
---@field tla? string
---@field type? string
---@field utc_date? string
---@field venue? string
---@field website? string

---@class CompetitionLoadMatch
---@field id string

---@class CompetitionListMatch
---@field id string

---@class Match
---@field area? table
---@field away_team? table
---@field booking? table
---@field competition? table
---@field goal? table
---@field group? string
---@field home_team? table
---@field id? number
---@field last_updated? string
---@field matchday? number
---@field odd? table
---@field referee? table
---@field score? table
---@field season? table
---@field stage? string
---@field status? string
---@field substitution? table
---@field utc_date? string
---@field venue? string

---@class MatchLoadMatch
---@field id number

---@class MatchListMatch
---@field area? table
---@field away_team? table
---@field booking? table
---@field competition? table
---@field goal? table
---@field group? string
---@field home_team? table
---@field id? number
---@field last_updated? string
---@field matchday? number
---@field odd? table
---@field referee? table
---@field score? table
---@field season? table
---@field stage? string
---@field status? string
---@field substitution? table
---@field utc_date? string
---@field venue? string

---@class Person
---@field away_team? table
---@field competition? table
---@field date_of_birth? string
---@field first_name? string
---@field group? string
---@field home_team? table
---@field id? number
---@field last_name? string
---@field last_updated? string
---@field matchday? number
---@field name? string
---@field nationality? string
---@field position? string
---@field score? table
---@field season? table
---@field section? string
---@field shirt_number? number
---@field stage? string
---@field status? string
---@field utc_date? string

---@class PersonLoadMatch
---@field id number

---@class PersonListMatch
---@field id number

---@class Team
---@field address? string
---@field area? table
---@field away_team? table
---@field club_color? string
---@field coach? table
---@field competition? table
---@field crest? string
---@field founded? number
---@field group? string
---@field home_team? table
---@field id? number
---@field last_updated? string
---@field matchday? number
---@field name? string
---@field running_competition? table
---@field score? table
---@field season? table
---@field short_name? string
---@field squad? table
---@field staff? table
---@field stage? string
---@field status? string
---@field tla? string
---@field utc_date? string
---@field venue? string
---@field website? string

---@class TeamLoadMatch
---@field id number

---@class TeamListMatch
---@field id number

local M = {}

return M
