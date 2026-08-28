-- Typed models for the FootballData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Area
---@field childAreas? table
---@field countryCode? string
---@field flag? string
---@field id? number
---@field name? string
---@field parentArea? string
---@field parentAreaId? number

---@class AreaLoadMatch
---@field id number

---@class AreaListMatch
---@field childAreas? table
---@field countryCode? string
---@field flag? string
---@field id? number
---@field name? string
---@field parentArea? string
---@field parentAreaId? number

---@class Competition
---@field address? string
---@field area? table
---@field assists? number
---@field awayTeam? table
---@field clubColors? string
---@field code? string
---@field competition? table
---@field crest? string
---@field currentSeason? table
---@field emblem? string
---@field founded? number
---@field goals? number
---@field group? string
---@field homeTeam? table
---@field id? number
---@field lastUpdated? string
---@field matchday? number
---@field name? string
---@field numberOfAvailableSeasons? number
---@field penalties? number
---@field player? table
---@field score? table
---@field season? table
---@field shortName? string
---@field stage? string
---@field status? string
---@field table? table
---@field team? table
---@field tla? string
---@field type? string
---@field utcDate? string
---@field venue? string
---@field website? string

---@class CompetitionLoadMatch
---@field id string

---@class CompetitionListMatch
---@field area? string

---@class Match
---@field area? table
---@field awayTeam? table
---@field bookings? table
---@field competition? table
---@field goals? table
---@field group? string
---@field homeTeam? table
---@field id? number
---@field lastUpdated? string
---@field matchday? number
---@field odds? table
---@field referees? table
---@field score? table
---@field season? table
---@field stage? string
---@field status? string
---@field substitutions? table
---@field utcDate? string
---@field venue? string

---@class MatchLoadMatch
---@field id number

---@class MatchListMatch
---@field competition? string
---@field date_from? string
---@field date_to? string
---@field status? string

---@class Person
---@field awayTeam? table
---@field competition? table
---@field dateOfBirth? string
---@field firstName? string
---@field group? string
---@field homeTeam? table
---@field id? number
---@field lastName? string
---@field lastUpdated? string
---@field matchday? number
---@field name? string
---@field nationality? string
---@field position? string
---@field score? table
---@field season? table
---@field section? string
---@field shirtNumber? number
---@field stage? string
---@field status? string
---@field utcDate? string

---@class PersonLoadMatch
---@field id number

---@class PersonListMatch
---@field id number
---@field competition? string
---@field date_from? string
---@field date_to? string
---@field limit? number
---@field status? string

---@class Team
---@field address? string
---@field area? table
---@field awayTeam? table
---@field clubColors? string
---@field coach? table
---@field competition? table
---@field crest? string
---@field founded? number
---@field group? string
---@field homeTeam? table
---@field id? number
---@field lastUpdated? string
---@field matchday? number
---@field name? string
---@field runningCompetitions? table
---@field score? table
---@field season? table
---@field shortName? string
---@field squad? table
---@field staff? table
---@field stage? string
---@field status? string
---@field tla? string
---@field utcDate? string
---@field venue? string
---@field website? string

---@class TeamLoadMatch
---@field id number

---@class TeamListMatch
---@field limit? number
---@field offset? number

local M = {}

return M
