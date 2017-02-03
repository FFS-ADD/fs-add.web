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
  private _uploadImageApi = 'api/uploadImage';



  login(user:any) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._loginApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  getUsers() {
    // return this.http.get(this._apiBase + "/api/users?limit=5&desc=true", <RequestOptionsArgs> {withCredentials: true})
    //               .map((res: Response) => res.json())
    //               .catch(this.handleError);
    return this.http.get("assets/mockdata/usersdata.json")
      .map((res: Response) => res.json())
      .catch(this.handleError);

  }

  uploadAvatarPicture(file:File) {

    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._uploadImageApi, formData, options)
      .map((res: Response) => res)
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