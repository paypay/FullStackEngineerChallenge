import { Employee } from './../../employee/entities/employee.entity';
import { Review } from './../../review/entities/review.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'feedback' })
export class Feedback extends BaseEntity {
  @OneToOne(() => Review)
  @JoinColumn()
  public review: Review;

  @OneToOne(() => Employee)
  @JoinColumn()
  public employeeReviewed: Employee;

  @Column()
  public feedback: string;

  @OneToOne(() => Employee)
  @JoinColumn()
  public reviewer: Employee;
}
