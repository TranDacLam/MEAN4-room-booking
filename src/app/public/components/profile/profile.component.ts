import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from './../../services/profile.service';
import { User } from './../../../shared/class/user';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../environments/environment';

declare var $ :any; // declare Jquery

@Component({
  	selector: 'app-profile',
  	templateUrl: './profile.component.html',
  	styleUrls: ['./profile.component.css'],
  	providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

	user: User;
	formProfile: FormGroup;
	formAvatar: FormGroup;
    formChangePassword: FormGroup;

    domain_root: string = '';

  	constructor(
  		private fb: FormBuilder,
  		private profileService: ProfileService,
  		private toastr: ToastrService,
  	) { }

  	ngOnInit() {
        this.domain_root = environment.domain_root;
  		this.getProfile();
        this.creatFormChangePassword();
  	}

  	creatForm(): void{
        this.formProfile = this.fb.group({
            full_name: [this.user.full_name, [Validators.required]],
            email: [this.user.email, Validators.required],
            birth_day: [this.user.birth_day],
            intro_yourself: [this.user.intro_yourself],
            personal_id: [this.user.personal_id],
            phone: [this.user.phone],
            country: [this.user.country],
            address: [this.user.address],
            possition: [this.user.possition],
            link_facebook: [this.user.link_facebook]
        });
    }

    creatFormAvatar(): void{
        this.formAvatar = this.fb.group({
            avatar: [],
        });
    }

    creatFormChangePassword(): void{
        this.formChangePassword = this.fb.group({
            password: ['', [Validators.required]],
            new_password: ['', [Validators.required]],
        });
    }

  	getProfile(){
  		this.profileService.getProfile().subscribe(
  			(result) => {
  				this.user = result.user;
  				this.creatForm();
  				this.creatFormAvatar();
  				console.log(result);
  			},
  			(error) => {
  				console.log(error);
  			}
  		);
  	}

  	onFileChange(event): void{
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            this.formAvatar.get('avatar').setValue({
                filename: file.name,
                filetype: file.type,
                value: file,
            });
        }
    }

    onSubmitChangePass(){
        this.profileService.putChangePassword(this.formChangePassword.value).subscribe(
            (result) => {
                this.formChangePassword.reset();
                this.toastr.success("Update password successful!")
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onCancelPassword(){
        this.formChangePassword.reset();
    }

    onSubmitAvatar(){
        let fd:FormData = new FormData();
        let formValues = this.formAvatar.value;
        fd.append('avatar', formValues.avatar.value);
    	this.profileService.putAvatar(fd).subscribe(
    		(result) => {
                this.user = result.user;
                $("#avatar-image").val("");
                this.formAvatar.reset();
    			this.toastr.success("Update avatar successful!")
    		},
    		(error) => {
    			console.log(error);
    		}
    	);
    }

    onCancelAvatar(){
        $("#avatar-image").val("");
        this.formAvatar.reset();
    }

  	onSubmitProfile(){
  		this.profileService.putProfile(this.formProfile.value).subscribe(
  			(result) => {
  				console.log(result);
  				this.user = result.user;
  			},
  			(error) => {
  				console.log(error);
  			}
  		);
  	}
}
