import { Injectable, Inject, EventEmitter} from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Project, Threshold} from './setting.class';
import {SelectItem} from 'primeng/primeng';

@Injectable()
export class SettingService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {
    this.selectedProject = new EventEmitter();
    this.unselectedProject = new EventEmitter();
    this.projectChange = new EventEmitter();
  }

  public selectedProject: EventEmitter<Project>;
  public unselectedProject: EventEmitter<boolean>;
  public projectChange: EventEmitter<SelectItem[]>;

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsInfoURL = 'http://localhost:9090/boot/websetting/getProjectsInfo';
  private updateProjectURL = 'http://localhost:9090/boot/websetting/updateProject';
  private createProjectURL = 'http://localhost:9090/boot/websetting/createProject';
  private thresholdInfoURL = 'http://localhost:9090/boot/websetting/getThresholdInfo';
  private createThresholdURL = 'http://localhost:9090/boot/websetting/createThreshold';
  private updateThresholdURL = 'http://localhost:9090/boot/websetting/updateThreshold';
  private deleteThresholdURL = 'http://localhost:9090/boot/websetting/deleteThreshold';

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }

  selectProject(project:Project) {
    this.selectedProject.emit(project);
  }

  unselectProject() {
    this.unselectedProject.emit(true);
  }

  // CRUD for Project
  getProjectList() : Observable<Project[]>{
    return this.http.get(this.projectsInfoURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createProject(project: Project) {
    return this.http
      .post(this.createProjectURL, JSON.stringify(project), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateProject(project: Project){
    return this.http
      .post(this.updateProjectURL, JSON.stringify(project), {headers: this.headers})
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
      .post(this.createThresholdURL, JSON.stringify(threshold), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateThreshold(threshold: Threshold) {
    return this.http
      .post(this.updateThresholdURL, JSON.stringify(threshold), {headers: this.headers})
      .map(() => threshold)
      .catch(this.handleError);
  }

  deleteThreshold(threshold: Threshold){
    return this.http.post(this.deleteThresholdURL, JSON.stringify(threshold), {headers: this.headers})
      .map(() => null)
      .catch(this.handleError);
  }

}

