import { Count, Filter, Where } from '@loopback/repository';
import { DevicePos, Journey } from '../models';
import { DevicePosRepository } from '../repositories';
import { JourneyRepository } from '../repositories';
export declare class DevicePosController {
    devicePosRepository: DevicePosRepository;
    journeyRepository: JourneyRepository;
    constructor(devicePosRepository: DevicePosRepository, journeyRepository: JourneyRepository);
    create(devicePos: DevicePos): Promise<Journey[]>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter<DevicePos>): Promise<DevicePos[]>;
    updateAll(devicePos: DevicePos, where?: Where): Promise<Count>;
    findById(id: number): Promise<DevicePos>;
    updateById(id: number, devicePos: DevicePos): Promise<void>;
    replaceById(id: number, devicePos: DevicePos): Promise<void>;
    deleteById(id: number): Promise<void>;
    createNewDPos(lat: number, long: number, direction: number, sat: number, speed: number, mode: string): Promise<Journey[]>;
}
