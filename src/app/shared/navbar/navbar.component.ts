import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})

export class NavbarComponent {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  categoryList: any;
  iCont: number = 0;

  @Output() OCSidenav = new EventEmitter<boolean>();
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.categoryList = "Abarrotes";
    setInterval(()=> { this.contador() }, 8 * 1000);
    // this.contador();
  }

  async onLogout(){
    try 
    {
      this.authSvc.logout();
      this.router.navigate(['/login']);
      sessionStorage.removeItem('USERDISPLAYNAME');
      sessionStorage.removeItem('USEREMAIL',);
      sessionStorage.removeItem('USERMAIN',);
      sessionStorage.removeItem('USERSECONDARY');
      sessionStorage.removeItem('USERTAGNAME');
      sessionStorage.removeItem('USERUID');
      sessionStorage.removeItem('USERPHOTOURL');
      sessionStorage.removeItem('USERSTATE');
      sessionStorage.removeItem('USERSWITCHCODE');
      sessionStorage.removeItem('RNKPOINTS');

      
    } catch (error) 
    {
      console.log('ERROR: ',error);
    }
  }

  openSidenav(){
    this.OCSidenav.emit(true);
  }

  categories = [
    {name: 'Abarrotes'},
    {name: 'Higiene y Limpieza'},
    {name: 'Bebidas'},
    {name: 'Dulceria'}
  ];

  contador(){
    this.categoryList = this.categories[this.iCont].name;
    this.iCont++;
    this.iCont == 4 ? this.iCont = 0 : null;
    // console.log(this.iCont);

  }

}
