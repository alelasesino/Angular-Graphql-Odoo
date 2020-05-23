import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  getLot(farm, parcel): string {

    farm = String(farm).padStart(2, '0');
    parcel = String(parcel).padStart(2, '0');

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `L${farm}${month}${day}${parcel}`;

  }


  private getWeekNumber(date: Date): number {

    date = new Date(+date);
    date.setHours(0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));

    let year_start = new Date(date.getFullYear(), 0, 1);
    let week = Math.ceil((((date.valueOf() - year_start.valueOf()) / 86400000) + 1) / 7);

    return week;

  } 

    
  
}
