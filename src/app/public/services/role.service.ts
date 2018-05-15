import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { api } from './../../shared/utils/api';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";


@Injectable()
export class RoleService {

    constructor(private http: Http) { 
    }

    getRoles(): Observable<any> {
        return this.http.get(api.role_list).map((res: Response) => res.json()).catch(this.handleError);
    }

    // exception
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }

}
