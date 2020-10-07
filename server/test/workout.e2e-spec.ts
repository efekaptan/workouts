import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsModule } from '../src/workouts/workouts.module';
import { Repository } from 'typeorm';
import { Workout } from '../src/workouts/entities/workout.entity';
import moment from 'moment';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Workout>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WorkoutsModule, TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db-e2e.sqlite',
        synchronize: true,
        autoLoadEntities: true,
        entities: [Workout],
        logging: false,
        dropSchema: true
      })],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    repository = module.get('WorkoutRepository');
  });

  describe('findOne', () => {

    afterAll(async () => {
      await repository.query("Delete from Workout");
    });

    const now = new Date().toISOString();
    const sampleWorkout = getWorkout(now);

    it('should find by id', () => {
      return request(app.getHttpServer()).post('/workouts').send(sampleWorkout)
        .then(() => {
          return request(app.getHttpServer())
            .get('/workouts/1')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual(sampleWorkout);
            });
        });
    });
  });

  describe('findAll', () => {

    describe("by month filter", () => {
      beforeAll(async () => {
        const dates = [
          moment().add(-1, 'day').toString(),
          moment().add(1, 'day').toString(),
          moment().add(1, 'month').toString(),
        ];
        await insertWorkoutsByDates(repository, dates);
      });

      afterAll(async () => {
        await repository.query("Delete from Workout");
      });

      it('should return all if not specified', () => {
        return request(app.getHttpServer())
          .get('/workouts?pageIndex=1')
          .expect(200)
          .then((res) => {
            expect(res.body[0].length).toEqual(3);
            expect(res.body[1]).toEqual(3);
          });
      });

      it('should exclude old workouts for month equals 0', () => {
        return request(app.getHttpServer())
          .get('/workouts?pageIndex=1&month=0')
          .expect(200)
          .then((res) => {
            expect(res.body[0].length).toEqual(1);
            expect(res.body[1]).toEqual(1);
          });
      });

      it('should filter by month for month equals 1', () => {
        return request(app.getHttpServer())
          .get('/workouts?pageIndex=1&month=1')
          .expect(200)
          .then((res) => {
            expect(res.body[0].length).toEqual(1);
            expect(res.body[1]).toEqual(1);
          });
      });
    });

    //toDo add tests for category filters
  });
});

async function insertWorkoutsByDates(repository, dates: string[]) {
  dates.forEach(async (date: string) => {
    await insertWorkout(repository, getWorkout(new Date(date).toISOString()));
  });
}

async function insertWorkoutsByCategories(repository, categories: string[]) {
  categories.forEach(async (category: string) => {
    await insertWorkout(repository, getWorkout(new Date().toISOString(), category));
  });
}

async function insertWorkout(repository, workout) {
  const { name, description, startDate, category, image } = workout;
  await repository.query("Insert into Workout(name, description, startDate, category, image) values(:name, :description, :startDate, :category, :image)", [
    name, description, startDate, category, image
  ]);
}

function getWorkout(date: string, category: string = "c1") {
  return {
    id: 1,
    name: 'Test name',
    description: 'Test description',
    startDate: date,
    category,
    image: 'test-image'
  };
}