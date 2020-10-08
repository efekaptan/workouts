
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { SearchWorkoutDto } from './dtos/search-workout.dto';
import { Workout } from './entities/workout.entity';
import { Sort } from './enums/sort.enum';

@Injectable()
export class WorkoutsService {
  private readonly PAGE_SIZE = 20;

  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>
  ) { }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    const workout = createWorkoutDto as Workout;
    return this.workoutsRepository.save(workout);
  }

  async findOne(id: number): Promise<Workout> {
    return this.workoutsRepository.findOne(id);
  }

  async findAll(searchWorkoutDto: SearchWorkoutDto): Promise<[Workout[], number]> {
    const { month, categories, pageIndex } = searchWorkoutDto;
    const skipCount = this.PAGE_SIZE * (pageIndex - 1);

    const queryBuilder = this.workoutsRepository.createQueryBuilder();
    this.filterByMonth(queryBuilder, month);
    this.filterByCategory(queryBuilder, categories);

    return queryBuilder
      .andWhere('startDate > :now', { now: new Date().toISOString() })
      .orderBy('startDate', Sort.Asc)
      .skip(skipCount)
      .take(this.PAGE_SIZE)
      .getManyAndCount();
  }

  private filterByMonth(queryBuilder: SelectQueryBuilder<Workout>, month?: number) {
    if (month) {
      const startOfMonth = moment().startOf('month').add(month, 'month').toISOString();
      const endOfMonth = moment().endOf('month').add(month, 'month').toISOString();
      queryBuilder.andWhere('startDate >= :startOfMonth AND startDate <= :endOfMonth', {
        startOfMonth,
        endOfMonth
      });
    }
  }

  private filterByCategory(queryBuilder: SelectQueryBuilder<Workout>, categories?: string[]) {
    if (categories && categories.length > 0) {
      queryBuilder.andWhere('category IN (:...categories)', {
        categories
      });
    }
  }
}