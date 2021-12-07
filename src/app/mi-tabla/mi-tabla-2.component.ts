import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MiTablaDataSource, MiTablaItem } from './mi-tabla-datasource';
import { RankingService} from '../services/ranking.service';

export interface MiTablaItem2 {
  uid?: string;
  email?: string;
  password?: string;
  emailVerified?: boolean;
  firstTime?: boolean;
  photoURL?: string;
  displayName?: string;
  tagName?: string;
  main?: string;
  role?: string;
  secondary?: string;
  switchCode?: string;
}

const EXAMPLE_DATA_SMASH: MiTablaItem2[] = [{
  displayName: 'Migue', 
  email: "armacomiguel@gmail.com", 
  emailVerified: true,
  main: 'Luigi', 
  role: 'SUSCRIPTOR',
  secondary: 'DK', 
  switchCode: '13',
  tagName: 'ELMIKE',
  uid: "ErH82WPbSNY8xjXJs52C87WrJ9G2"
}];

@Component({
  selector: 'app-mi-tabla',
  templateUrl: './mi-tabla.component.html',
  styleUrls: ['./mi-tabla.component.scss']
})


export class MiTablaComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MiTablaItem>;
  dataSource: MiTablaDataSource;

  constructor(private  _rankingService: RankingService){}

  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['displayName', 'email', 'emailVerified','main','role','secondary','switchCode','tagName', 'uid'];

  response = {
    uid: '0',
    email: '0',
    password: '0',
    emailVerified: false,
    photoURL: '0',
    firstTime: false,
    displayName: 'displayName',
    tagName: 'tagName', 
    main: 'main',
    secondary: 'secondary',
    switchCode: 'switchCode'
  }

  dataSMashUSer = {
    name: ''
  }
  
  dataSMashUSer2: MiTablaItem2[] = [{}];


  ngOnInit() {
    this.dataSource = new MiTablaDataSource();
    // console.log(this.dataSource.data);
    // this.dataSource.data = this.response;
    let data = this._rankingService.getUsers().then(res=>{res.valueChanges().subscribe(response=>{
      
      
    for (let entry of response) {
      // console.log(entry.main);
      // this.dataSMashUSer.name = entry.main;
      this.dataSMashUSer2.push(entry);
      // entry = new MiTablaDataSource();
    }
    // this.dataSource = response;
    // this.dataSource = new MiTablaDataSource();
    // this.dataSource.data = this.dataSMashUSer2;
    // console.log('this.dataSource.data',this.dataSource.data);
    // this.dataSource = new MiTablaDataSource();

    // console.log('GG',this.dataSMashUSer2);
  })});
    // console.log('RESPONSE: ', data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
