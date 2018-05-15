import { environment } from './../../../environments/environment';

export const api = {
    profile: environment.api_domain + 'profile',
    member: environment.api_domain + 'member',
    member_list: environment.api_domain + 'member/list',
};
