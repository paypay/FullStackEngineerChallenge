import { Department } from './../../shared/department';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateEmployeeDto implements Readonly<CreateEmployeeDto> {
  @ApiProperty({
    enum: Department,
    enumName: 'Department',
    default: String(Department.STAFF),
  })
  @IsEnum(Department)
  designation: Department;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Firstname',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Lastname',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email example example@gmail.com',
  })
  email: string;


}
