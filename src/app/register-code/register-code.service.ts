import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({providedIn: 'root'})

export class RegisterCodeService {

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  COLLECTION: string = 'codes';

  //Get By Id
  public async getCodeFriend(ID: string){
    let response: any;
    response = await this.afs.collection(this.COLLECTION).doc(ID);
    return response;
  }

  //CREATE
  public async createCodeFriend(ID: string){
    await this.afs.collection(this.COLLECTION).doc(ID).set({
      valid: true,
    });
  }

  //UPDATE
  public async updateCodeFriend(ID: string){
    await this.afs.collection(this.COLLECTION).doc(ID).update({
      valid: false
    });
  }
}
