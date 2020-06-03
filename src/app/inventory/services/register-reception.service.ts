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
      displayName
      scheduledDate
      receiveFrom
      time
      receiveProducts{
        id
        displayName
        kilos
        lote
      }
    }
  }
  `;

}
