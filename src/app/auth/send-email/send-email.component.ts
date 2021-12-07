import { AuthService } from '../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.interFace';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit  {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService) {}
  


  onSendEmail(): void{
    this.authSvc.sendVerificationEmail();
  }

  ngOnInit() {
    this.authSvc.logout();
  }

}
