import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RankingService} from '../services/ranking.service';
import { smashDataList, SmashPlayerColumns } from '../shared/models/user.interFace';
@Component({
  selector: 'app-mi-tabla',
  templateUrl: './mi-tabla.component.html',
  styleUrls: ['./mi-tabla.component.scss']
})

export class MiTablaComponent implements OnInit {

  constructor(private  _rankingService: RankingService){}

  displayedColumnsSmash: string[];
  dataSource = new MatTableDataSource<smashDataList>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TAG_NAME = sessionStorage.getItem('USERTAGNAME');
  _POINTS = 'Sin Puntos';
  _URLIMGREAL = 'https://github.com/mikepruebas23/IMAGES/blob/master/stock/';
  _URLIMGNULL = 'https://github.com/mikepruebas23/IMAGES/blob/master/logos/logo.jpg?raw=true';
  
  ngOnInit() {
    this.displayedColumnsSmash = SmashPlayerColumns;
    
    this._rankingService.getUsers().then(res=>{res.valueChanges().subscribe(response=>{
      
    let i;
    let cont = 0;
   
    for(i= 0; i<response.length; i++){
      cont++;

      if (response[i].tagName == null){  
        response[i].tagName = 'Actualiza tu info';
      }
      if(response[i].main === null){
        // response[i].rnkPoints = this._POINTS ;
        response[i].main =this._URLIMGNULL;
      }
      else 
      {
        response[i].main =this._URLIMGREAL + response[i].main +'?raw=true';
      }
      

      response[i].position = cont;
    }

    this.dataSource = new MatTableDataSource<smashDataList>(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
    
  })});
    
  }
}
