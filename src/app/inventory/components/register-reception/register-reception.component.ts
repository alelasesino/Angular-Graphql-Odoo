import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'apollo-link';
import { DataTableComponent } from '../data-table/data-table.component';
import { RegisterReceptionService } from '../../services/register-reception.service';
import { timeout, catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/inventory/services/toast.service';

@Component({
  selector: 'app-register-reception',
  templateUrl: './register-reception.component.html',
  styleUrls: ['./register-reception.component.scss']
})
export class RegisterReceptionComponent {

  private loading: boolean;
  private rows = [
    // {index: 0, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel34', quantity: '251'},
    // {index: 1, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel23', quantity: '251'},
    // {index: 2, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel24', quantity: '251'},
    // {index: 3, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel53', quantity: '251'},
    // {index: 4, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel12', quantity: '251'},
    // {index: 5, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel135', quantity: '251'},
    // {index: 6, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1325', quantity: '251'},
    // {index: 7, id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel178', quantity: '251'}

  ]

  private messages = {
    emptyMessage: "¡No se ha agregado ningún producto!"
  }

  @ViewChild("datatable", { static: true }) datatable;
  private index: number = 0;
  private addedItem: boolean;

  constructor(private service: RegisterReceptionService, private router: Router, private toast: ToastService, private elementRef: ElementRef) { }

  onAddedProduct(product){
    product.index = this.index++;
    this.rows.push(product);
    this.rows = [...this.rows]
    this.addedItem = true;
  }

  removeItem(row){
    this.rows = this.rows.filter((element) => element.index != row.index);
  }

  ngAfterViewChecked(){

    if(this.addedItem){
        document.querySelector('.datatable-body').scrollBy(0, 10000);
        this.addedItem = false;
    }

  }

  confirmReception(){

    const reception = {
      farm_id: 31,
      products: this.getProducts()
    };

    this.loading = true;

    this.service.mutate({reception}).pipe(

      timeout(5000), catchError(err => {

        this.toast.showError("No se ha podido establecer conexión con el servidor", "Error Conexión");
        throw new Error('Error Connection'); 

      })

    ).subscribe(result => {

      this.loading = false;

      if(result.errors){
        
        result.errors.forEach(error => {
          console.error(error)
        });
        
      } else {

        this.toast.showSuccess("La recepción se registró correctamente", "Recepción registrada");
        this.router.navigate(['/reception']);

      }

    }, error => this.loading = false);

  }

  private getProducts(){

    const products = [];

    this.rows.forEach(element => {
      
      products.push({id: element.id, lot: "255", quantity: Number(element.quantity)});

    });

    return products;

  }

  columns

  adjustColumnMinWidth() {
    const element = this.elementRef.nativeElement as HTMLElement;
    const rows = element.getElementsByTagName("datatable-body-row");
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("datatable-body-cell");
      for (let k = 0; k < cells.length; k++) {
        const cell = cells[k];
        const cellSizer = cell.children[0].children[0] as HTMLElement;
        const sizerWidth = cellSizer.getBoundingClientRect().width;
        if (30 < sizerWidth) {
          //this.columns[k].minWidth = sizerWidth;
        }
      }
    }
}

}
