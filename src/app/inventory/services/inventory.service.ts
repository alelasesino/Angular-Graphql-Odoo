import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private query: QueryRef<any>;
  private TIME_OUT = 5000;

  constructor(private apollo: Apollo) { }
  
  public getFarmsAndProducts(){
    
    const FARM_PRODUCTS_QUERY = gql`
    {
      products {
        id
        displayName
        code
        barcode
        categId
        image
      }
      farms {
        id
        name
        createDate
        description
        code
        partnerId
        parcels {
          id
          name
          createDate
          number
          description
        }
      }
    }        
    `;

    return this.doSimpleQuery(FARM_PRODUCTS_QUERY);

  }

  public getFarms(){
    
    const FARM_QUERY = gql`
    query Farms {
      farms {
        id
        name
        createDate
        description
        code
        partnerId
        parcels {
          id
          name
          createDate
          number
          description
        }
      }
    }    
    `;

    return this.doSimpleQuery(FARM_QUERY);

  }

  public getProducts(){

    const PRODUCT_QUERY = gql`
    {
      products {
        id
        displayName
        code
        barcode
        categId
        image
      }
    }  
    `;

    return this.doSimpleQuery(PRODUCT_QUERY);

  }

  public getReceptions(lot: string){

    // const RECEPTION_QUERY = gql`
    // query Receptions($today: Boolean, $lot: String) {
    //   receptions(today: $today, lot: $lot) {
    //     id
    //     displayName
    //     scheduledDate
    //     receiveFrom
    //     time
    //     receiveProducts {
    //       id
    //       code
    //       displayName
    //       kilos
    //       lote
    //     }
    //   }
    // }         
    // `;

    const RECEPTION_QUERY = gql`
    query Receptions {
      receptions(today: false) {
        id
        displayName
        scheduledDate
        receiveFrom
        time
        receiveProducts {
          code
          displayName
          kilos
          lote
        }
      }
    }             
    `;

    this.query = this.apollo.watchQuery({query: RECEPTION_QUERY, variables: {today: false, lot}});

    return this.query.valueChanges;

  }

  private doSimpleQuery(query){

    this.query = this.apollo.watchQuery({query: query});

    return this.query.valueChanges;

  }

}
