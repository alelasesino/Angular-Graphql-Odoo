import { Component, OnInit, ViewChild } from '@angular/core';
import { OriginLocationComponent } from '../origin-location/origin-location.component';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  private headers: object = {code: 'Referencia', display_name: 'Articulo', time: 'Hora', quantity: 'Cantidad'};
  private data = [
    //{id: 3, code: '4 KG GRANEL', display_name: 'Caja de granel3', time: '18:00', quantity: '251'}
  ]

  @ViewChild('origin', {static: true}) origin: OriginLocationComponent;

  constructor(private service:InventoryService, private router: Router) { }

  ngOnInit() {
    //console.log(this.origin);

    this.service.getReceptions().subscribe(result => {

      result.data.receptions.forEach(reception => {

        const time = reception.time;

        reception.receiveProducts.forEach(product => {

          this.data.push({id: product.id, code: product.code, display_name: product.displayName, time: time, quantity: product.kilos});

        });

      });

    });

  }

  navigateToRegister(){
    this.router.navigateByUrl('reception/register', {state: {farm: "Finca", parcel: "Parcela"}});
  }

}
