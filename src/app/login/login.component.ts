import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateSubmit } from './../shared/validators/validate-submit';
import { AuthService } from './../auth.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/throw';

declare var $ :any; // declare Jquery

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	formLogin: FormGroup;
	msg_err: String = '';
    prevUrl;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
        private toastr: ToastrService,
        private authGuard: AuthGuard
    ) { }

    ngOnInit() {
        if(this.authGuard.redirectUrl){
            this.prevUrl = this.authGuard.redirectUrl;
            this.authGuard.redirectUrl = undefined;
        }
    	this.creatForm();
    }

  	creatForm(): void{
        this.formLogin = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    logout(){
        this.authService.logout();
        this.toastr.success('Logout success!');
        this.router.navigate(['/login']);
    }

    onSubmit(){
    	if(this.formLogin.invalid){
            ValidateSubmit.validateAllFormFields(this.formLogin);
        }else{
        	console.log(this.formLogin.value)
        	this.authService.login(this.formLogin.value).subscribe(
        		(result) => {
        			if(result.success === false){
        				this.msg_err = result.message;
        			}else{
        				this.authService.storeUserData(result.token, result.user);
                        $('#login').modal('toggle');
                        if(this.prevUrl){
                            this.router.navigate([this.prevUrl]);
                        }else{
                            this.router.navigate(['/']);
                        }
        			}
        		},
        		(error) => {
        			console.log("error", error)
        		}
        	);
        }
    }

    setMessageError(){
        this.msg_err = '';
    }

}
