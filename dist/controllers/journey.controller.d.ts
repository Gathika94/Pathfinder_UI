import { Count, Filter, Where } from '@loopback/repository';
import { Journey } from '../models';
import { JourneyRepository } from '../repositories';
export declare class JourneyController {
    journeyRepository: JourneyRepository;
    constructor(journeyRepository: JourneyRepository);
    create(journey: Journey): Promise<Journey>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter<Journey>): Promise<Journey[]>;
    updateAll(journey: Journey, where?: Where): Promise<Count>;
    findById(id: number): Promise<Journey>;
    updateById(id: number, journey: Journey): Promise<void>;
    replaceById(id: number, journey: Journey): Promise<void>;
    deleteById(id: number): Promise<void>;
}
