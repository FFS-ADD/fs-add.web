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
  private userListURL = 'app/userlist';
  private uploadImageURL = 'app/uploadImage';

  getUserListInfo() {
    return this.http.get(this.userListURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<void> {
    const url = `${this.userListURL}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
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

  uploadAvatarPicture(file:File) {

    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.uploadImageURL, formData, options)
      .map((res: Response) => res)
      .catch(this.handleError);
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

