import { Review } from './../../review/entities/review.entity';
import { Department } from './../../shared/department';
import { Column, OneToMany, BeforeInsert, Entity } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'employee' })
export class Employee extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Department,
    default: Department.STAFF,
  })
  public designation: Department;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public refreshToken?: string;

  @Column({ nullable: false })
  public isEmailVerified: boolean;

  @OneToMany(() => Review, (review: Review) => review.id)
  public performanceReviews: Review[];

  // @OneToMany(() => ProcessEntity, (process: ProcessEntity) => process.id)
  // public processes: ProcessEntity[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  // async validatePassword(password: string): Promise<boolean> {
  //   return await bcrypt.compare(password, this.password);
  // }
}
