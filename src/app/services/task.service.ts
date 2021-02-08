import {Injectable} from '@angular/core';
import {BaseService} from './BaseService';
import {TaskModel} from '../models/TaskModel';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<TaskModel> {

  constructor(protected http: HttpClient) {
    super(http, 'task');
  }

  start(taskId: string): Observable<any> {
    const url = `${this.baseUrl}track/${taskId}/start`;
    return this.http.post(url, {}, this.options);
  }

  end(taskId: string): Observable<any> {
    const url = `${this.baseUrl}track/${taskId}/end`;
    return this.http.post(url, {}, this.options);
  }

}
