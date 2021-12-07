import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { likesCount, User } from '../shared/models/user.interFace';

@Injectable({providedIn: 'root'})

export class RateService   {

    COLLECTION: string = 'likes';

    constructor(
        public afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ){}

    //GET BY ID
    public getLikeCount(UID: string) {
        let response: any = this.afs.collection(this.COLLECTION).doc(UID);
        return response;
    }

    //UPDATE LIKE COUNT
    public async updateLikeCount(UID: string, value: number){
        await this.afs.collection(this.COLLECTION).doc(UID).update({
          points: value
        });
    }

    //UPDATE UID IN LIKE ARRAY
    public async InsertUID(UID: string){
        // await this.afs.collection(this.COLLECTION).doc(UID).set({
        //   uidUsuarios: UID
        // });

        const userRef: AngularFirestoreDocument = this.afs.doc(`${this.COLLECTION}/${UID}`);

        const data = UID;


        userRef.set(data.toString, { merge: true });
    }


    // public async getLikeCount2(UID: string) {
    //     const uLikes: any = this.afs.collection(this.COLLECTION).doc(UID);
    //     return uLikes;
    // }
}