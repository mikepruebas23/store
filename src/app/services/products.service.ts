import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({providedIn: 'root'})

export class ProductService   {

  constructor(
      public afAuth: AngularFireAuth,
      private afs: AngularFirestore,
  ){}

  COLLECTION: string = "products";

  public async getProducts() {
    // Funcional
    let response: any = await this.afs.collection('users', ref =>  ref.orderBy('rnkPoints', "desc"));
    return response;
  }

  //FUNCIONAL
  public getAllProducts() {
    return this.afs.collection(this.COLLECTION).snapshotChanges();
  }

  //Crete a new Product
  public createProduct(newProduct) {

    // let result           = '';
    // let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // let charactersLength = 12;
    // for ( var i = 0; i < charactersLength; i++ ) {
    //   result += characters.charAt(Math.floor(Math.random() * 62));
    // }

    // newProduct.uid = result;

    return this.afs.collection(this.COLLECTION).doc(newProduct.uid).set(newProduct);
  }

  // Get All products
  public async getAll() {
    let response: any = await this.afs.collection(this.COLLECTION);
    return response;
  }

  public getProductByUID(UID: string) {
    const uDetails: any = this.afs.collection(this.COLLECTION).doc(UID);
    return uDetails;
  }

   //Update Product
   public updateProduct(uid: string, data: any) {
     console.log(uid, data);
    return this.afs.collection(this.COLLECTION).doc(uid).set(data);
  }

}