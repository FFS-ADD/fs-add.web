import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {ProjectProfile, ThresholdProfile} from './setting.interface';

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

  private getRequestOptions() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return <RequestOptionsArgs> {headers: headers, withCredentials: true};
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
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

  deleteThresholdItem(id: number){
    const url = `${this.thresholdInfoURL}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch(this.handleError);
  }
  createUser(user: User): Promise<User> {
    return this.http
      .post(this.userListURL, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  updateUser(user: User): Promise<User> {
    const url = `${this.userListURL}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }



  saveProjectInfo(projectFrom: ProjectProfile) {
    let body = JSON.stringify(projectFrom);

    return this.http.post(this.saveProjectsInfoURL, body, this.getRequestOptions())
      .map((res: Response) => res)
      .catch(this.handleError);
  }

  // if the no in form is -1, then save a new Threshold item.
  // if the no in from > 0, then save the edited item
  saveThresholdInfo(thresholdFrom: ThresholdProfile) {
    let body = JSON.stringify(thresholdFrom);

    return this.http.post(this.saveThresholdInfoURL, body, this.getRequestOptions())
      .map((res: Response) => res)
      .catch(this.handleError);
  }

}

