import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {

  }

  // private _loginApi = this._apiBase + '/login/authorize';
  private _loginApi = 'api/users';
  private _logoutApi = this._apiBase + '/logout';


  private userlistURL = 'app/userlist';
  private projectSettingURL = 'app/projectSettings'

  login(user:any) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.userlistURL, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getUsers() {
    return this.http.get(this.userlistURL)
      .map(this.extractData)
      .catch(this.handleError);

  }

  getProjectSettings() {
    return this.http.get(this.projectSettingURL)
      .map(this.extractData)
      .catch(this.handleError);

  }

  getMe() {
    return this.http.get(this._apiBase + '/api/users/me/', <RequestOptionsArgs> {withCredentials: true})
                  .map((res: Response) => res.json().me)
                  .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}
