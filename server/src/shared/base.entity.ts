import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  updatedBy: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  Comment: string;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedDate = new Date();
  }
}
