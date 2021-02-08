import {Injectable} from '@angular/core';
import {BaseService} from './BaseService';
import {TrackedTimeModel} from '../models/TrackedTimeModel';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistoryModel} from '../models/HistoryModel';

@Injectable({
  providedIn: 'root'
})
export class HistoryService extends BaseService<HistoryModel> {

  constructor(protected http: HttpClient) {
    super(http, 'query');
  }

  today(): Observable<HistoryModel> {
    return this.http.get<HistoryModel>(this.url + '/today');
  }

  week(): Observable<HistoryModel> {
    return this.http.get<HistoryModel>(this.url + '/lastweek');
  }

  month(): Observable<HistoryModel> {
    return this.http.get<HistoryModel>(this.url + '/lastmonth');
  }

  beginning(): Observable<HistoryModel> {
    return this.http.get<HistoryModel>(this.url + '/beginning');
  }

  inRange(startTime: number, endTime: number): Observable<HistoryModel> {
    return this.http.get<HistoryModel>(`${this.url}?startDate=${startTime}&endDate=${endTime}`);
  }
}
