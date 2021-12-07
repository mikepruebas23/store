import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  opened: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(  private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.isAuth().subscribe(user => {
      if (user){
        // console.log('USAURIO', user)
        this.isLoggedIn = !this.isLoggedIn;
        if(user.email == 'armacomiguel@gmail.com'){
          this.isAdmin = !this.isAdmin
        }
      }
    })
  }

  onToggleSidenav(didOpenClose: boolean){
    this.opened = didOpenClose;
    
  }

  toCloseMenu(){
    this.opened = false;
  }

}
