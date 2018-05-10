import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";


@Injectable()
export class AuthService {

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

    login(user): Observable<any> {
        let url = 'http://localhost:3000/api/auth';
        return this.http.post(url, user).map((res: Response) => res.json()).catch(this.handleError);
    }

    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.auth_token = token;
    }

    // exception
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }

}
