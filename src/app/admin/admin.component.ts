import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { RankingService } from '../services/ranking.service';
import { Roles, User } from '../shared/models/user.interFace';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isDisabled: boolean = true;
  isDisabled2: boolean = true;
  isVisible: boolean = false;
  allPlayers = [];
  objectPlayer = {name: '', key: ''};
  dataList = [];

  dataPlayer = {
    uid: '',
    tagName: null,
    rnkPoints: undefined,
  }
  

  playerForm = new FormGroup({
    player: new FormControl('',[Validators.required])
  });

  //player to update
  playerToUpdateForm = new FormGroup({
    rnkPoints: new FormControl('',[Validators.required]),
    uid: new FormControl('',[Validators.required])
  });

  constructor(
    private _snackBar: MatSnackBar,
    private  _rankingService: RankingService,
    private _AuthService: AuthService) { }
  
  ngOnInit() {
    this.retrievePlayers();
  }

  retrievePlayers() {
    this._rankingService.getAll().then(res => {
      res.valueChanges().subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          this.dataList.push(this.objectPlayer = {
            name: res[i].tagName,
            key: res[i].uid
          });
        }
      });
    });
  }

  findPlayer(){
  this.isDisabled = true;
  const { player  } = this.playerForm.value;
  // console.log('Player:' , player);
  this._AuthService.getUsers2(player).valueChanges().subscribe(
    res => { 
      // console.log('FIND: ', res);
        this.dataPlayer = {
        uid: res.uid,
        tagName: res.tagName,
        rnkPoints: res.rnkPoints
      }

// IexpYVCV0FbgcH0qml4M05ZsrBw1

      this.playerToUpdateForm.setValue({
        rnkPoints: this.dataPlayer.rnkPoints,
        uid: this.dataPlayer.uid
      });

    });
    
    this.isVisible = true;
    this.isDisabled2 = false;

}

  iUpdate: boolean = false;
  iTest = 1;

  async updatePlayer(){

    let { uid, rnkPoints  } = this.playerToUpdateForm.value;
    rnkPoints = parseInt(rnkPoints);
  
    
    let dataPlayer = {
      uid: uid,
      email: '',
      emailVerified: true,
      role: null,
      displayName: '',
      photoURL: '',
      tagName: '',
      rnkPoints: rnkPoints,
      main: '',
      secondary: '',
      state: '',
      switchCode: '',
      position: ''
    }

    this._AuthService.getUsers2(uid).valueChanges().subscribe(res=>{

      let subs: Roles = 'SUSCRIPTOR';
      if (res.email == 'armacomiguel@gmail.com') {
        subs = 'ADMIN';
      } else {
        subs = 'SUSCRIPTOR';
      }

      // console.log('GET USER: ', res);
  
      dataPlayer.uid = res.uid;
      dataPlayer.email = res.email;
      dataPlayer.emailVerified = res.emailVerified;
      dataPlayer.role = subs;
      dataPlayer.displayName = res.displayName;
      dataPlayer.photoURL = res.photoURL;
      dataPlayer.tagName = res.tagName;
      dataPlayer.rnkPoints = rnkPoints;
      dataPlayer.main = res.main;
      dataPlayer.secondary = res.secondary;
      dataPlayer.state = res.state;
      dataPlayer.switchCode = res.switchCode;
      dataPlayer.position = res.position;
  

      this.isDisabled2 = true;
      this._AuthService.updateUserSmashAdmin(dataPlayer);
      this.openSnackBar('Puntos Actualizados!');
      // console.log('DATA UPDATED: ',dataPlayer);
      this.isVisible = false;
      this.isDisabled2 = false;
    
    });
    

  // console.log('out: ', this.iUpdate);
    
    
    
      
    
    
  }

  checkData(data){
    data ? this.isDisabled = false : null;

    this.isVisible = false;
    this.isDisabled2 = true;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
    this.isDisabled = false;
  }

}
