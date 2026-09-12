import { FootballDataEntityBase } from '../FootballDataEntityBase';
import type { FootballDataSDK } from '../FootballDataSDK';
import type { Control } from '../types';
import type { Person, PersonLoadMatch, PersonListMatch } from '../FootballDataTypes';
declare class PersonEntity extends FootballDataEntityBase<Person> {
    constructor(client: FootballDataSDK, entopts: any);
    make(this: PersonEntity): PersonEntity;
    load(this: any, reqmatch?: PersonLoadMatch, ctrl?: Control): Promise<PersonEntity>;
    list(this: any, reqmatch?: PersonListMatch, ctrl?: Control): Promise<PersonEntity[]>;
}
export { PersonEntity };
