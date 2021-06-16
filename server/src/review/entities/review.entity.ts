import { Department } from 'src/shared/department';
import { Employee } from './../../employee/entities/employee.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'performanceReview' })
export class Review extends BaseEntity{

  @Column()
  public reviewQuestion: string;

  @Column({
    type: 'enum',
    default: Department.ALL,
    enum:Department
  })
  public designation: Department;

  @Column({
    type: 'enum',
    default: Department.ALL,
    enum:Department
  })
  public reviewer: Department;
  
}
