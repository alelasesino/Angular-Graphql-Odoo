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

    this.query = this.apollo.watchQuery({query: FARM_QUERY});

    return this.query.valueChanges;

  }

}
