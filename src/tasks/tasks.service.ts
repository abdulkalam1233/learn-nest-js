import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(filters: GetTasksFilter): Task[] {
    let result = this.tasks;
    if (filters?.status) {
      result = result.filter((item) => item.status === filters.status);
    }
    if (filters?.search) {
      result = result.filter(
        (item) =>
          item.title.includes(filters.search) ||
          item.description.includes(filters.search),
      );
    }

    return result;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((item) => item.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
