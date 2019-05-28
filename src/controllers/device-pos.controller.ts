import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {DevicePos} from '../models';
import {DevicePosRepository} from '../repositories';

export class DevicePosController {
  constructor(
    @repository(DevicePosRepository)
    public devicePosRepository : DevicePosRepository,
  ) {}

  @post('/device-pos', {
    responses: {
      '200': {
        description: 'DevicePos model instance',
        content: {'application/json': {schema: {'x-ts-type': DevicePos}}},
      },
    },
  })
  async create(@requestBody() devicePos: DevicePos): Promise<DevicePos> {
    return await this.devicePosRepository.create(devicePos);
  }

  @get('/device-pos/count', {
    responses: {
      '200': {
        description: 'DevicePos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DevicePos)) where?: Where,
  ): Promise<Count> {
    return await this.devicePosRepository.count(where);
  }

  @get('/device-pos', {
    responses: {
      '200': {
        description: 'Array of DevicePos model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': DevicePos}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DevicePos)) filter?: Filter,
  ): Promise<DevicePos[]> {
    return await this.devicePosRepository.find(filter);
  }

  @patch('/device-pos', {
    responses: {
      '200': {
        description: 'DevicePos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() devicePos: DevicePos,
    @param.query.object('where', getWhereSchemaFor(DevicePos)) where?: Where,
  ): Promise<Count> {
    return await this.devicePosRepository.updateAll(devicePos, where);
  }

  @get('/device-pos/{id}', {
    responses: {
      '200': {
        description: 'DevicePos model instance',
        content: {'application/json': {schema: {'x-ts-type': DevicePos}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DevicePos> {
    return await this.devicePosRepository.findById(id);
  }

  @patch('/device-pos/{id}', {
    responses: {
      '204': {
        description: 'DevicePos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() devicePos: DevicePos,
  ): Promise<void> {
    await this.devicePosRepository.updateById(id, devicePos);
  }

  @put('/device-pos/{id}', {
    responses: {
      '204': {
        description: 'DevicePos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() devicePos: DevicePos,
  ): Promise<void> {
    await this.devicePosRepository.replaceById(id, devicePos);
  }

  @del('/device-pos/{id}', {
    responses: {
      '204': {
        description: 'DevicePos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.devicePosRepository.deleteById(id);
  }
}
