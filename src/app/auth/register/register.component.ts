import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interFace';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RegisterCodeService } from 'src/app/register-code/register-code.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isDisabled: boolean = false;

  codeIsValid: boolean = false;
  verifyCode: boolean = true;

  hide = true;
  btnDisabled: boolean = true;

  registerForm = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  validCodeForm = new FormGroup({
    code: new FormControl('',[
      Validators.required
    ])
  });
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar,
    private _RegisterCodeService: RegisterCodeService,
  ) { }

  @ViewChild('fc') myDiv: ElementRef;
 
  ngOnInit() {
    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
    this.isDisabled = false;
  }

  async onRegister(){
    this.isDisabled = true;
    const {email, password} = this.registerForm.value;
    try 
    {
      const user = await this.authSvc.register(email, password); 
      
      if (user)
      {
        this.openSnackBar('Registro Exitoso!');
        window.setInterval(() => this.checkUserIsVerified(user), 3000);
        
      }
    } catch (error) 
    {
      this.isDisabled = false;
      this.openSnackBar(error);
      console.log('ERROR: ',error);
    } 
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  FormatNumber() {
    let { code  } = this.validCodeForm.value;
    this.myDiv.nativeElement.value = this.formatCodeFriend(code)

    code.length == 14 ? this.btnDisabled = false : this.btnDisabled = true;
  }

  async onValideCode(){

    let  {code} = this.validCodeForm.value;
   
    await this._RegisterCodeService.getCodeFriend(code).then(res=>{
      res.valueChanges().subscribe(response=>{
        if(response){
          console.log(response);
          if(response.valid){
            this.openSnackBar('CODIGO CORRECTO!');
            this.codeIsValid = true;
            this.verifyCode = false;
            this._RegisterCodeService.updateCodeFriend(code);
          }
          else  {
            this.openSnackBar('ESTE CODIGO YA SE USO!');
            this.codeIsValid = false;
            this.verifyCode = true;
          }
        }
        else{
          this.openSnackBar('ESTE CODIGO NO EXISTE!');
          this.codeIsValid = false;
          this.verifyCode = true;
        }
      })
  });
  }


  formatCodeFriend(value) {
    // console.log(this.myDiv.nativeElement.value);
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,12}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    let i;
    let len;
    for (i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4));
    }
    if (parts.length) {
     
      return parts.join('-');
    } else {
      
      return  value;
    }
  }
}
