import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable
} from 'typeorm';
import { ReviewEntity } from '../review/review.entity';

export type ReviewType = {
  content: string;
  rating: number;
  id: string;
};

@Entity()
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public photoUrl: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column('int')
  public rating: number;

  @Column()
  public department: string;

  @OneToMany(() => ReviewEntity, (review) => review.owner, {
    nullable: true
  })
  public reviewers: EmployeeEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.employee, {
    nullable: true
  })
  @JoinTable()
  public reviews: ReviewEntity[];
}
