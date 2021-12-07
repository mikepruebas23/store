import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interFace';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authSvc: AuthService,
    private afs: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar) { }
    
  hide = true;

  ngOnInit(): void {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        this.checkUserIsVerified(user);
        this.valideUserSmash(user.uid, email, user.emailVerified);
        // window.location.reload();
        this.router.navigate(['/home']);
      }
    } catch (error) {
      // console.log(error);
      this.openSnackBar('Correo o contraseña incorrecta');
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.authSvc.logout();
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  async valideUserSmash(id, email, verified){
    let data: any;
    data = await this.afs.collection('users').doc(id).valueChanges().subscribe(value => {
      if(value == undefined) {
        try {
          const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${id}`);

          const data: User = {
            uid: id,
            email: email,
            emailVerified: verified,
            role: 'SUSCRIPTOR',
            displayName: null,
            photoURL: null,
            tagName: null,
            rnkPoints: 0,
            main: null,
            secondary: null,
            state: null,
            switchCode: null,
            position: ''
          };

          return userRef.set(data, { merge: true });
      }
        catch (error) 
        {
          console.log('ERROR: ', error);
        }
      }
      else
      {
        sessionStorage.setItem('USERDISPLAYNAME',value['displayName']);
        sessionStorage.setItem('USEREMAIL',value['email']);
        sessionStorage.setItem('USERMAIN',value['main']);
        sessionStorage.setItem('USERSECONDARY',value['secondary']);
        sessionStorage.setItem('USERSTATE',value['state']);
        sessionStorage.setItem('USERSWITCHCODE',value['switchCode']);
        sessionStorage.setItem('USERTAGNAME',value['tagName']);
        sessionStorage.setItem('USERUID',value['uid']);
        sessionStorage.setItem('RNKPOINTS',value['rnkPoints']);
        sessionStorage.setItem('USERPHOTOURL',value['photoURL']);
      }
    });
    return data;
  }

}
