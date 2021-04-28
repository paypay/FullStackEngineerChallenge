import { IBaseModel, Model, Service } from '@fastify-resty/core';
import { EmployeeEntity } from './employee.entity';

/*
 * Service with logic functionality using injectable PostModel to work with
 * database stored data
 */
@Service()
export default class EmployeeService {
  @Model(EmployeeEntity)
  employeeModel: IBaseModel<EmployeeEntity>;

  async getRandomNumber(min: number, max: number): Promise<number> {
    return Math.round(Math.random() * (max - min) + min);
  }

  async getRandomPost() {
    console.log(this.employeeModel);
    const postsTotal = await this.employeeModel.total();
    const posts = await this.employeeModel.find({ $limit: postsTotal });
    const randomNumb = await this.getRandomNumber(0, postsTotal - 1);

    return posts[randomNumb];
  }
}
