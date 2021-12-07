import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user.interFace';
@Injectable({providedIn: 'root'})

export class RankingService   {

  userRef: AngularFirestoreCollection<User> = null;

    constructor(
        public afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ){}

  public async getUsers() {
    // Funcional
    let response: any = await this.afs.collection('users', ref =>  ref.orderBy('rnkPoints', "desc"));
    return response;
  }
  
  public async getUsersForAdmin(){
    let response: any = await this.afs.collection('users', ref =>  ref.orderBy('tagName', "asc")).snapshotChanges().subscribe(res => { console.log(res)});
    return response;
  }
 
  public async getAll() {
    let response: any = await this.afs.collection('users');
    return response;
  }

}