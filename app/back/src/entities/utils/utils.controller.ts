import {
  Controller,
  DELETE,
  GET,
  IBaseModel,
  Model
} from '@fastify-resty/core';
import { FastifyRequest } from 'fastify';
import { EmployeeEntity } from '../employee/employee.entity';
import UtilsService from './utils.service';

const getPostSchema = {
  querystring: {
    numb: { type: 'number' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        total: { type: 'number' },
        description: { type: 'string' },
        content: { type: 'string' },
        title: { type: 'string' }
      }
    }
  }
};

/*
 * Custom controller without data routes generation.
 * Uses logic of UtilsService injected with DI
 */
@Controller('/utils')
export default class GeneratorController {
  @Model(EmployeeEntity)
  employeeEntity: IBaseModel<EmployeeEntity>;

  constructor(private _UtilsService: UtilsService) {}

  @GET('/generate/employees', { schema: getPostSchema })
  async getEmployees(
    request: FastifyRequest<{ Querystring: { numb?: number } }>
  ) {
    const count = request.query.numb;

    if (count) {
      const employees = [];
      for (let i = 0; i < count; i++)
        employees.push(this._UtilsService.generateEmployee());

      this.employeeEntity.create(employees);
      return { total: count, data: employees };
    }

    return this._UtilsService.generateEmployee();
  }

  @DELETE('/clear/employees', { schema: getPostSchema })
  async deletePosts() {
    const getEmployeesN = await this.employeeEntity.total();
    const allEmployees = await this.employeeEntity.find({
      $limit: getEmployeesN
    });

    allEmployees.forEach((employee) => {
      this.employeeEntity.remove({ id: employee.id });
    });

    return { total: getEmployeesN, data: allEmployees };
  }
}
