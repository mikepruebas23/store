import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/products.service'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './../shared/models/product.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})

export class CreateProductComponent implements OnInit {

  uploadPercent: Observable<number>;
  uploadPercentUpdate: Observable<number>;
  urlImage: Observable<string>;
  urlImage2:any;
  urlImageUpdate:any;
  userUid: string;

  isVisible: boolean = false;
  isVisibleText: string = "Actualizar/Borrar Producto";

  newProduct: Product = {
    uid: '',
    photoURL:'',
    name: '',
    desc: '',
    category: '',
    price: '',
    stock: 0,
    weight: '0',
  }

  dataProduct: Product = {
    uid: '',
    photoURL:'',
    name: '',
    desc: '',
    category: '',
    price: '',
    stock: 0,
    weight: '0',
  }

  public products = [];
  objectProducts = {
    key: '',
    name: ''
  };
 
  createForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    desc: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required, Validators.pattern(/^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/)]),
    // weight: new FormControl('',[Validators.required, Validators.pattern(/^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/)]),
    stock: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),
  });

  updateForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    desc: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required, Validators.pattern(/^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/)]),
    stock: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),
    // weight: new FormControl('',[Validators.required, Validators.pattern(/^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/)]),
  });

  findProductForm = new FormGroup({
    findproduct: new FormControl('',[Validators.required])
  });

  category = [
    {name: 'Abarrotes'},
    {name: 'Higiene y Limpieza'},
    {name: 'Bebidas'},
    {name: 'Dulceria'}
  ];
  
  constructor(
    private _productService: ProductService,
    private afs: AngularFirestore,
    private afsimage: AngularFireStorage,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar) {}

  @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('fileInput') fileInput:ElementRef;

  ngOnInit() {

    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = 12;
    for ( var i = 0; i < charactersLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 62));
    }
    this.newProduct.uid = result;

    this. getListProduct();
  }

  clickIMG(){
    this.fileInput.nativeElement.click()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 7000,
    });
  }
    
  createProduct() {

    const { name, desc, category, price, stock  } = this.createForm.value;
    
    this.newProduct.name = name;
    this.newProduct.desc = desc;
    this.newProduct.category = category;
    this.newProduct.price = price;
    this.newProduct.stock = stock;

    if (this.urlImage2) {
      this.newProduct.photoURL = this.urlImage2;
    } else {
      this.newProduct.photoURL = '';
    }

    
    this._productService.createProduct(this.newProduct);
    this.openSnackBar('Producto Agregado con Exito!');

    this.createForm.setValue({
      name: '',
      desc: '',
      category: '',
      price: '',
      stock: '',
    });

    this.products = [];

  } 

  onUpload1(e){
    
    const id = this.newProduct.uid;
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.afsimage.ref(filePath);
    const task = this.afsimage.upload(filePath, file);
    // number == 1 ? this.uploadPercent = task.percentageChanges() :this.uploadPercentUpdate = task.percentageChanges();;
    
    task.snapshotChanges().pipe(finalize(()=>{ 
      this.urlImage = ref.getDownloadURL();
      this.urlImage.subscribe(res=>{
        this.urlImage2 = res;
        // number == 1 ? this.urlImage2 = res : this.urlImageUpdate = res;
      });
      
    })).subscribe();
    
  }
  onUpload2(e){
    
    const id = this.dataProduct.uid;
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.afsimage.ref(filePath);
    const task = this.afsimage.upload(filePath, file);
    // number == 1 ? this.uploadPercent = task.percentageChanges() :this.uploadPercentUpdate = task.percentageChanges();;
    
    task.snapshotChanges().pipe(finalize(()=>{ 
      this.urlImage = ref.getDownloadURL();
      this.urlImage.subscribe(res=>{
        this.urlImageUpdate = res;
        // number == 1 ? this.urlImage2 = res : this.urlImageUpdate = res;
      });
      
    })).subscribe();
    
  }

  //Get List Product
  getListProduct(){

    this._productService.getAll().then(res => {
      res.valueChanges().subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          this.products.push(this.objectProducts = {
            key: res[i].uid,
            name: res[i].name
          });
        }
      });
    });
  }

  findProduct(){

    const { findproduct  } = this.findProductForm.value;

    this._productService.getProductByUID(findproduct).valueChanges().subscribe(
      res => {
          this.dataProduct = {
          uid: res.uid,
          photoURL: res.photoURL,
          name: res.name,
          desc: res.desc,
          category: res.category,
          price: res.price,
          stock: res.stock
        }

        this.updateForm.setValue({
          name: this.dataProduct.name,
          desc: this.dataProduct.desc,
          category: this.dataProduct.category,
          price: this.dataProduct.price,
          stock: this.dataProduct.stock,
        });

        // console.log(this.dataProduct);
        this.urlImageUpdate = res.photoURL;
    });
  }

  updateProduct(){

    if(this.dataProduct.uid == '' || this.dataProduct.uid == undefined || this.dataProduct.uid == null) {
      this.openSnackBar('Primero Busque el Producto que quiere Actualizar!');
      return;
    }

    let {name,desc, category, price, stock} = this.updateForm.value;

    if (this.urlImageUpdate) {
      this.dataProduct.photoURL = this.urlImageUpdate;
    } else {
      this.dataProduct.photoURL = '';
    }
  
    this.dataProduct.name = name;
    this.dataProduct.desc = desc;
    this.dataProduct.category = category;
    this.dataProduct.price = price;
    this.dataProduct.stock = stock;

    this._productService.updateProduct(this.dataProduct.uid, this.dataProduct).then(() => {
      
      this.openSnackBar('Producto actualizado correctamente!');
      this.updateForm.setValue({
        name: '',
        desc: '',
        category: '',
        price: '',
        stock: ''
      });
  
      this.products = [];
      this. getListProduct();
    });
  }

  manualtoggle(){
    this.isVisible = !this.isVisible;
    this.isVisible == false ? this.isVisibleText = "Actualizar/Borrar Producto" : this.isVisibleText = "Alta Producto";  
  }

}