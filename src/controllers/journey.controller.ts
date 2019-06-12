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
import {Journey} from '../models';
import {JourneyRepository} from '../repositories';

export class JourneyController {
  constructor(
    @repository(JourneyRepository)
    public journeyRepository : JourneyRepository,
  ) {}

  @post('/journeys', {
    responses: {
      '200': {
        description: 'Journey model instance',
        content: {'application/json': {schema: {'x-ts-type': Journey}}},
      },
    },
  })
  async create(@requestBody() journey: Journey): Promise<Journey> {
    return await this.journeyRepository.create(journey);
  }

  @get('/journeys/count', {
    responses: {
      '200': {
        description: 'Journey model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Journey)) where?: Where,
  ): Promise<Count> {
    return await this.journeyRepository.count(where);
  }

  @get('/journeys', {
    responses: {
      '200': {
        description: 'Array of Journey model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Journey}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Journey)) filter?: Filter<Journey>,
  ): Promise<Journey[]> {
    return await this.journeyRepository.find(filter);
  }

  @patch('/journeys', {
    responses: {
      '200': {
        description: 'Journey PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() journey: Journey,
    @param.query.object('where', getWhereSchemaFor(Journey)) where?: Where,
  ): Promise<Count> {
    return await this.journeyRepository.updateAll(journey, where);
  }

  @get('/journeys/{id}', {
    responses: {
      '200': {
        description: 'Journey model instance',
        content: {'application/json': {schema: {'x-ts-type': Journey}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Journey> {
    return await this.journeyRepository.findById(id);
  }

  @patch('/journeys/{id}', {
    responses: {
      '204': {
        description: 'Journey PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() journey: Journey,
  ): Promise<void> {
    await this.journeyRepository.updateById(id, journey);
  }

  @put('/journeys/{id}', {
    responses: {
      '204': {
        description: 'Journey PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() journey: Journey,
  ): Promise<void> {
    await this.journeyRepository.replaceById(id, journey);
  }

  @del('/journeys/{id}', {
    responses: {
      '204': {
        description: 'Journey DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.journeyRepository.deleteById(id);
  }
}
