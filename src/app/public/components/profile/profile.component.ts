import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from './../../services/profile.service';
import { User } from './../../../shared/class/user';
import { ToastrService } from 'ngx-toastr';

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

  	constructor(
  		private fb: FormBuilder,
  		private profileService: ProfileService,
  		private toastr: ToastrService,
  	) { }

  	ngOnInit() {
  		this.getProfile();
 
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

    onSubmitAvatar(){
    	const formData = new FormData();
    	let formValue = this.formAvatar.value;
    	console.log(formValue)
    	formData.append('avatar', formValue.avatar.value, formValue.avatar.filename);
    	this.profileService.putAvatar(formData).subscribe(
    		(result) => {
    			console.log(result);
    		},
    		(error) => {
    			console.log(error);
    		}
    	);
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
