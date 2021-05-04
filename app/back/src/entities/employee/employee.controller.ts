import { EntityController, OnRequest } from '@fastify-resty/core';
import { FastifyRequest } from 'fastify';
import { EmployeeEntity } from './employee.entity';
import EmployeeService from './employee.service';

@EntityController(EmployeeEntity, '/employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // @GET('/with-reviews')
  // async func(request: FastifyRequest) {
  //   const employed = await this.employeeRep.find({ relations: ['reviews'] });

  //   console.log(employed);
  // }

  @OnRequest
  async onRequests(request: FastifyRequest) {
    console.log(request.body);
  }
}
