import { Entity } from '@loopback/repository';
export declare class Journey extends Entity {
    id: number;
    timestamp: string;
    destinationLat?: number;
    destinationLong?: number;
    mode?: string;
    command?: string;
    [prop: string]: any;
    constructor(data?: Partial<Journey>);
}
