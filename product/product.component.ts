import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private product_pic: string;
  private product_name: string;
  private product_cost: number;
  private products: any[] = [];
  private key: string = '';
  private btn_stt : boolean = true;
  constructor(private http: Http) { }

  ngOnInit() {
    this.getProducts();
  }

  updateProduct(){
    let data = {
      name: this.product_name,
      cost: this.product_cost,
      pic: this.product_pic
    };
    this.http.put('https://ecommerce-1e66c.firebaseio.com/products/' + this.key + '.json',data).subscribe(
      (res) => {
      console.log('Record updated   ')
      this.getProducts();
      },
      (error) => {
        console.log('The error is ', error)
      }

    )
  }

  editProduct(product: any) {
    this.key = product.key;
    this.product_pic = product.record.pic;
    this.product_name = product.record.name;
    this.product_cost = product.record.cost;
    this.btn_stt = false;
  }
  getProducts() {
    this.http.get('https://ecommerce-1e66c.firebaseio.com/products.json').subscribe(
      (res) => {
        let productObject = res.json();
        let keys = Object.keys(productObject)
        this.products = keys.map(function (x) {
          return { key: x, record: productObject[x] }
        })
      },
      (error) => {
        console.log('The error is ', error)
      }

    )
  }

  clearForm() {
    this.product_name = '';
    this.product_cost = 0;
  }

  deleteRecord(key) {

    this.http.delete('https://ecommerce-1e66c.firebaseio.com/products/' + key + '.json').subscribe(
      (res) => {
        console.log('record deleted')
        // this.clearForm();
        this.getProducts();
      },
      (error) => {
        console.log('The error is ', error)
      }


    )

  }

  saveProduct() {
    let data = {
      name: this.product_name,
      cost: this.product_cost,
      pic: this.product_pic
    };
    this.http.post('https://ecommerce-1e66c.firebaseio.com/products.json', data).subscribe(
      (res: Response) => {
        console.log('record saved')
        this.clearForm();
        this.getProducts();
      },
      (error) => {
        console.log('The error is ', error)
      }


    )
  }
}
