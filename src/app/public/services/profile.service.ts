import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";


@Injectable()
export class ProfileService {

    httpOptions: any;
    token;
    auth_token;


    constructor(private http: Http) { 
    }

    createAuthHeader(){
        this.loadToken();
        this.httpOptions = {
            headers: new Headers({ 
                'Content-Type': 'application/json',
                'authorization': this.auth_token
            })
        };
    }

    loadToken(){
        const token = localStorage.getItem('token');
        this.auth_token = token;
    }

    getProfile(): Observable<any> {
        this.createAuthHeader();
        console.log(this.httpOptions)
        let url = 'http://localhost:3000/api/profile';
        return this.http.get(url, this.httpOptions).map((res: Response) => res.json()).catch(this.handleError);
    }

    putProfile(user): Observable<any>{
        this.createAuthHeader();
        const url = 'http://localhost:3000/api/profile';
        return this.http.put(url, JSON.stringify(user), this.httpOptions)
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    putAvatar(data: FormData): Observable<any>{
        this.createAuthHeader();
        const url = 'http://localhost:3000/api/profile/upload';
        return this.http.put(url, data, this.httpOptions)
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    aaa(value: FormData): Observable<any>{
        const url = 'http://localhost:3000/api/profile/upload';
        this.createAuthHeader();
        return Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Authorization', this.auth_token);
            xhr.send(value);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr);
                    }
                }
            }
        });
    }

    // exception
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }

}
