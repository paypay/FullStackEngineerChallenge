import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EmployeeEntity } from '../employee/employee.entity';

export type ReviewType = {
  content: string;
  rating: number;
  id: string;
};

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public content: string;

  @Column('int')
  public rating: number;

  @Column('text', { nullable: true })
  ownerId?: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.reviewers, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  public owner: EmployeeEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.reviews, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  public employee: EmployeeEntity;
}
