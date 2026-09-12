import { FootballDataEntityBase } from '../FootballDataEntityBase';
import type { FootballDataSDK } from '../FootballDataSDK';
import type { Control } from '../types';
import type { Team, TeamLoadMatch, TeamListMatch } from '../FootballDataTypes';
declare class TeamEntity extends FootballDataEntityBase<Team> {
    constructor(client: FootballDataSDK, entopts: any);
    make(this: TeamEntity): TeamEntity;
    load(this: any, reqmatch?: TeamLoadMatch, ctrl?: Control): Promise<TeamEntity>;
    list(this: any, reqmatch?: TeamListMatch, ctrl?: Control): Promise<TeamEntity[]>;
}
export { TeamEntity };
