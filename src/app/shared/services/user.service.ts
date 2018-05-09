import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";


@Injectable()
export class UserService {

    httpOptions: any;

    constructor(private http: Http) { 

        this.httpOptions = {
            headers: new Headers({ 
                'Content-Type': 'application/json'
            })
        };
    }

    /* 
        function getCategoryNotifications(): Get all Category Notifications
        author: Lam
    */
    getUsers(): Observable<any> {
        let url = 'http://localhost:3000/api/users';
        return this.http.get(url, this.httpOptions).map((res: Response) => res.json()).catch(this.handleError);
    }

    // exception
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }

}
