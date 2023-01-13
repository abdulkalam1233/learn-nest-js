import { TaskStatus } from '../task.model';

export interface GetTasksFilter {
  status?: string;
  search?: TaskStatus;
}
