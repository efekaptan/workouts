import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { Category } from '../enums/workout.enum';

export class CreateWorkoutDto {
    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    readonly description: string;

    @IsDateString()
    @ApiProperty()
    readonly startDate: Date;

    @IsString()
    @IsEnum(Category)
    @ApiProperty({ enum: Category })
    readonly category: string;

    @IsString()
    @ApiProperty()
    readonly image: string;
}