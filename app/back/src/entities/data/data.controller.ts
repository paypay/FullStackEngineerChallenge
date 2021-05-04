import {
  Controller,
  DELETE,
  GET,
  IBaseModel,
  Model
} from '@fastify-resty/core';
import faker from 'faker';
import { FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { apiVersionPrefix } from '../../constants';
import { EmployeeEntity } from '../employee/employee.entity';
import { ReviewEntity } from '../review/review.entity';

const delayOperation = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

type PaginatedAssetsQueryType = {
  Querystring: {
    page?: number;
    perPage?: number;
    delay?: number;
    onlyIds?: boolean;
  };
  Params: {
    name?: string;
    role?: 'admin' | 'regular';
    id: string;
  };
};

/*
 * Custom controller without data routes generation.
 * Uses logic of UtilsService injected with DI
 */
@Controller(`${apiVersionPrefix}/data`)
export default class DataController {
  @Model(EmployeeEntity)
  employeeEntity: IBaseModel<EmployeeEntity>;
  perPageDefault = 6;
  pageDefault = 1;

  /**
   *
   * Get all the employes in the database
   */
  @GET('/employees')
  async getEmployees(request: FastifyRequest<PaginatedAssetsQueryType>) {
    const { page, perPage, delay, onlyIds } = request.query;

    const cPage = Number(page) || this.pageDefault;
    const dPerPage = Number(perPage) || this.perPageDefault;

    let employees: string[] | EmployeeEntity[];

    employees = await getRepository(EmployeeEntity).find({
      relations: ['reviews']
    });

    if (onlyIds) {
      employees = await getRepository(EmployeeEntity).find({ select: ['id'] });
    }

    const offset = (cPage - 1) * dPerPage;
    const paginatedItems = employees.slice(offset).slice(0, dPerPage);
    const totalPages = Math.ceil(employees.length / dPerPage);

    if (delay) {
      await delayOperation(delay);
    }

    return {
      page: cPage,
      perPage: dPerPage,
      prePage: cPage - 1 ? cPage - 1 : null,
      nextPage: totalPages > cPage ? cPage + 1 : null,
      total: employees.length,
      totalPages,
      data: paginatedItems
    };
  }

  @GET('/employees/:id')
  async getEmployeesWithId(request: FastifyRequest<PaginatedAssetsQueryType>) {
    const { delay } = request.query;
    const { id } = request.params;

    const employee = await getRepository(EmployeeEntity).findOne({ id });

    if (delay) {
      await delayOperation(delay);
    }

    if (!employee) {
      return { data: 'not found!' };
    }

    return { data: employee };
  }

  @DELETE('/employees/:id')
  async deleteEmployeeWithId(
    request: FastifyRequest<PaginatedAssetsQueryType>
  ) {
    const { delay } = request.query;
    const { id } = request.params;
    const employee = await getRepository(EmployeeEntity).findOne({ id });

    if (delay) {
      await delayOperation(delay);
    }

    if (!employee) {
      return { data: 'not found!' };
    }

    return { data: employee };
  }

  @GET('/reviews')
  async getReviews(request: FastifyRequest<PaginatedAssetsQueryType>) {
    const { page, perPage, delay } = request.query;

    const cPage = Number(page) || this.pageDefault;
    const dPerPage = Number(perPage) || this.perPageDefault;

    const reviews = await getRepository(ReviewEntity).find({
      relations: ['owner']
    });

    const offset = (cPage - 1) * dPerPage;
    const paginatedItems = reviews.slice(offset).slice(0, dPerPage);
    const totalPages = Math.ceil(reviews.length / dPerPage);

    if (delay) {
      await delayOperation(delay);
    }

    return {
      page: cPage,
      perPage: dPerPage,
      prePage: cPage - 1 ? cPage - 1 : null,
      nextPage: totalPages > cPage ? cPage + 1 : null,
      total: reviews.length,
      totalPages,
      data: paginatedItems
    };
  }
}
