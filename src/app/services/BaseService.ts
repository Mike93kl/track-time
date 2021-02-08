import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Model} from '../models/Model';

const baseUrl = 'http://localhost:8080/';
const options = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export abstract class BaseService<T extends Model> {
  protected http: HttpClient;
  protected url: string;
  protected baseUrl: string;
  protected options: any;

  protected constructor(http: HttpClient, endpoint: string) {
    this.http = http;
    this.url = baseUrl + endpoint;
    this.baseUrl = baseUrl;
    this.options = options;
  }

  create(object: T): Observable<any> {
    return this.http.post(this.url, object, options);
  }

  update(object: T): Observable<any> {
    return this.http.put(this.url, object, options);
  }

  get(query?: { [key: string]: string }): Observable<T[]> {
    const qParams = query ? Object.keys(query).reduce((p, c, i) => {
      const del = i === 0 ? '?' : '&';
      p += `${del}${c}=${query[c]}`;
      return p;
    }, '') : '';
    return this.http.get<T[]>(this.url + qParams);
  }
}
