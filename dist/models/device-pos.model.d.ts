import { Entity } from '@loopback/repository';
export declare class DevicePos extends Entity {
    id?: number;
    timestamp: string;
    lat: number;
    long: number;
    direction?: number;
    sat?: number;
    speed?: number;
    mode: string;
    constructor(data?: Partial<DevicePos>);
}
