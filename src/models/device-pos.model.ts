import {Entity, model, property} from '@loopback/repository';

@model()
export class DevicePos extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: false,
    default: "$now",
  })
  timestamp: string;

  @property({
    type: 'number',
    required: true,
  })
  lat: number;

  @property({
    type: 'number',
    required: true,
  })
  long: number;

  @property({
    type: 'number',
  })
  direction?: number;

  @property({
    type: 'number',
  })
  sat?: number;

  @property({
    type: 'number',
  })
  speed?: number;

  @property({
    type: 'string',
    required: true,
  })
  mode: string;


  constructor(data?: Partial<DevicePos>) {
    super(data);
  }
}
