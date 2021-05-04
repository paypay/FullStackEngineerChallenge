import { IBaseModel, Model, Service } from '@fastify-resty/core';
import faker from 'faker';
import { EmployeeEntity } from '../employee/employee.entity';
import { ReviewEntity } from '../review/review.entity';

/*
 * Simple injectable service provided some logical functionality
 */
@Service()
export default class UtilsService {
  @Model(EmployeeEntity)
  employeeModel: IBaseModel<EmployeeEntity>;
  @Model(ReviewEntity)
  reviewModel: IBaseModel<ReviewEntity>;

  generateEmployee(): EmployeeEntity {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const emplId = faker.datatype.uuid();

    return {
      id: emplId,
      name: `${firstName} ${lastName}`,
      photoUrl: `https://picsum.photos/id/${faker.datatype.number({
        min: 1,
        max: 1400
      })}/230/250`,
      rating: faker.datatype.number({ min: 1, max: 5 }),
      department: faker.commerce.department(),
      password: 'regular1234',
      email: faker.internet.email(firstName, lastName),
      reviews: [],
      reviewers: []
    };
  }
  assignReviews(employees: EmployeeEntity[]) {
    const finalFake: ReviewEntity[][] = [];
    const fakeReviewGen = (
      employeeToAssign: EmployeeEntity,
      owner: EmployeeEntity
    ): ReviewEntity => {
      return {
        content: faker.lorem.paragraph(
          faker.datatype.number({ min: 1, max: 5 })
        ),
        id: faker.datatype.uuid(),
        rating: faker.datatype.number({ min: 1, max: 5 }),
        employee: employeeToAssign,
        owner
      };
    };

    // creating reviews and assigning them to the employees
    for (let i = 0; i < employees.length; i++) {
      const firstFilter = employees.filter((emp) => emp.id !== employees[i].id);
      const te: ReviewEntity[] = [];

      for (const empl of firstFilter) {
        if (faker.datatype.number({ max: 8, min: 0 }) === 1) {
          te.push(fakeReviewGen(employees[i], empl));
        }
      }

      finalFake.push(te);
    }

    return finalFake;
  }
}
