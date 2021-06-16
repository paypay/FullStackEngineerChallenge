import { Department } from 'src/shared/department';
import { Employee } from './../../employee/entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty
} from 'class-validator';

export class CreateReviewDto implements Readonly<CreateReviewDto> {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Performance Review Question',
  })
  reviewQuestion: string;

  @IsNotEmpty()
  @IsEnum(Department)
  @ApiProperty({
    description: 'The category of employee that the review question applies to',
    enum: Department,
    default: Department.ALL,
  })
  designation: Department;

  @IsNotEmpty()
  @IsEnum(Department)
  @ApiProperty({
    description: 'The category of employee that the review question applies to',
    enum: Department,
    default: Department.ALL,
  })
  reviewer: Department;

  
}
