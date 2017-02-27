import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {

  }
  public authenticatedChange = new EventEmitter();

  // private _loginApi = this._apiBase + '/login/authorize';
  private _loginApi = 'api/users';
  private _logoutApi = this._apiBase + '/logout';

  private loginUserName:string = "";
  private apiAccessToken: string = null;



  private userlistURL = 'app/userlist';
  private projectSettingURL = 'app/projectSettings'
  private authenticatedApi = 'http://localhost:9090/boot/oauth/token';

  login(user:any) {
    user.grant_type = 'password';
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic ZnMtYWRkLm1vYmlsZToxMjM0NTY3ODkw");
    let bodyData = new URLSearchParams();
    Object.keys(user).map((k) => {
      if (user.hasOwnProperty(k)) {
        bodyData.set(k, user[k]);
      }
    });
    this.loginUserName = user.username;
    return this.http.post(this.authenticatedApi, bodyData, { headers: headers })
                    .map(this.extractLoginData)
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this._logoutApi)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private extractLoginData(res: Response) {
    let result = res.json().data;
    if(result && result.access_token) {
      this.apiAccessToken = result.access_token;
      this.authenticatedChange.emit(this.apiAccessToken);
      return true;
    } else {
      return false;
    }
  }

  getAuthorizationToken() {

    return this.apiAccessToken;

  }

  getLoginUserName() {

    return this.loginUserName;

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

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}
