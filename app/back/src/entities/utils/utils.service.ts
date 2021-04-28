import { IBaseModel, Model, Service } from '@fastify-resty/core';
import faker from 'faker';
import { EmployeeEntity } from '../employee/employee.entity';

type ReviewListType = {
  content: string;
  employeeId: string;
}[];

/*
 * Simple injectable service provided some logical functionality
 */
@Service()
export default class UtilsService {
  @Model(EmployeeEntity)
  employeeModel: IBaseModel<EmployeeEntity>;

  generateEmployee(): EmployeeEntity {
    const emplId = faker.datatype.uuid();

    const reviewsArr: ReviewListType = [
      {
        content: faker.lorem.paragraphs(faker.datatype.number(5)),
        employeeId: emplId
      },
      {
        content: faker.lorem.paragraphs(faker.datatype.number(5)),
        employeeId: emplId
      },
      {
        content: faker.lorem.paragraphs(faker.datatype.number(5)),
        employeeId: emplId
      }
    ];

    const str = JSON.stringify(reviewsArr);

    return {
      id: emplId,
      rating: faker.datatype.number(5),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      photoUrl: 'https://picsum.photos/seed/picsum/230/250',
      description: faker.lorem.paragraph(),
      reviews: str,
      role: 'employee'
    };
  }
}
