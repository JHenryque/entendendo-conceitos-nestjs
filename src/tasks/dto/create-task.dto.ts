import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(5, { message: 'Name must be at least 5 characters long' })
  @IsNotEmpty()
  //@MaxLength(50, { message: 'Name must be at most 50 characters long' })
  readonly name: string;
  @IsString({ message: 'Name must be a string' })
  @MinLength(5, { message: 'Name must be at least 5 characters long' })
  @IsNotEmpty()
  readonly cargo: string;
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly description: string;
  @IsBoolean()
  readonly isCompleted: boolean;

  @Optional()
  readonly userId: number;
}
