import { Employee } from './../../employee/entities/employee.entity';
import { Review } from './../../review/entities/review.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum } from "class-validator";
import { Department } from "src/shared/department";

export class CreateFeedbackDto implements Readonly<CreateFeedbackDto> {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Performance Review Question Id',
  })
  review: Review;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Employee review employeeId',
  })
  employeeReviewed: Employee;
  

  @IsNotEmpty()
  @ApiProperty({
    description: 'Feedback based on the review question',
  })
  feedback: string;


  @IsNotEmpty()
  @ApiProperty({
    description: 'Reviewer Employee Id',
  })
  reviewer: Employee;
}
