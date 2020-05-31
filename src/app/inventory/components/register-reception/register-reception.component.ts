import { Component, OnInit, ViewChild } from '@angular/core';
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
export class RegisterReceptionComponent implements OnInit {

  @ViewChild('table', {static : true}) table: DataTableComponent;

  private loading: boolean;
  private headers: object = {code: 'Referencia', displayName: 'Articulo', lot: 'Lote', quantity: 'Cantidad'};
  private data = [
    {id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', displayName: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', quantity: '251'},
    {id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', displayName: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', quantity: '251'},
    {id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', displayName: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', quantity: '251'},
    {id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', displayName: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', quantity: '251'},
    {id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', displayName: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', quantity: '251'},
    {id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', displayName: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', quantity: '251'},
    {id: 1, code: '4 KG GRANEL', displayName: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', displayName: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', quantity: '251'}
  ]

  state: any;

  constructor(private service: RegisterReceptionService, private router: Router, private toast: ToastService) { }

  ngOnInit() {

    //console.log(window.history.state);

  }

  onAddedProduct(product){
    this.table.addItem(product);
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

    this.data.forEach(element => {
      
      products.push({id: element.id, lot: "255", quantity: Number(element.quantity)});

    });

    return products;

  }

}
