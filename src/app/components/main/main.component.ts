import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ProjectModel} from '../../models/ProjectModel';
import {take} from 'rxjs/operators';
import {TaskService} from '../../services/task.service';
import {TaskModel} from '../../models/TaskModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  projects: ProjectModel[];
  tasks: TaskModel[];
  addingProject = false;
  addingTask = false;

  constructor(private projectService: ProjectService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getProjects();
    this.getTasks();
  }

  private getProjects(): void {
    this.projectService.get().pipe(take(1)).subscribe(result => {
      this.projects = result;
    });
  }

  private getTasks(): void {
    this.taskService.get().pipe(take(1)).subscribe(result => {
      this.tasks = result;
    });
  }

  addProject(title: string): void {
    if (!title || title === '') {
      alert('Project title cannot be empty');
      return;
    }
    this.projectService.create({title}).pipe(take(1)).subscribe(result => {
      alert(`Added ${title}`);
      this.projects.push(result);
      this.addingProject = false;
    });
  }

  addTask(identifier: string, project: string): void {
    this.taskService.create({identifier, project}).pipe(take(1)).subscribe(result => {
      alert(`Added ${identifier} task`);
      this.getTasks();
      this.addingTask = false;
    });
  }
}
