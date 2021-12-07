import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
// import { User } from 'firebase';
import { first, switchMap } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { Observable, of } from 'rxjs';
import { Roles, User } from '../../shared/models/user.interFace';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RoleValidator } from '../helpers/roleValidator';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService extends RoleValidator {

  public user$: Observable<User>;

  // public user:User;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) {
      super();
      this.user$ = this.afAuth.authState.pipe(
        switchMap(( user ) => {
          if (user){
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          }
          return of(null);
        })
      );
     }

  //REINICIAR CONTRASEÑA
  async resetPassword(email:string): Promise<void> {
    try 
    {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) 
    {
      console.log('ERROR: ',error);
    }
  }
  
  //ENVIAR VERIRIFACION EMAIL
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  //INICIO DE SESION
  async login(email: string, password: string): Promise<User>{
    try 
    {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      // this.getUser(user.uid, email, user.emailVerified);
      return user;
    } catch (error) 
    {
      console.log('ERROR: ', error);
      // return error;
    }
  }

  //REGISTRO
  async register(email: string, password: string): Promise<User>{
    try 
    {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) 
    {
      console.log('ERROR: ', error);
    } 
  }

  //CERRAR SESION
  async logout(): Promise<void>{
    try 
    {
      await this.afAuth.signOut();
      window.location.reload();
    } catch (error) 
    {
      console.log('ERROR: ', error);
    } 
  }

  //VERIFICARLOGIN
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  getCurrentUser(){
    let profile;
    return profile = this.afAuth.authState.pipe(first()).toPromise();
  }

  private updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'SUSCRIPTOR',
    };

    return userRef.set(data, { merge: true });

  }
  // async updatePlayer(email: string, password: string): Promise<User>{
  //   try 
  //   {
  //     const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
  //     await this.afAuth.currentUser
  //     const userRef: AngularFirestoreDocument<User> = this.afs.doc(
  //       `users/${user.uid}`
  //     );
  
  //     const data: User = {
  //       uid: user.uid,
  //       email: user.email,
  //       emailVerified: user.emailVerified,
  //       main: 'EL MIKES',
  //       displayName: user.displayName,
  //       photoURL: user.photoURL,
        
  //     };
  
  //     userRef.set(data, { merge: true });
  //     return user;
  //   } catch (error) 
  //   {
  //     console.log('ERROR: ', error);
  //   }
  // }
  
  //Funciona
  public async updateUserSmash(user: User){
    try 
    {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
      
      let subs: Roles = 'SUSCRIPTOR';
      if (user.email == 'armacomiguel@gmail.com') {
        subs = 'ADMIN';
      } else {
        subs = 'SUSCRIPTOR';
      }

      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        role: subs,
        displayName: user.displayName,
        photoURL: user.photoURL,
        tagName: user.tagName,
        rnkPoints: user.rnkPoints,
        main: user.main,
        secondary: user.secondary,
        state: user.state,
        switchCode: user.switchCode
      };

      return userRef.set(data, { merge: true });
  }
    catch (error) 
    {
      console.log('ERROR: ', error);
    }
  }

  public async updateUserSmashAdmin(user: User){

    // console.log('USAURIO SERVICE: ', user);
    try 
    {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );

      let subs: Roles = 'SUSCRIPTOR';
      if (user.email == 'armacomiguel@gmail.com') {
        subs = 'ADMIN';
      } else {
        subs = 'SUSCRIPTOR';
      }

      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        role: subs,
        displayName: user.displayName,
        photoURL: user.photoURL,
        tagName: user.tagName,
        rnkPoints: user.rnkPoints,
        main: user.main,
        secondary: user.secondary,
        state: user.state,
        switchCode: user.switchCode,
        position: ''
      };

      return userRef.set(data, { merge: true });
  }
    catch (error) 
    {
      console.log('ERROR: ', error);
    }
  }

  public getUsers2(UID: string) {
    const uDetails: any = this.afs.collection('users').doc(UID);
    return uDetails;
  }
   

  // async getUser(id, email, verified){
  //   // console.log('id:', id);
  //   let data: any;
  //   data = await this.afs.collection('users').doc(id).valueChanges().subscribe(value => {
  //     console.log(value);
  //     if(value == undefined) {
  //       try {
  //         const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${id}`);

  //         const data: User = {
  //           uid: id,
  //           email: email,
  //           emailVerified: verified,
  //           role: 'SUSCRIPTOR',
  //           displayName: null,
  //           tagName: null,
  //           main: null,
  //           secondary: null,
  //           switchCode: null
  //         };

  //         return userRef.set(data, { merge: true });
  //     }
  //       catch (error) 
  //       {
  //         console.log('ERROR: ', error);
  //       }

  //     }
  //     else
  //     {

  //     }
  //   });
  //   console.log('USERREF: ',data);
  //   return data;
  // }
  
  

  //GET USER BY UID -- pendiente 
//   public getUserDetails(id){
//     // console.log(id);
//     return this.afs.collection('users').doc(id).ref.get().then(function (doc) {
//       if (doc.exists) {
//         // console.log(doc.data());
//         doc.data();
//       } else {
//         console.log("There is no document!");
//       }
//     }).catch(function (error) {
//       console.log("There was an error getting your document:", error);
//     });
//   }
}
