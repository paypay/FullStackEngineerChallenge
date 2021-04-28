import { EntityController, OnRequest } from '@fastify-resty/core';
import { FastifyRequest } from 'fastify';
import { EmployeeEntity } from './employee.entity';
import EmployeeService from './employee.service';

@EntityController(EmployeeEntity, '/employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @OnRequest
  async onRequests(request: FastifyRequest) {
    console.log(request);
    console.log(request.body);
  }
}
