import {DefaultCrudRepository} from '@loopback/repository';
import {DevicePos} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DevicePosRepository extends DefaultCrudRepository<
  DevicePos,
  typeof DevicePos.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(DevicePos, dataSource);
  }
}
