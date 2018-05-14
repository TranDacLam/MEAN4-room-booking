
import { Headers, Http, BaseRequestOptions, RequestOptionsArgs, RequestOptions } from '@angular/http';
import * as moment from 'moment';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {
 
    headers = new Headers({
        'Content-Type': 'application/json'
    });

    merge(options?: RequestOptionsArgs): RequestOptions {
        var newOptions = super.merge(options);
        const token = localStorage.getItem('token');
        // Start check expire token 
        var exp = localStorage.getItem('exp_time');

        if (exp && moment().valueOf() > parseInt(exp)) {
            newOptions.headers.set(AUTH_HEADER_KEY, `${AUTH_PREFIX}`);
            
        } else {
            newOptions.headers.set(AUTH_HEADER_KEY, `${token}`);
            // Current time + 15 minutes
            var exp_time = moment().add(15, 'minutes').valueOf().toString();
            localStorage.setItem('exp_time', exp_time);
        }
        
        return newOptions;
    }

}