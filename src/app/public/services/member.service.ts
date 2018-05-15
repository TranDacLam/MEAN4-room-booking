import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { api } from './../../shared/utils/api';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";


@Injectable()
export class MemberService {

    token: any = '';

    constructor(private http: Http) { 
        this.token = localStorage.getItem('token');
    }

    getMembers(): Observable<any> {
        return this.http.get(api.member_list).map((res: Response) => res.json()).catch(this.handleError);
    }

    getMember(): Observable<any> {
        return this.http.get(api.member).map((res: Response) => res.json()).catch(this.handleError);
    }

    addMember(user): Observable<any>{
        return this.http.post(api.member, JSON.stringify(user))
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    // exception
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }

}
