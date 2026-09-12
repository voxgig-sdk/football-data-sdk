import { FootballDataEntityBase } from '../FootballDataEntityBase';
import type { FootballDataSDK } from '../FootballDataSDK';
import type { Control } from '../types';
import type { Area, AreaLoadMatch, AreaListMatch } from '../FootballDataTypes';
declare class AreaEntity extends FootballDataEntityBase<Area> {
    constructor(client: FootballDataSDK, entopts: any);
    make(this: AreaEntity): AreaEntity;
    load(this: any, reqmatch?: AreaLoadMatch, ctrl?: Control): Promise<AreaEntity>;
    list(this: any, reqmatch?: AreaListMatch, ctrl?: Control): Promise<AreaEntity[]>;
}
export { AreaEntity };
