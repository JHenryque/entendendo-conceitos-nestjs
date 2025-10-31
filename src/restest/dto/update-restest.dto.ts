import { PartialType } from '@nestjs/mapped-types';
import { CreateRestestDto } from './create-restest.dto';

export class UpdateRestestDto extends PartialType(CreateRestestDto) {}
