import { AreaEntity } from './entity/AreaEntity';
import { CompetitionEntity } from './entity/CompetitionEntity';
import { MatchEntity } from './entity/MatchEntity';
import { PersonEntity } from './entity/PersonEntity';
import { TeamEntity } from './entity/TeamEntity';
export type * from './FootballDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FootballDataEntityBase } from './FootballDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class FootballDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Area(entopts?: Record<string, any>): AreaEntity;
    Competition(entopts?: Record<string, any>): CompetitionEntity;
    Match(entopts?: Record<string, any>): MatchEntity;
    Person(entopts?: Record<string, any>): PersonEntity;
    Team(entopts?: Record<string, any>): TeamEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FootballDataSDK;
    tester(testopts?: any, sdkopts?: any): FootballDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FootballDataSDK;
export { stdutil, config, BaseFeature, FootballDataEntityBase, FootballDataSDK, SDK, };
