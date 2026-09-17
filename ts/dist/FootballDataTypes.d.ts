export interface Area {
    childAreas?: any[];
    countryCode?: string;
    flag?: string;
    id?: number;
    name?: string;
    parentArea?: string;
    parentAreaId?: number;
}
export interface AreaLoadMatch {
    id: number;
}
export interface AreaListMatch {
    childAreas?: any[];
    countryCode?: string;
    flag?: string;
    id?: number;
    name?: string;
    parentArea?: string;
    parentAreaId?: number;
}
export interface Competition {
    area?: Record<string, any>;
    code?: string;
    currentSeason?: Record<string, any>;
    emblem?: string;
    id?: number;
    lastUpdated?: string;
    name?: string;
    numberOfAvailableSeasons?: number;
    type?: string;
}
export interface CompetitionLoadMatch {
    id: string;
}
export interface CompetitionListMatch {
    area?: string;
    $action?: string;
    [action: string]: any;
}
export interface Match {
    area?: Record<string, any>;
    awayTeam?: Record<string, any>;
    bookings?: any[];
    competition?: Record<string, any>;
    goals?: any[];
    group?: string;
    homeTeam?: Record<string, any>;
    id?: number;
    lastUpdated?: string;
    matchday?: number;
    odds?: Record<string, any>;
    referees?: any[];
    score?: Record<string, any>;
    season?: Record<string, any>;
    stage?: string;
    status?: string;
    substitutions?: any[];
    utcDate?: string;
    venue?: string;
}
export interface MatchLoadMatch {
    id: number;
}
export interface MatchListMatch {
    competition?: string;
    date_from?: string;
    date_to?: string;
    status?: string;
}
export interface Person {
    dateOfBirth?: string;
    firstName?: string;
    id?: number;
    lastName?: string;
    lastUpdated?: string;
    name?: string;
    nationality?: string;
    position?: string;
    section?: string;
    shirtNumber?: number;
}
export interface PersonLoadMatch {
    id: number;
}
export interface PersonListMatch {
    id: number;
    competition?: string;
    date_from?: string;
    date_to?: string;
    limit?: number;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface Team {
    address?: string;
    area?: Record<string, any>;
    clubColors?: string;
    coach?: Record<string, any>;
    crest?: string;
    founded?: number;
    id?: number;
    lastUpdated?: string;
    name?: string;
    runningCompetitions?: any[];
    shortName?: string;
    squad?: any[];
    staff?: any[];
    tla?: string;
    venue?: string;
    website?: string;
}
export interface TeamLoadMatch {
    id: number;
}
export interface TeamListMatch {
    limit?: number;
    offset?: number;
    $action?: string;
    [action: string]: any;
}
