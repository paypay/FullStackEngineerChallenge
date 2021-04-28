import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  photoUrl: string;

  @Column()
  rating: number;

  @Column()
  description: string;

  @Column()
  role: 'admin' | 'employee';

  @Column()
  reviews: string;
}
