// Typed models for the FootballData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Area {
  child_area?: any[]
  country_code?: string
  flag?: string
  id?: number
  name?: string
  parent_area?: string
  parent_area_id?: number
}

export interface AreaLoadMatch {
  id: number
}

export interface AreaListMatch {
  child_area?: any[]
  country_code?: string
  flag?: string
  id?: number
  name?: string
  parent_area?: string
  parent_area_id?: number
}

export interface Competition {
  address?: string
  area?: Record<string, any>
  assist?: number
  away_team?: Record<string, any>
  club_color?: string
  code?: string
  competition?: Record<string, any>
  crest?: string
  current_season?: Record<string, any>
  emblem?: string
  founded?: number
  goal?: number
  group?: string
  home_team?: Record<string, any>
  id?: number
  last_updated?: string
  matchday?: number
  name?: string
  number_of_available_season?: number
  penalty?: number
  player?: Record<string, any>
  score?: Record<string, any>
  season?: Record<string, any>
  short_name?: string
  stage?: string
  status?: string
  table?: any[]
  team?: Record<string, any>
  tla?: string
  type?: string
  utc_date?: string
  venue?: string
  website?: string
}

export interface CompetitionLoadMatch {
  id: string
}

export interface CompetitionListMatch {
  address?: string
  area?: Record<string, any>
  assist?: number
  away_team?: Record<string, any>
  club_color?: string
  code?: string
  competition?: Record<string, any>
  crest?: string
  current_season?: Record<string, any>
  emblem?: string
  founded?: number
  goal?: number
  group?: string
  home_team?: Record<string, any>
  id?: number
  last_updated?: string
  matchday?: number
  name?: string
  number_of_available_season?: number
  penalty?: number
  player?: Record<string, any>
  score?: Record<string, any>
  season?: Record<string, any>
  short_name?: string
  stage?: string
  status?: string
  table?: any[]
  team?: Record<string, any>
  tla?: string
  type?: string
  utc_date?: string
  venue?: string
  website?: string
}

export interface Match {
  area?: Record<string, any>
  away_team?: Record<string, any>
  booking?: any[]
  competition?: Record<string, any>
  goal?: any[]
  group?: string
  home_team?: Record<string, any>
  id?: number
  last_updated?: string
  matchday?: number
  odd?: Record<string, any>
  referee?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  stage?: string
  status?: string
  substitution?: any[]
  utc_date?: string
  venue?: string
}

export interface MatchLoadMatch {
  id: number
}

export interface MatchListMatch {
  area?: Record<string, any>
  away_team?: Record<string, any>
  booking?: any[]
  competition?: Record<string, any>
  goal?: any[]
  group?: string
  home_team?: Record<string, any>
  id?: number
  last_updated?: string
  matchday?: number
  odd?: Record<string, any>
  referee?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  stage?: string
  status?: string
  substitution?: any[]
  utc_date?: string
  venue?: string
}

export interface Person {
  away_team?: Record<string, any>
  competition?: Record<string, any>
  date_of_birth?: string
  first_name?: string
  group?: string
  home_team?: Record<string, any>
  id?: number
  last_name?: string
  last_updated?: string
  matchday?: number
  name?: string
  nationality?: string
  position?: string
  score?: Record<string, any>
  season?: Record<string, any>
  section?: string
  shirt_number?: number
  stage?: string
  status?: string
  utc_date?: string
}

export interface PersonLoadMatch {
  id: number
}

export interface PersonListMatch {
  id: number
}

export interface Team {
  address?: string
  area?: Record<string, any>
  away_team?: Record<string, any>
  club_color?: string
  coach?: Record<string, any>
  competition?: Record<string, any>
  crest?: string
  founded?: number
  group?: string
  home_team?: Record<string, any>
  id?: number
  last_updated?: string
  matchday?: number
  name?: string
  running_competition?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  short_name?: string
  squad?: any[]
  staff?: any[]
  stage?: string
  status?: string
  tla?: string
  utc_date?: string
  venue?: string
  website?: string
}

export interface TeamLoadMatch {
  id: number
}

export interface TeamListMatch {
  address?: string
  area?: Record<string, any>
  away_team?: Record<string, any>
  club_color?: string
  coach?: Record<string, any>
  competition?: Record<string, any>
  crest?: string
  founded?: number
  group?: string
  home_team?: Record<string, any>
  id?: number
  last_updated?: string
  matchday?: number
  name?: string
  running_competition?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  short_name?: string
  squad?: any[]
  staff?: any[]
  stage?: string
  status?: string
  tla?: string
  utc_date?: string
  venue?: string
  website?: string
}

