import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


type ResponseInterceptor = (response: any) => any;
type RequestInterceptor = (request: any) => any;
type ErrorInterceptor = (error: any) => any;



@Injectable()
export class AppHttpService {

  private headers: any = {};
  processing = false;
  private responseInterceptors: Array<ResponseInterceptor> = [];
  private requestInterceptors: Array<RequestInterceptor> = [];
  private errorInterceptors: Array<ErrorInterceptor> = [];


  constructor(protected http: Http) {
    this.addResponseInterceptor(this.defaultResponseInterceptor);
    this.addRequestInterceptor(this.defaultRequestInterceptor);
    this.addErrorInterceptor(this.defaultErrorInterceptor);

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

  protected defaultRequestInterceptor(req: any): string {
    return JSON.stringify(req);
  }


  protected defaultErrorInterceptor(resp: Response): any {
    let data;
    if (typeof resp.json === 'function') {
      data = resp.json();
    } else {
      data = resp.statusText;
    }

    return { status: resp.status, data };
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  addResponseInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.responseInterceptors = [ ...this.responseInterceptors, interceptor ];
  }

  addErrorInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.errorInterceptors = [ ...this.errorInterceptors, interceptor ];
  }

  addRequestInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.requestInterceptors = [ interceptor, ...this.requestInterceptors ];
  }

  get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
    this.processing = true;
    return this.http.get(url, this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.errorHandler.bind(this));
  }

  post<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
    this.processing = true;
    const postData = data;
    console.log(postData);
    return this.http.post(url, postData, this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.errorHandler.bind(this));
  }

  protected responseHandler(resp: Response): any {
    this.processing = false;
    return this.responseInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), resp);
  }

  protected errorHandler(error: Response): Observable<any> {
    this.processing = false;
    return Observable.throw(
      this.errorInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), error)
    );
  }


  protected generateOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
    if (!options.headers) {
      options.headers = new Headers();
    }

    Object.keys(this.headers)
      .filter((key) => this.headers.hasOwnProperty(key))
      .forEach((key) => {
        options.headers.append(key, this.headers[key]);
      });

    return options;
  }
}
