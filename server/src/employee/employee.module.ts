import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
