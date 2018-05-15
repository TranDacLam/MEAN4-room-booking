import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import "inputmask/dist/inputmask/inputmask.numeric.extensions";
import * as Inputmask from "inputmask/dist/inputmask/inputmask.date.extensions";
import { User } from './../../../../shared/class/user';
import { Role } from './../../../../shared/class/role';
import { MemberService } from './../../../services/member.service';
import { RoleService } from './../../../services/role.service';
import { ScrollTop } from './../../../../shared/common/scroll-top';
import { ValidateSubmit } from './../../../../shared/validators/validate-submit';
import { ToastrService } from 'ngx-toastr';

declare var $ :any; // declare Jquery

@Component({
    selector: 'app-form-member',
    templateUrl: './form-member.component.html',
    styleUrls: ['./form-member.component.css'],
    providers: [MemberService, RoleService]
})
export class FormMemberComponent implements OnInit {

    formMember: FormGroup;

    member: User;
    roles: Role[];
    title_page: string = '';
    is_disabled_password: boolean = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private memberService: MemberService,
        private roleService: RoleService,
        private scrollTop: ScrollTop,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        Inputmask("date",).mask('#birth_date');

        if (this.route.snapshot.paramMap.get('id')) {
            // Update Init Form
            this.title_page = "Edit Member";
            this.getMember();
        } else {
            // Add new Form
            this.title_page = "Add Member";
            this.member = new User();
            this.creatForm();
        }
        this.getRoles();
    }

    creatForm(): void{
        this.formMember = this.fb.group({
            full_name: [this.member.full_name, [Validators.required]],
            email: [this.member.email, Validators.required],
            password: [this.member.password, Validators.required],
            new_password: [],
            birth_day: [this.member.birth_day],
            intro_yourself: [this.member.intro_yourself],
            personal_id: [this.member.personal_id],
            phone: [this.member.phone],
            country: [this.member.country],
            address: [this.member.address],
            possition: [this.member.possition],
            link_facebook: [this.member.link_facebook],
            role: [this.member.role, Validators.required]
        });
    }

    getRoles(){
        this.roleService.getRoles().subscribe(
            (result) => {
                this.roles = result.roles;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getMember(){


    }

    onSubmit(){
        if(this.formMember.invalid){
            ValidateSubmit.validateAllFormFields(this.formMember);
            this.scrollTop.scrollTopFom();
        }else{
            if(this.member._id){

            }else{
                this.memberService.addMember(this.formMember.value).subscribe(
                    (result) => {
                        this.toastr.success("Add member successful!");
                        this.router.navigate(['/member/list']);
                    },
                    (error) => {
                        console.log('err', error);
                    }
                );
            }
        }
    }

    showPassword(input: any): any {
        if (input.type === "password") {
            input.type = "text";
            $('i.toggle-password').addClass('fa fa-eye').removeClass('fa-eye-slash');
        } else {
            input.type = "password";
            $('i.toggle-password').addClass('fa-eye-slash').removeClass('fa-eye');
        }
    }

}
