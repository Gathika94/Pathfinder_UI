import { DefaultCrudRepository } from '@loopback/repository';
import { Journey } from '../models';
import { DbDataSource } from '../datasources';
export declare class JourneyRepository extends DefaultCrudRepository<Journey, typeof Journey.prototype.id> {
    constructor(dataSource: DbDataSource);
}
