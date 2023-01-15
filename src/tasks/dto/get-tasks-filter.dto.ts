import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilter {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: string;

  @IsOptional()
  search?: TaskStatus;
}
