import { Component, OnInit, ViewChildren, Directive, Input, Output, EventEmitter, QueryList, OnChanges } from '@angular/core';


// interface Country {
//   id: number;
//   name: string;
//   flag: string;
//   area: number;
//   population: number;
// }

// const COUNTRIES: Country[] = [
//   {
//     id: 1,
//     name: 'Russia',
//     flag: 'f/f3/Flag_of_Russia.svg',
//     area: 17075200,
//     population: 146989754
//   },
//   {
//     id: 2,
//     name: 'Canada',
//     flag: 'c/cf/Flag_of_Canada.svg',
//     area: 9976140,
//     population: 36624199
//   },
//   {
//     id: 3,
//     name: 'United States',
//     flag: 'a/a4/Flag_of_the_United_States.svg',
//     area: 9629091,
//     population: 324459463
//   },
//   {
//     id: 4,
//     name: 'China',
//     flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
//     area: 9596960,
//     population: 1409517397
//   }
// ];

//export type SortColumn = keyof Country | '';
//export type SortColumn = keyof Country | '';
export type SortColumn = "" | "name" | "time";
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}


@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  private addedItem: boolean;
  countries;
  objectKeys = Object.keys;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Input('headers') header_columns;
  @Input('data') datas = [];
  @Input('actions') actions: boolean;
  @Input('placeholder') placeholder: string = "¡No hay datos!";

  ngOnInit(): void {

    this.countries = this.datas;

  }

  onSort({column, direction}: SortEvent): void {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.countries = this.datas;
    } else {
      this.countries = [...this.datas].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  addItem(item){

    this.datas.push(item);
    this.addedItem = true;
    
  }

  removeItem(id){
    this.datas.splice(id, 1);
  }

  ngAfterViewChecked(){

    if(this.addedItem){
        document.querySelector('.tabla').scrollBy(0, 10000);
        this.addedItem = false;
    }

  }


}


