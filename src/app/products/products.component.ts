import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( private _productService: ProductService,) { }
  public products = [];
  showProducts = [];
  // showProducts = [{id:'x',name: 'cajita', cost: 0}];
  // iTotal: number = 0;
  sTotal: string = '0.00';
  iResult: number = 0;
  iCost = 0;
  sCost: string;
  newiCost = 0;
  newsCost: string;

  ngOnInit() {
    this._productService.getAllProducts().subscribe((catsSnapshot) => {
      this.products = [];
      catsSnapshot.forEach((productData: any) => {
        this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
      })
    });
  }

  addProduct(nameProduct,price){

    let addProduct;
    
    price.indexOf(".") ? price = parseFloat(price) : price = parseInt(price);
    // let result = this.showProducts.findIndex(x => x.name === nameProduct);
    let result = this.showProducts.find(x => x.name === nameProduct);
    
    if(result == undefined) {
      this.newiCost = price; //int
      this.newsCost = this.newiCost.toFixed(2); // string

      addProduct = {
        id: nameProduct+ price,
        name:nameProduct,
        cant:1, 
        cost: this.newsCost,
        value: price
      }

      this.showProducts.push(addProduct);
    }
    else{
      let x = this.showProducts.find(x => x.name === nameProduct);
      x.cant = x.cant + 1;
      this.iCost =  x.cant * price; //int
      this.sCost = this.iCost.toFixed(2); //string
      x.cost = this.sCost;
    }
   
    this.iResult = this.iResult + price; // int
    this.sTotal = this.iResult.toFixed(2); // string
  }

  eliminar(id){
    for( var i = 0; i < this.showProducts.length; i++){ 
    
      if ( this.showProducts[i].id === id) { 
        let x = this.showProducts[i].value * this.showProducts[i].cant;
        this.iResult = this.iResult - x;
        this.sTotal = this.iResult.toFixed(2);
        this.showProducts.splice(i, 1);
      }
    }
  }

  menosuno(id){
    for( var i = 0; i < this.showProducts.length; i++){ 
    
      if ( this.showProducts[i].id === id) { 

        this.showProducts[i].cant = this.showProducts[i].cant -1; // 2,2
        let iCost = this.showProducts[i].cant * this.showProducts[i].value; // 2
        let s = iCost.toFixed(2); // '2.00'
        this.showProducts[i].cost = s;
      
        let z;
        this.sTotal.indexOf(".") ? z = parseFloat(this.sTotal)  - this.showProducts[i].value : z = parseInt(this.sTotal)  - this.showProducts[i].value;
        this.iResult =  this.iResult - this.showProducts[i].value;
        console.log("RESULT: ",this.iResult)
        this.sTotal = z.toFixed(2);
        console.log(this.sTotal);
        // console.log(this.showProducts[i]);

        if(this.showProducts[i].cant == 0){
          this.showProducts.splice(i, 1);
        }
        break;
      }
    }
  }

  limpiarCarrito(){
    this.showProducts = [];
    this.iResult = 0;
    this.sTotal = '0.00';
  }
}


// 117