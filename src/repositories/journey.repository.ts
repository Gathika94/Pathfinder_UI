import {DefaultCrudRepository} from '@loopback/repository';
import {Journey} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class JourneyRepository extends DefaultCrudRepository<
  Journey,
  typeof Journey.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Journey, dataSource);
  }
}
