import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {User} from "../shared/user/user";

@Injectable()
export class ManagementService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {
  }
  private headers = new Headers({'Content-Type': 'application/json'});
  private userListURL = 'http://localhost:9090/boot/webmanagement/getUserListInfo';
  private uploadImageURL = 'http://localhost:9090/boot/webmanagement/photoupload';
  private deleteUserURL = 'http://localhost:9090/boot/webmanagement/delete';
  private createUserURL = 'http://localhost:9090/boot/webmanagement/create';
  private updateUserURL = 'http://localhost:9090/boot/webmanagement/update';

  getUserListInfo() {
    return this.http.get(this.userListURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteUser(user: User): Promise<void> {
    return this.http
      .post(this.deleteUserURL, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  createUser(user: User): Promise<User> {
    return this.http
      .post(this.createUserURL, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  updateUser(user: User): Promise<User> {
    return this.http
      .post(this.updateUserURL, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  readFile(file: File) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader()
      reader.onload = function(e: any) {
        resolve(e.target.result)
      }
      reader.readAsDataURL(file);
    })
  }

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

}

