import { Component } from '@angular/core';
import { OriginLocationComponent } from '../origin-location/origin-location.component';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent {

  rows = [
    // {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', time: '12:00', quantity: '251'},
    // {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', time: '17:00', quantity: '251'},
    // {id: 3, code: '4 KG GRANEL', displayName: 'Caja de granel3', time: '19:00', quantity: '251'}
  ]
  
  messages = {
    emptyMessage: "¡No se ha registrado ninguna recepción hoy!"
  }
  
  lot: string;
  totalQuantity: number = 0;

  constructor(private service:InventoryService, private router: Router) { }

  refreshReceptionTable(lot) {
    
    this.lot = lot
    
    const sub = this.service.getReceptions(lot).subscribe(result => {

      this.rows.length = 0;
      
      result.data.receptions.forEach(reception => {

        const time = reception.time;

        reception.receiveProducts.forEach(product => {
          
          this.rows.push({id: product.id, code: product.code, displayName: product.displayName, time: time, quantity: product.kilos});

        });

      });

      this.rows = [...this.rows];
      this.calculateTotalQuantity();
      sub.unsubscribe();

    });

  }

  navigateToRegister() {
    this.router.navigateByUrl('reception/register');
  }

  calculateTotalQuantity() {
    this.totalQuantity = 0;
    this.rows.forEach(row => {
      this.totalQuantity += Number(row.quantity);
    });
  }

}
