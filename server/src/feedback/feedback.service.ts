import { Feedback } from './entities/feedback.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbacRepository: Repository<Feedback>,
  ) {}
  public async create(createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbacRepository.create(createFeedbackDto);
  }

  public async findAll() {
    return await this.feedbacRepository.find();
  }

  public async findOne(id: number) {
    return await this.feedbacRepository.findOne({ id });
  }

  public async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return await this.feedbacRepository.update({ id }, updateFeedbackDto);
  }

  public async remove(id: number) {
    await this.feedbacRepository.update({ id }, { isDeleted: true });
    return await this.feedbacRepository.findOne({ id });
  }
}
