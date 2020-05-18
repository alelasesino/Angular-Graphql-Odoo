import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) { }
  
  public getFarms(){
    
    const FARM_QUERY = gql`
    {
      farms{
        id
        name
        create_date
        description
        code
        parcels{
          id
          name
          create_date
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
        display_name
        code
        barcode
        categ_id
        image
      }
    }    
    `;

    return this.doSimpleQuery(PRODUCT_QUERY);

  }

  private doSimpleQuery(query){

    this.query = this.apollo.watchQuery({query: query});

    return this.query.valueChanges;

  }

}
