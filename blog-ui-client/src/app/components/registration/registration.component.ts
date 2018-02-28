import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppHttpService } from '../../services/app-http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnDestroy, OnInit {

  registrationForm : FormGroup;
  newUserSubscribeAction ;
  messageClass:String;
  message:String;
  registrationUrl = '/auth/register';

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private httpService : AppHttpService) { 
    this.registrationForm = this.formBuilder.group({
      username:['', Validators.required],
      email: ['', Validators.required],
      pwd: ['', Validators.required],
      pwdconfirm:['', Validators.required]
    }, { validator: this.checkPassword('pwd', 'pwdconfirm')}); 
  }

  ngOnInit() {
  }

  checkPassword(pwd, pwdconfirm) {
    return (group: FormGroup) => {
      if (group.controls[pwd].value === group.controls[pwdconfirm].value) {
        return  null; 
      } else {
        return { 'checkPassword': true } ;
      }
    }
  }

  registerUser(){ 
    const user = {
      email : this.registrationForm.get('email').value,
      username : this.registrationForm.get('username').value,
      password : this.registrationForm.get('pwd').value
    };

    this.newUserSubscribeAction = this.authService.registerNewUser( user).subscribe( (res:any) => {
      console.log(res);
      if(!res.success){
        this.messageClass = 'alert alert-danger';
        this.message = res.message;
        this.registrationForm.enable({ emitEvent: false });
      }else{
        this.messageClass = 'alert alert-success';
        this.message = res.message; 
      } 
    });
  }

  isProcessing(){
    return this.httpService.processing;
  }



  ngOnDestroy(){
   
  }

}
