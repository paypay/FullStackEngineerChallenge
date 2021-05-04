import {
  Controller,
  DELETE,
  GET,
  IBaseModel,
  Model
} from '@fastify-resty/core';
import faker from 'faker';
import { FastifyRequest } from 'fastify';
import { getConnection, getRepository } from 'typeorm';
import { apiVersionPrefix } from '../../constants';
import { EmployeeEntity } from '../employee/employee.entity';
import { ReviewEntity } from '../review/review.entity';
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
@Controller(`${apiVersionPrefix}/utils`)
export default class UtilsController {
  @Model(EmployeeEntity)
  employeeEntity: IBaseModel<EmployeeEntity>;
  @Model(ReviewEntity)
  reviewEntity: IBaseModel<ReviewEntity>;

  constructor(private _UtilsService: UtilsService) {}

  @GET('/generate', { schema: getPostSchema })
  async getEmployees(
    request: FastifyRequest<{ Querystring: { numb?: number } }>
  ) {
    const count = request.query.numb;

    if (count) {
      const employees: EmployeeEntity[] = [];

      for (let i = 0; i < count; i++)
        employees.push(this._UtilsService.generateEmployee());

      const staticEmployees: EmployeeEntity[] = [
        {
          department: 'Admin',
          name: 'Irving Armenta',
          password: 'admin1234',
          photoUrl: 'https://picsum.photos/id/0/230/250',
          id: faker.datatype.uuid(),
          rating: 5,
          email: 'irving.armenta@gmail.com',
          reviewers: [],
          reviews: []
        },
        {
          department: 'Regular',
          name: 'Regular Joe',
          password: 'regular1234',
          photoUrl: `https://picsum.photos/id/${faker.datatype.number({
            min: 1,
            max: 1400
          })}/230/250`,
          id: faker.datatype.uuid(),
          rating: 2,
          email: 'regular.joe@gmail.com',
          reviewers: [],
          reviews: []
        }
      ];

      const mergedEmployees = [...employees, ...staticEmployees];

      this.employeeEntity.create(mergedEmployees);

      const f = this._UtilsService.assignReviews(employees);
      const f2: ReviewEntity[] = [].concat(...f);

      await this.reviewEntity.create(f2);

      const withReviews = await getRepository(EmployeeEntity).find({
        relations: ['reviews']
      });

      return { total: count, data: withReviews };
    }

    return this._UtilsService.generateEmployee();
  }

  @DELETE('/clear', { schema: getPostSchema })
  async deleteAll() {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getRepository(entity.name);
      await repository.delete({});
    }

    return 'Everything cleared...';
  }
}
