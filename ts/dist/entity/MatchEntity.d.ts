import { FootballDataEntityBase } from '../FootballDataEntityBase';
import type { FootballDataSDK } from '../FootballDataSDK';
import type { Control } from '../types';
import type { Match, MatchLoadMatch, MatchListMatch } from '../FootballDataTypes';
declare class MatchEntity extends FootballDataEntityBase<Match> {
    constructor(client: FootballDataSDK, entopts: any);
    make(this: MatchEntity): MatchEntity;
    load(this: any, reqmatch?: MatchLoadMatch, ctrl?: Control): Promise<MatchEntity>;
    list(this: any, reqmatch?: MatchListMatch, ctrl?: Control): Promise<MatchEntity[]>;
}
export { MatchEntity };
