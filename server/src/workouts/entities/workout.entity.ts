import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../enums/workout.enum';

@Entity()
export class Workout {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    startDate: Date;

    @Column()
    @ApiProperty({ enum: Category })
    category: string;

    @Column()
    @ApiProperty()
    image: string;
}