import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class SettingService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {
  }

  private projectsInfoURL = 'app/projectsInfo';
  private thresholdInfoURL = 'app/thresholdInfo'

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getProjectsInfo() {
    return this.http.get(this.projectsInfoURL)
      .map(this.extractData)
      .catch(this.handleError);

  }

  getThresholdInfo() {
    return this.http.get(this.thresholdInfoURL)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}
