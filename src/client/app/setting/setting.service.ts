import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Project, Threshold} from './setting.class';

@Injectable()
export class SettingService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsInfoURL = 'app/projectList';
  private thresholdInfoURL = 'app/thresholdList';

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }

  // CRUD for Project
  getProjectList() : Observable<Project[]>{
    return this.http.get(this.projectsInfoURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createProject(project: Project) {
    return this.http
      .post(this.projectsInfoURL, JSON.stringify(project), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateProject(project: Project){
    const url = `${this.projectsInfoURL}/${project.id}`;
    return this.http
      .put(url, JSON.stringify(project), {headers: this.headers})
      .map(() => project)
      .catch(this.handleError);
  }

  // CRUD for Threshold
  getThresholdList(): Observable<Threshold[]> {
    return this.http.get(this.thresholdInfoURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createThreshold(threshold: Threshold) {
    return this.http
      .post(this.thresholdInfoURL, JSON.stringify(threshold), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateThreshold(threshold: Threshold) {
    const url = `${this.thresholdInfoURL}/${threshold.id}`;
    return this.http
      .put(url, JSON.stringify(threshold), {headers: this.headers})
      .map(() => threshold)
      .catch(this.handleError);
  }

  deleteThreshold(id: number){
    const url = `${this.thresholdInfoURL}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch(this.handleError);
  }

}

