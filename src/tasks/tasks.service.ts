import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  async getTasks(filters: GetTasksFilter): Promise<Task[]> {
    if (Object.keys(filters).length) {
      return this.taskRepository.getFilteredTasks(
        filters.status,
        filters.search,
      );
    }

    return this.taskRepository.find();
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const deleteResponse = await this.taskRepository.delete(id);
    if (deleteResponse.affected == 0) {
      throw new NotFoundException();
    }
    return;
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const response = await this.taskRepository.updateStatus(id, status);
    if (response.affected == 0) {
      throw new NotFoundException();
    }
    return this.getTaskById(id);
  }
}
