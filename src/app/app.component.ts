import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateSubmit } from './shared/validators/validate-submit';
import { AuthService } from './shared/services/auth.service';
import 'rxjs/add/observable/throw';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css'],
  	providers: [AuthService]
})
export class AppComponent implements OnInit{

	formLogin: FormGroup;
	msg_err: String = '';

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
    ) { }

    ngOnInit() {
    	this.creatForm();
    }

  	creatForm(): void{
        this.formLogin = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    onSubmit(){
    	if(this.formLogin.invalid){
            ValidateSubmit.validateAllFormFields(this.formLogin);
        }else{
        	console.log(this.formLogin.value)
        	this.authService.login(this.formLogin.value).subscribe(
        		(result) => {
        			console.log(result)
        			if(result.success === false){
        				this.msg_err = result.message;
        			}else{
        				this.authService.storeUserData(result.token, result.user);
        				this.router.navigate(['/home']);
        			}
        		},
        		(error) => {
        			console.log("ss", error)
        		}
        	);
        }
    }
}
