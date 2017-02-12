import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ManagementService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {
  }

  private userListURL = 'app/userlist';
  private uploadImageURL = 'app/uploadImage';


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

  getUserListInfo() {
    return this.http.get(this.userListURL)
      .map(this.extractData)
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
}

