import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterReceptionService } from '../../services/register-reception.service';
import { timeout, catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/inventory/services/toast.service';

@Component({
  selector: 'app-register-reception',
  templateUrl: './register-reception.component.html',
  styleUrls: ['./register-reception.component.scss']
})
export class RegisterReceptionComponent {

  @ViewChild('add_product', {static: false}) add_product;
  loading: boolean;
  rows = [
    // {index: 0, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel34', quantity: '251'},
    // {index: 1, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel23', quantity: '251'},
    // {index: 2, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel24', quantity: '251'},
    // {index: 3, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel53', quantity: '251'},
    // {index: 4, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel12', quantity: '251'},
    // {index: 5, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel135', quantity: '251'},
    // {index: 6, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1325', quantity: '251'},
    // {index: 7, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel178', quantity: '251'}
  ]

  messages = {
    emptyMessage: "¡No se ha agregado ningún producto!"
  }

  totalQuantity: number = 0;

  private index: number = 0;
  private addedItem: boolean;

  constructor(private service: RegisterReceptionService, private router: Router, private toast: ToastService) { }

  onAddedProduct(product){
    product.index = this.index++;
    this.rows.push(product);
    this.rows = [...this.rows];
    this.addedItem = true;
    this.totalQuantity += product.quantity
  }

  removeItem(product){
    this.rows = this.rows.filter((element) => element.index != product.index);
    this.totalQuantity -= product.quantity
  }

  ngAfterViewChecked(){

    if(this.addedItem){
        document.querySelector('.datatable-body').scrollBy(0, 10000);
        this.addedItem = false;
    }

  }

  confirmReception(){

      const reception = {
        farmId: this.add_product.farm.id,
        products: this.getProductsFromTable()
      };

      this.createReception(reception);
      console.log("RECEPTION: ", reception);

  }

  private createReception(reception) {

    this.loading = true;

    this.service.mutate({reception}).subscribe(result => {

      this.loading = false;

      if(result.errors){
        
        result.errors.forEach(error => {
          console.error(error);
        });
        
      } else {

        this.toast.showSuccess("La recepción se registró correctamente", "Recepción registrada");
        this.router.navigate(['/reception']);

      }

    }, error => this.loading = false);

  }

  private getProductsFromTable(){

    const products = [];

    this.rows.forEach(element => {
      
      let product = {id: element.id, quantity: Number(element.quantity)}

      if(element.lot)
        product["lot"] = element.lot

      products.push(product);

    });

    return products;

  }

}
