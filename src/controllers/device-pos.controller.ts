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
import {DevicePos, Journey} from '../models';
import {DevicePosRepository} from '../repositories';
import {JourneyRepository} from '../repositories';


export class DevicePosController {
  constructor(
    @repository(DevicePosRepository)
    public devicePosRepository : DevicePosRepository,
    @repository(JourneyRepository)
    public journeyRepository:JourneyRepository,
  ) {}

  @post('/device-pos', {
    responses: {
      '200': {
        description: 'DevicePos model instance',
        content: {'application/json': {schema: {'x-ts-type': DevicePos}}},
      },
    },
  })
  async create(@requestBody() devicePos: DevicePos): Promise<Journey[]> {
    //return await this.devicePosRepository.create(devicePos);
    console.log("devicePos : ")
    console.log(devicePos)
    let devicePosition = await this.devicePosRepository.create(devicePos);
    console.log(devicePosition);
    return await this.journeyRepository.find({order: ['timestamp DESC'], limit: 1})
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
    @param.query.object('filter', getFilterSchemaFor(DevicePos)) filter?: Filter<DevicePos>,
  ): Promise<DevicePos[]> {
    console.log("filter")
    console.log(filter)
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

  @get('/device-pos-details', {
    responses: {
      '200': {
        description: 'DevicePos model instance',
        content: {'application/json': {schema: {'x-ts-type': DevicePos}}},
      },
    },
  })
  async createNewDPos(@param.query.number('lat') lat: number,@param.query.number('long') long: number,
                      @param.query.number('direction') direction: number, @param.query.number('sat') sat: number,
                      @param.query.number('speed') speed: number, @param.query.string('mode') mode: string): Promise<String> {
    //return await this.devicePosRepository.create(devicePos);
    console.log("devicePos : ")
    let devicePos={"lat":lat,"long":long,"direction":direction,"sat":sat,"speed":speed,"mode":mode}
    let devicePosition = await this.devicePosRepository.create(devicePos);
    console.log(devicePosition);
    let latestJourney = await this.journeyRepository.find({order: ['timestamp DESC'], limit: 1})
    console.log("printing values")
    const stringed = JSON.stringify(latestJourney);
    const latestJourneyString = stringed.split(",")
    console.log(latestJourneyString)
    let dlatObject = latestJourneyString[2].split(":")
    let dlat=dlatObject[1]
    let dlongObject = latestJourneyString[3].split(":")
    let dlong=dlongObject[1]
    let dmodeObject = latestJourneyString[4].split(":")
    let dmode=dmodeObject[1]
    let dCommandObject = latestJourneyString[5].split(":")
    let dCommand=dCommandObject[1].toUpperCase()


    console.log(dlat)
    console.log(dlong)
    console.log(dmode)
    console.log(dCommand)
    let stringResp = dlat+','+dlong+','+dmode.charAt(1)+','+dCommand.charAt(1)
    console.log(stringResp)
    return stringResp
    //return latestJourney
    //return await this.journeyRepository.find({order: ['timestamp DESC'], limit: 1})
  }
}
