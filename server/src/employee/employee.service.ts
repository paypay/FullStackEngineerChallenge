import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getConnection, getConnectionManager, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  //Create Employee
  public async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<CreateEmployeeDto> {
    const { email } = createEmployeeDto;
    createEmployeeDto['isEmailVerified'] = false;
    createEmployeeDto['password'] = 'PASSWORD';
    const errors = await validate(createEmployeeDto);
    if (errors.length > 0) {
      const _errors = { message: 'Employee input is not valid' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    }    const manager = getConnectionManager().get('employee-performance-backend');

    
    const queryBuilder = await manager
      .getRepository(Employee)
      .createQueryBuilder()
      .where('email = :email', { email });

    const user = await queryBuilder.getOne();
    if (user) {
      const errors = { email: 'Email must be unique' };
      console.log(errors);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = this.employeeRepository.create({
      ...createEmployeeDto,
    });
    return await this.employeeRepository.save(newUser);
  }

  public async findAll() {
    return await this.employeeRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number) {
    return this.employeeRepository.findOne({ id, isDeleted: false });
  }

  public async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    await this.employeeRepository.update({ id }, updateEmployeeDto);
    return await this.employeeRepository.findOne({ id });
  }

  public async remove(id: number) {
    await this.employeeRepository.update({ id }, { isDeleted: true });
    return await this.employeeRepository.findOne({ id });
  }
}
