import { Component, OnInit } from '@angular/core';
import { RegisterCodeService } from './register-code.service';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.scss']
})
export class RegisterCodeComponent implements OnInit {

  constructor(private _RegisterCodeService: RegisterCodeService) { }
  ID: string = '132456789123'
  ngOnInit() {

    // this._RegisterCodeService.updateCodeFriend(this.ID);

    this._RegisterCodeService.getCodeFriend(this.ID).then(res=>{
      res.valueChanges().subscribe(response=>{
        console.log('RESPONSE: ', response);
      })
    });

    //create
    this._RegisterCodeService.createCodeFriend(this.ID);
  }

}
