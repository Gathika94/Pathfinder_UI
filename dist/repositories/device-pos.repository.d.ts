import { DefaultCrudRepository } from '@loopback/repository';
import { DevicePos } from '../models';
import { DbDataSource } from '../datasources';
export declare class DevicePosRepository extends DefaultCrudRepository<DevicePos, typeof DevicePos.prototype.id> {
    constructor(dataSource: DbDataSource);
}
