import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user.service';
import 'rxjs/add/observable/throw';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [UserService]
})
export class UsersComponent implements OnInit {

    list_users: any;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(){
        this.userService.getUsers().subscribe(
            (result) => {
                console.log(result)
                this.list_users = result.data;
            },
            (error) => {
                console.log(error)
            }
        );
    }

}
