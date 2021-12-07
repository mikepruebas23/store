import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authSvc: AuthService,private afs: AngularFirestore) { }
  public users = [];

  ngOnInit() {
    // this.authSvc.getUsers().subscribe((catsSnapshot) => {
    //   this.users = [];
    //   catsSnapshot.forEach((catData: any) => {
    //     this.users.push({
    //       id: catData.payload.doc.id,
    //       data: catData.payload.doc.data()
    //     });
    //   })
    // });
  }

}
