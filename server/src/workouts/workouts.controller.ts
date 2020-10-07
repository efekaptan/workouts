import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { SearchWorkoutDto } from './dtos/search-workout.dto';
import { Workout } from './entities/workout.entity';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
@ApiTags('workouts')
export class WorkoutsController {
    constructor(private readonly workoutsService: WorkoutsService) { }

    @Post()
    @ApiOperation({ summary: 'Create workout' })
    @ApiResponse({ status: 200, description: 'The created workout', type: Workout })
    async create(@Body() createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
        return this.workoutsService.create(createWorkoutDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get workout' })
    @ApiResponse({ status: 200, description: 'Workout', type: Workout })
    @ApiParam({ name: 'id', type: Number })
    async findOne(@Param('id') id): Promise<Workout> {
        return this.workoutsService.findOne(id);
    }

    @Get()
    @ApiOperation({ summary: 'List workouts' })
    @ApiResponse({ status: 200, description: 'Workout list', type: Workout, isArray: true })
    async findAll(@Query() searchWorkoutDto: SearchWorkoutDto): Promise<[Workout[], number]> {
        return this.workoutsService.findAll(searchWorkoutDto);
    }
}