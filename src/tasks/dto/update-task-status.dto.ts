import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
