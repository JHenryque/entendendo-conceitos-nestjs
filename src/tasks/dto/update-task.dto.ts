import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  readonly name?: string;
  @IsString()
  @IsOptional()
  readonly cargo?: string;
  @IsString()
  @IsOptional()
  readonly description?: string;
  @IsBoolean()
  @IsOptional()
  readonly isCompleted?: boolean;
}
