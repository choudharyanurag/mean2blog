import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';
import { AppConstants } from '../constants';
import { AppHttpService } from './app-http.service';


type ResponseInterceptor = (response: any) => any;

@Injectable()
export class AuthService {
  baseUrl = '';
  appConstants = null;
  processing = false;
  error:any; 
  private responseInterceptors: Array<ResponseInterceptor> = [];

  constructor( private httpService: AppHttpService ) { 
    this.appConstants = new AppConstants();
    this.baseUrl = this.appConstants.serverUrl;
    this.addResponseInterceptor(this.defaultResponseInterceptor);
  }

  addResponseInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.responseInterceptors = [ ...this.responseInterceptors, interceptor ];
  }

  protected defaultResponseInterceptor(resp: Response): any {
    if (typeof resp.json === 'function') {
      return resp.json();
    }
    if (typeof resp.text === 'function') {
      return resp.text();
    }

    return resp;
  }

  registerNewUser(user): Observable < any >{
    this.processing = true;
    return this.httpService
            .post( this.baseUrl + '/auth/register', user)
            .map(this.responseHandler, this)
            .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }

  protected responseHandler(resp: Response): any {
    this.processing = false;
    return this.responseInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), resp);
  }

  errorHandler(error: any): void {
    this.processing = false;
    console.log(error);
    this.error = error;
  }
}
