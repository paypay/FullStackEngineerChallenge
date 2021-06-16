import { EmployeeService } from './../employee/employee.service';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  forwardRef,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly performanceReviewRepository: Repository<Review>,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}
  public async create(createReviewDto: CreateReviewDto) {
    const newReview = this.performanceReviewRepository.create(createReviewDto);

    return await this.performanceReviewRepository.save(newReview);
  }

  public async findAll() {
    return await this.performanceReviewRepository.find();
  }

  public async findOne(id: number) {
    return await this.performanceReviewRepository.findOne({ id });
  }

  public async update(id: number, updateReviewDto: UpdateReviewDto) {
    await this.performanceReviewRepository.update({ id }, updateReviewDto);
    return await this.performanceReviewRepository.findOne({ id });
  }

  public async remove(id: number) {
    await this.performanceReviewRepository.update({ id }, { isDeleted: true });
    return await this.performanceReviewRepository.findOne({ id });
  }
}
