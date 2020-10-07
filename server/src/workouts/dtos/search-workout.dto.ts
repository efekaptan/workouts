import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SearchWorkoutDto {
    @ApiPropertyOptional({ type: Number })
    readonly month?: number;

    @ApiPropertyOptional({ type: String })
    @Transform((value: string) => value.split(',').filter((item) => item))
    readonly categories?: string[];

    @ApiPropertyOptional({ type: Number })
    readonly pageIndex?: number = 1;
}