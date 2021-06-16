import { EmployeeModule } from './../employee/employee.module';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
