import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ToastrService } from 'ngx-toastr';

declare var $ :any; // declare Jquery

@Component({
  	selector: 'app-public',
  	templateUrl: './public.component.html',
  	styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  	constructor(
  		private authService: AuthService,
  		private toastr: ToastrService,
  		private router: Router
  	) { }

  	ngOnInit() {
  	}

  	toggleMenu(){
        $("body").toggleClass("sidebar-icon-only");
  	}

  	logout(){
        this.authService.logout();
        this.toastr.success('Logout success!');
        this.router.navigate(['/login']);
    }

}
