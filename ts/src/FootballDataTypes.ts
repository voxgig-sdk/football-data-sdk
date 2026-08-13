// Typed models for the FootballData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Area {
  childAreas?: any[]
  countryCode?: string
  flag?: string
  id?: number
  name?: string
  parentArea?: string
  parentAreaId?: number
}

export interface AreaLoadMatch {
  id: number
}

export interface AreaListMatch {
  childAreas?: any[]
  countryCode?: string
  flag?: string
  id?: number
  name?: string
  parentArea?: string
  parentAreaId?: number
}

export interface Competition {
  address?: string
  area?: Record<string, any>
  assists?: number
  awayTeam?: Record<string, any>
  clubColors?: string
  code?: string
  competition?: Record<string, any>
  crest?: string
  currentSeason?: Record<string, any>
  emblem?: string
  founded?: number
  goals?: number
  group?: string
  homeTeam?: Record<string, any>
  id?: number
  lastUpdated?: string
  matchday?: number
  name?: string
  numberOfAvailableSeasons?: number
  penalties?: number
  player?: Record<string, any>
  score?: Record<string, any>
  season?: Record<string, any>
  shortName?: string
  stage?: string
  status?: string
  table?: any[]
  team?: Record<string, any>
  tla?: string
  type?: string
  utcDate?: string
  venue?: string
  website?: string
}

export interface CompetitionLoadMatch {
  id: string
}

export interface CompetitionListMatch {
  address?: string
  area?: Record<string, any>
  assists?: number
  awayTeam?: Record<string, any>
  clubColors?: string
  code?: string
  competition?: Record<string, any>
  crest?: string
  currentSeason?: Record<string, any>
  emblem?: string
  founded?: number
  goals?: number
  group?: string
  homeTeam?: Record<string, any>
  id?: number
  lastUpdated?: string
  matchday?: number
  name?: string
  numberOfAvailableSeasons?: number
  penalties?: number
  player?: Record<string, any>
  score?: Record<string, any>
  season?: Record<string, any>
  shortName?: string
  stage?: string
  status?: string
  table?: any[]
  team?: Record<string, any>
  tla?: string
  type?: string
  utcDate?: string
  venue?: string
  website?: string

  // Selects a custom action instead of the plain list:
  //   'match' | 'scorer' | 'standing' | 'team'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Match {
  area?: Record<string, any>
  awayTeam?: Record<string, any>
  bookings?: any[]
  competition?: Record<string, any>
  goals?: any[]
  group?: string
  homeTeam?: Record<string, any>
  id?: number
  lastUpdated?: string
  matchday?: number
  odds?: Record<string, any>
  referees?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  stage?: string
  status?: string
  substitutions?: any[]
  utcDate?: string
  venue?: string
}

export interface MatchLoadMatch {
  id: number
}

export interface MatchListMatch {
  area?: Record<string, any>
  awayTeam?: Record<string, any>
  bookings?: any[]
  competition?: Record<string, any>
  goals?: any[]
  group?: string
  homeTeam?: Record<string, any>
  id?: number
  lastUpdated?: string
  matchday?: number
  odds?: Record<string, any>
  referees?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  stage?: string
  status?: string
  substitutions?: any[]
  utcDate?: string
  venue?: string
}

export interface Person {
  awayTeam?: Record<string, any>
  competition?: Record<string, any>
  dateOfBirth?: string
  firstName?: string
  group?: string
  homeTeam?: Record<string, any>
  id?: number
  lastName?: string
  lastUpdated?: string
  matchday?: number
  name?: string
  nationality?: string
  position?: string
  score?: Record<string, any>
  season?: Record<string, any>
  section?: string
  shirtNumber?: number
  stage?: string
  status?: string
  utcDate?: string
}

export interface PersonLoadMatch {
  id: number
}

export interface PersonListMatch {
  id: number

  // Selects a custom action instead of the plain list:
  //   'match'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Team {
  address?: string
  area?: Record<string, any>
  awayTeam?: Record<string, any>
  clubColors?: string
  coach?: Record<string, any>
  competition?: Record<string, any>
  crest?: string
  founded?: number
  group?: string
  homeTeam?: Record<string, any>
  id?: number
  lastUpdated?: string
  matchday?: number
  name?: string
  runningCompetitions?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  shortName?: string
  squad?: any[]
  staff?: any[]
  stage?: string
  status?: string
  tla?: string
  utcDate?: string
  venue?: string
  website?: string
}

export interface TeamLoadMatch {
  id: number
}

export interface TeamListMatch {
  address?: string
  area?: Record<string, any>
  awayTeam?: Record<string, any>
  clubColors?: string
  coach?: Record<string, any>
  competition?: Record<string, any>
  crest?: string
  founded?: number
  group?: string
  homeTeam?: Record<string, any>
  id?: number
  lastUpdated?: string
  matchday?: number
  name?: string
  runningCompetitions?: any[]
  score?: Record<string, any>
  season?: Record<string, any>
  shortName?: string
  squad?: any[]
  staff?: any[]
  stage?: string
  status?: string
  tla?: string
  utcDate?: string
  venue?: string
  website?: string

  // Selects a custom action instead of the plain list:
  //   'match'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

