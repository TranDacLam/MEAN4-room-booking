import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { api } from './../../shared/utils/api';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";


@Injectable()
export class ProfileService {

    token: any = '';

    constructor(private http: Http) { 
        this.token = localStorage.getItem('token');
    }

    getProfile(): Observable<any> {
        return this.http.get(api.profile).map((res: Response) => res.json()).catch(this.handleError);
    }

    putProfile(user): Observable<any>{
        return this.http.put(api.profile, JSON.stringify(user))
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    putChangePassword(user): Observable<any>{
        const url = `${api.profile}/change-password`;
        return this.http.put(url, JSON.stringify(user))
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    putAvatar(value: FormData): Observable<any>{
        const url = `${api.profile}/upload`;
        return Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('put', url);
            xhr.setRequestHeader('Authorization', this.token);
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
