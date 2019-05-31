import {Entity, model, property} from '@loopback/repository';

@model({settings: {"strict":false}})
export class Journey extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
  })
  destination?: number;

  @property({
    type: 'number',
  })
  destinationLong?: number;

  @property({
    type: 'string',
  })
  mode?: string;

  @property({
    type: 'string',
  })
  command?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Journey>) {
    super(data);
  }
}
