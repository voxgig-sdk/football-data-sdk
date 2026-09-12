import { FootballDataEntityBase } from '../FootballDataEntityBase';
import type { FootballDataSDK } from '../FootballDataSDK';
import type { Control } from '../types';
import type { Competition, CompetitionLoadMatch, CompetitionListMatch } from '../FootballDataTypes';
declare class CompetitionEntity extends FootballDataEntityBase<Competition> {
    constructor(client: FootballDataSDK, entopts: any);
    make(this: CompetitionEntity): CompetitionEntity;
    load(this: any, reqmatch?: CompetitionLoadMatch, ctrl?: Control): Promise<CompetitionEntity>;
    list(this: any, reqmatch?: CompetitionListMatch, ctrl?: Control): Promise<CompetitionEntity[]>;
}
export { CompetitionEntity };
