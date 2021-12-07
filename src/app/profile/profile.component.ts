import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Roles, User } from './../shared/models/user.interFace';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;
  nameMain = sessionStorage.getItem('USERMAIN');
  isDisabled: boolean = false;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImage2:any;
  userUid: string;
 
  user2: User = {
    uid: sessionStorage.getItem('USERUID'),
    email: sessionStorage.getItem('USEREMAIL'),
    emailVerified: true,
    displayName: '',
    photoURL: sessionStorage.getItem('USERPHOTOURL'),
    tagName: '',
    role: null,
    rnkPoints: parseInt(sessionStorage.getItem('RNKPOINTS')),
    main: '',
    secondary: '',
    state: '',
    switchCode: '',
    position: ''
  }
 
  loginForm = new FormGroup({
    displayName: new FormControl(sessionStorage.getItem('USERDISPLAYNAME'),[Validators.required]),
    tagName: new FormControl(sessionStorage.getItem('USERTAGNAME'),[Validators.required]),
    main: new FormControl(sessionStorage.getItem('USERMAIN'),[Validators.required]),
    secondary: new FormControl(sessionStorage.getItem('USERSECONDARY')),
    state: new FormControl(sessionStorage.getItem('USERSTATE')),
    switchCode: new FormControl(sessionStorage.getItem('USERSWITCHCODE'))
  });

  iconSmash  = [
  {
    name: 'Banjo',
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/BANJO.png?raw=true',
    value: 'BANJO.png'
  },
  {
    name: 'Bayonetta',
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/BAYONETTA.png?raw=true',
    value: 'BAYONETTA.png'
  },
  {
    name: 'Bowser',
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/BOWSER.png?raw=true',
    value: 'BOWSER.png'
  },
  {
    name: 'Bowser Jr', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/BOWSERJR.png?raw=true',
    value: 'BOWSERJR.png'
  }
  ,
  {
    name: 'Byleth', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/BYLETH.png?raw=true',
    value: 'BYLETH.png'
  }
  ,
  {
    name: 'Capitan Falcon', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/CFALCON.png?raw=true',
    value: 'CFALCON.png'
  }
  ,
  {
    name: 'Chrom', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/CHROM.png?raw=true',
    value: 'CHROM.png'
  }
  ,
  {
    name: 'Cloud', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/CLOUD.png?raw=true',
    value: 'CLOUD.png'
  }
  ,
  {
    name: 'Corrin', 
    ImageUrl: "https://github.com/mikepruebas23/IMAGES/blob/master/stock/CORRIN.png?raw=true",
    value: 'CORRIN.png'
  }
  ,
  {
    name: 'Daisy', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/DAISY.png?raw=true',
    value: 'DAISY.png'
  }
  ,
  {
    name: 'Dark Pit', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/DARKPIT.png?raw=true',
    value: 'DARKPIT.png'
  }
  ,
  {
    name: 'Dark Samus', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/DARKSAMUS.png?raw=true',
    value: 'DARKSAMUS.png'
  }
  ,
  {
    name: 'Diddy Kong', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/DIDDY.png?raw=true',
    value: 'DIDDY.png'
  }
  ,
  {
    name: 'Donkey Kong', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/DK.png?raw=true',
    value: 'DK.png'
  }
  ,
  {
    name: 'DR.Mario', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/DRMARIO.png?raw=true',
    value: 'DRMARIO.png'
  }
  ,
  {
    name: 'Duck Hunt', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/DUCKHUNT.png?raw=true',
    value: 'DUCKHUNT.png'
  }
  ,
  {
    name: 'Falco', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/FALCO.png?raw=true',
    value: 'FALCO.png'
  }
  ,
  {
    name: 'Fox', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/FOX.png?raw=true',
    value: 'FOX.png'
  }
  ,
  {
    name: 'Ganondorf', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/GANONDORF.png?raw=true',
    value: 'GANONDORF.png'
  }
  ,
  {
    name: 'Greninja', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/GRENINJA.png?raw=true',
    value: 'GRENINJA.png'
  }
  ,
  {
    name: 'Hero', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/HERO.png?raw=true',
    value: 'HERO.png'
  }
  ,
  {
    name: 'Ice Climbers', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ICECLIMBERS.png?raw=true',
    value: 'ICECLIMBERS.png'
  }
  ,
  {
    name: 'Ike', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/IKE.png?raw=true',
    value: 'IKE.png'
  }
  ,
  {
    name: 'Link', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/LINK.png?raw=true',
    value: 'LINK.png'
  }
  ,
  {
    name: 'Incineroar', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/INCINEROAR.png?raw=true',
    value: 'INCINEROAR.png'
  }
  ,
  {
    name: 'Inkling', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/INKLING.png?raw=true',
    value: 'INKLING.png'
  }
  ,
  {
    name: 'Isabelle', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ISABELLE.png?raw=true',
    value: 'ISABELLE.png'
  }
  ,
  {
    name: 'Jigglypuff', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/JIGGLYPUFF.png?raw=true',
    value: 'JIGGLYPUFF.png'
  }
  ,
  {
    name: 'Joker', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/JOKER.png?raw=true',
    value: 'JOKER.png'
  }
  ,
  {
    name: 'Ken', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/KEN.png?raw=true',
    value: 'KEN.png'
  }
  ,
  {
    name: 'King Dedede', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/KINGDEDEDE.png?raw=true',
    value: 'KINGDEDEDE.png'
  }
  ,
  {
    name: 'King K. Rool', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/KINGKROOL.png?raw=true',
    value: 'KINGKROOL.png'
  },
  {
    name: 'Kirby', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/KIRBY.png?raw=true',
    value: 'KIRBY.png'
  }
  ,
  {
    name: 'Link', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/LINK.png?raw=true',
    value: 'LINK.png'
  }
  ,
  {
    name: 'Little Mac', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/LITTLEMAC.png?raw=true',
    value: 'LITTLEMAC.png'
  }
  ,
  {
    name: 'Lucario', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/LUCARIO.png?raw=true',
    value: 'LUCARIO.png'
  }
  ,
  {
    name: 'Lucas', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/LUCAS.png?raw=true',
    value: 'LUCAS.png'
  }
  ,
  {
    name: 'Lucina', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/LUCINA.png?raw=true',
    value: 'LUCINA.png'
  }
  ,
  {
    name: 'Luigi', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/LUIGI.png?raw=true',
    value: 'LUIGI.png'
  }
  ,
  {
    name: 'Mario', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/MARIO.png?raw=true',
    value: 'MARIO.png'
  }
  ,
  {
    name: 'Marth', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/MARTH.png?raw=true',
    value: 'MARTH.png'
  }
  ,
  {
    name: 'MegaMan', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/MEGAMAN.png?raw=true',
    value: 'MEGAMAN.png'
  }
  ,
  {
    name: 'Metaknight', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/METAKNIGHT.png?raw=true',
    value: 'METAKNIGHT.png'
  }
  ,
  {
    name: 'MewTwo', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/MEWTWO.png?raw=true',
    value: 'MEWTWO.png'
  }
  ,
  {
    name: 'MR. Game And Watch', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/MGAW.png?raw=true',
    value: 'MGAW.png'
  }
  ,
  {
    name: 'Mii Fighter', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/MIIFIGHTER.png?raw=true',
    value: 'MIIFIGHTER.png'
  }
  ,
  {
    name: 'MinMin', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/MINMIN.png?raw=true',
    value: 'MINMIN.png'
  }
  ,
  {
    name: 'Ness', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/NESS.png?raw=true',
    value: 'NESS.png'
  }
  ,
  {
    name: 'Olimar', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/OLIMAR.png?raw=true',
    value: 'OLIMAR.png'
  }
  ,
  {
    name: 'Pac-Man', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/PACMAN.png?raw=true',
    value: 'PACMAN.png'
  }
  ,
  {
    name: 'Palutena', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/PALUTENA.png?raw=true',
    value: 'PALUTENA.png'
  }
  ,
  {
    name: 'Pichu', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/PICHU.png?raw=true',
    value: 'PICHU.png'
  }
  ,
  {
    name: 'Pikachu', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/PIKACHU.png?raw=true',
    value: 'PIKACHU.png'
  }
  ,
  {
    name: 'Planta Piraña', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/PIRANHAPLANT.png?raw=true',
    value: 'PIRANHAPLANT.png'
  }
  ,
  {
    name: 'Pit', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/PIT.png?raw=true',
    value: 'PIT.png'
  }
  ,
  {
    name: 'Pokemon Trainer', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/PKMNTRAINER.png?raw=true',
    value: 'PKMNTRAINER.png'
  }
  ,
  {
    name: 'Richter', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/RICHTER.png?raw=true',
    value: 'RICHTER.png'
  }
  ,
  {
    name: 'Ridley', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/RIDLEY.png?raw=true',
    value: 'RIDLEY.png'
  }
  ,
  {
    name: 'Rob', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ROB.png?raw=true',
    value: 'ROB.png'
  }
  ,
  {
    name: 'Robin', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ROBIN.png?raw=true',
    value: 'ROBIN.png'
  }
  ,
  {
    name: 'Rosalina', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ROSALINA.png?raw=true',
    value: 'ROSALINA.png'
  }
  ,
  {
    name: 'Roy', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ROY.png?raw=true',
    value: 'ROY.png'
  }
  ,
  {
    name: 'Ryu', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/RYU.png?raw=true',
    value: 'RYU.png'
  }
  ,
  {
    name: 'Samus', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/SAMUS.png?raw=true',
    value: 'SAMUS.png'
  }
  ,
  {
    name: 'Sheik', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/SHEIK.png?raw=true',
    value: 'SHEIK.png'
  }
  ,
  {
    name: 'Shulk', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/SHULK.png?raw=true',
    value: 'SHULK.png'
  }
  ,
  {
    name: 'Simon', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/SIMON.png?raw=true',
    value: 'SIMON.png'
  }
  ,
  {
    name: 'Snake', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/SNAKE.png?raw=true',
    value: 'SNAKE.png'
  }
  ,
  {
    name: 'Sonic', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/SONIC.png?raw=true',
    value: 'SONIC.png'
  }
  ,
  {
    name: 'Steve', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/STEVE.png?raw=true',
    value: 'STEVE.png'
  }
  ,
  {
    name: 'Terry', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/TERRY.png?raw=true',
    value: 'TERRY.png'
  }
  ,
  {
    name: 'Toon Link', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/TOONLINK.png?raw=true',
    value: 'TOONLINK.png'
  }
  ,
  {
    name: 'Villager', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/VILLAGER.png?raw=true',
    value: 'VILLAGER.png'
  }
  ,
  {
    name: 'Wario', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/WARIO.png?raw=true',
    value: 'WARIO.png'
  }
  ,
  {
    name: 'Wii Fit Trainer', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/WIIFITRAINER.png?raw=true',
    value: 'WIIFITRAINER.png'
  }
  ,
  {
    name: 'Wolf', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/WOLF.png?raw=true',
    value: 'WOLF.png'
  }
  ,
  {
    name: 'Yoshi', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/YOSHI.png?raw=true',
    value: 'YOSHI.png'
  }
  ,
  {
    name: 'Young Link', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/YOUNGLINK.png?raw=true',
    value: 'YOUNGLINK.png'
  },
  {
    name: 'Zelda', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ZELDA.png?raw=true',
    value: 'ZELDA.png'
  }
  ,
  {
    name: 'Zero Suit Samus', 
    ImageUrl: 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/ZEROSUITSAMUS.png?raw=true',
    value: 'ZEROSUITSAMUS.png'
  }
  ];

  states = [
    {name: 'Aguascalientes'},
    {name: 'Baja California'},
    {name: 'Baja California Sur'},
    {name: 'Campeche'},
    {name: 'Chiapas'},
    {name: 'Chihuahua'},
    {name: 'Coahuila'},
    {name: 'Colima'},
    {name: 'CDMX'},
    {name: 'Durango'},
    {name: 'Estado de México'},
    {name: 'Guanajuato'},
    {name: 'Guerrero'},
    {name: 'Hidalgo'},
    {name: 'Jalisco'},
    {name: 'Michoacán'},
    {name: 'Morelos'},
    {name: 'Nayarit'},
    {name: 'Nuevo León'},
    {name: 'Oaxaca'},
    {name: 'Puebla'},
    {name: 'Querétaro'},
    {name: 'Quintana Roo'},
    {name: 'San Luis Potosí'},
    {name: 'Sinaloa'},
    {name: 'Sonora'},
    {name: 'Tabasco'},
    {name: 'Tamaulipas'},
    {name: 'Tlaxcala'},
    {name: 'Veracruz'},
    {name: 'Yucatán'},
    {name: 'Zacatecas'}
  ];
  
  constructor(
    private authSvc: AuthService,
    private afs: AngularFirestore,
    private afsimage: AngularFireStorage,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar) {
      
  }

  @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('sCode') myDiv: ElementRef;
  @ViewChild('fileInput') fileInput:ElementRef;

 

  getCurrentUSer(){
    this.authSvc.isAuth().subscribe(user => {
      if (user){
        return this.userUid = user.uid;
      }
    })
  }

  ngOnInit() {
    this.urlImage2 = sessionStorage.getItem('USERPHOTOURL');
  }
  clickIMG(){
    this.fileInput.nativeElement.click()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
    this.isDisabled = false;
  }
    
  updateUser(){
    this.isDisabled = true;
    const { displayName, tagName, main, secondary, state, switchCode  } = this.loginForm.value;
    
    this.user2.displayName = displayName;
    this.user2.tagName = tagName;
    this.user2.main = main;
    this.user2.secondary = secondary;
    this.user2.state = state;
    this.user2.switchCode = switchCode;

    if (this.urlImage2) {
      this.user2.photoURL = this.urlImage2;
    } else {
      this.user2.photoURL = '';
    }

    let subs: Roles = 'SUSCRIPTOR';
    if ( sessionStorage.getItem('USEREMAIL') == 'armacomiguel@gmail.com') {
      subs = 'ADMIN';
    } else {
      subs = 'SUSCRIPTOR';
    }

    this.user2.role = subs;
    
    // console.log(this.user2);
    this.authSvc.updateUserSmash(this.user2);

    sessionStorage.removeItem('USERDISPLAYNAME');
    sessionStorage.removeItem('USEREMAIL',);
    sessionStorage.removeItem('USERMAIN',);
    sessionStorage.removeItem('USERSECONDARY');
    sessionStorage.removeItem('USERSTATE');
    sessionStorage.removeItem('USERTAGNAME');
    sessionStorage.removeItem('RNKPOINTS');
    sessionStorage.removeItem('USERUID');
    sessionStorage.removeItem('USERPHOTOURL');
    sessionStorage.removeItem('USERSWITCHCODE');

    sessionStorage.setItem('USERDISPLAYNAME',this.user2.displayName);
    sessionStorage.setItem('USEREMAIL',this.user2.email);
    sessionStorage.setItem('USERMAIN',this.user2.main);
    sessionStorage.setItem('USERSECONDARY',this.user2.secondary);
    sessionStorage.setItem('USERSTATE', this.user2.state);
    sessionStorage.setItem('USERTAGNAME',this.user2.tagName);
    sessionStorage.setItem('RNKPOINTS',this.user2.rnkPoints.toString());
    sessionStorage.setItem('USERUID',this.user2.uid);
    sessionStorage.setItem('USERPHOTOURL',this.user2.photoURL);
    sessionStorage.setItem('USERSWITCHCODE',this.user2.switchCode);

    this.openSnackBar('Datos Actualizados Correctamente!');
    this.isDisabled = false;
  } 

  onUpload(e){
    // console.log('IMAGEN: ', e.target.files[0]);
    // const id = Math.random().toString(36).substring(2);
    const id = sessionStorage.getItem('USERUID');
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    // const ref = this.afs.ref(filePath);
    const ref = this.afsimage.ref(filePath);
    const task = this.afsimage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    
    task.snapshotChanges().pipe(finalize(()=>{ 
      this.urlImage = ref.getDownloadURL();
      this.urlImage.subscribe(res=>{
        this.urlImage2 = res
        // console.log(this.uploadPercent);
      });
      
    })).subscribe();
    
  }

  //Format to friend code
  formatCodeFriend(value) {
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,12}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    let i;
    let len;
    for (i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4));
    }
    if (parts.length) {
     
      return parts.join('-');
    } else {
      
      return  value;
    }
  }

  FormatNumber() {
    let { switchCode  } = this.loginForm.value;
    this.myDiv.nativeElement.value = this.formatCodeFriend(switchCode)
  }
}

