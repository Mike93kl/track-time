import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {TaskModel} from '../../models/TaskModel';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  tasks: TaskModel[];
  onGoingTasks: TaskModel[];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.onGoingTasks = [];
    this.taskService.get().pipe(take(1)).subscribe(result => {
      this.tasks = result;
    });
  }

  start(task: TaskModel): void {
    this.taskService.start(task._id).pipe(take(1))
      .subscribe(result => {
        console.log(result);
        if (task.activeTracker instanceof Object) {
          task.activeTracker.status = 'started';
        }
        console.log(task);
      });
  }

  end(task: TaskModel): void {
    this.taskService.end(task._id).pipe(take(1))
      .subscribe(result => {
        console.log(result);
        if (task.activeTracker instanceof Object) {
          task.activeTracker.status = 'finished';
        }
      });
  }

  addOnGoing(taskId: string): void {
    const task = this.tasks.find(t => t._id === taskId);
    console.log(taskId);
    const index = this.tasks.indexOf(task);
    this.onGoingTasks.push(task);
    this.tasks.splice(index, 1);
  }

  removeFromOnGoing(o: TaskModel): void {
    const index = this.onGoingTasks.indexOf(o);
    this.tasks.push(o);
    this.onGoingTasks.splice(index, 1);
  }
}
