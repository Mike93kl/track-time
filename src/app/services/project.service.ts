import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './BaseService';
import {ProjectModel} from '../models/ProjectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService<ProjectModel> {
  constructor(protected http: HttpClient) {
    super(http, 'project');
  }
}
