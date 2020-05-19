import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class RegisterReceptionService extends Mutation {

  document = gql`
  mutation($reception: InputReception!){
    createReception(reception: $reception){
      id
      display_name
      scheduled_date
      receive_from
      time
      receive_products{
        id
        display_name
        kilos
        lote
      }
    }
  }
  `;

}
