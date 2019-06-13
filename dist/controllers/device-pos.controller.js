"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const repositories_2 = require("../repositories");
let DevicePosController = class DevicePosController {
    constructor(devicePosRepository, journeyRepository) {
        this.devicePosRepository = devicePosRepository;
        this.journeyRepository = journeyRepository;
    }
    async create(devicePos) {
        //return await this.devicePosRepository.create(devicePos);
        let devicePosition = await this.devicePosRepository.create(devicePos);
        console.log(devicePosition);
        return await this.journeyRepository.find({ order: ['timestamp DESC'], limit: 1 });
    }
    async count(where) {
        return await this.devicePosRepository.count(where);
    }
    async find(filter) {
        console.log("filter");
        console.log(filter);
        return await this.devicePosRepository.find(filter);
    }
    async updateAll(devicePos, where) {
        return await this.devicePosRepository.updateAll(devicePos, where);
    }
    async findById(id) {
        return await this.devicePosRepository.findById(id);
    }
    async updateById(id, devicePos) {
        await this.devicePosRepository.updateById(id, devicePos);
    }
    async replaceById(id, devicePos) {
        await this.devicePosRepository.replaceById(id, devicePos);
    }
    async deleteById(id) {
        await this.devicePosRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/device-pos', {
        responses: {
            '200': {
                description: 'DevicePos model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.DevicePos } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.DevicePos]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "create", null);
__decorate([
    rest_1.get('/device-pos/count', {
        responses: {
            '200': {
                description: 'DevicePos model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DevicePos))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "count", null);
__decorate([
    rest_1.get('/device-pos', {
        responses: {
            '200': {
                description: 'Array of DevicePos model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.DevicePos } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.DevicePos))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "find", null);
__decorate([
    rest_1.patch('/device-pos', {
        responses: {
            '200': {
                description: 'DevicePos PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DevicePos))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.DevicePos, Object]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/device-pos/{id}', {
        responses: {
            '200': {
                description: 'DevicePos model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.DevicePos } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "findById", null);
__decorate([
    rest_1.patch('/device-pos/{id}', {
        responses: {
            '204': {
                description: 'DevicePos PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.DevicePos]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "updateById", null);
__decorate([
    rest_1.put('/device-pos/{id}', {
        responses: {
            '204': {
                description: 'DevicePos PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.DevicePos]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/device-pos/{id}', {
        responses: {
            '204': {
                description: 'DevicePos DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DevicePosController.prototype, "deleteById", null);
DevicePosController = __decorate([
    __param(0, repository_1.repository(repositories_1.DevicePosRepository)),
    __param(1, repository_1.repository(repositories_2.JourneyRepository)),
    __metadata("design:paramtypes", [repositories_1.DevicePosRepository,
        repositories_2.JourneyRepository])
], DevicePosController);
exports.DevicePosController = DevicePosController;
//# sourceMappingURL=device-pos.controller.js.map