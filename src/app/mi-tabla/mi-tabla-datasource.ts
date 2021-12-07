import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { RankingService } from '../services/ranking.service';

// TODO: Replace this with your own data model type
export interface MiTablaItem {
  uid?: string;
  email?: string;
  password?: string;
  emailVerified?: boolean;
  firstTime?: boolean;
  photoURL?: string;
  displayName?: string;
  tagName?: string;
  main?: string;
  role?: string;
  secondary?: string;
  switchCode?: string;
}


// TODO: replace this with real data from your application
const EXAMPLE_DATA: MiTablaItem[] = [{
  displayName: 'Miguel Armenta', 
  email: "armacomiguel@gmail.com", 
  emailVerified: true,
  main: 'Luigi', 
  role: 'SUSCRIPTOR',
  secondary: 'DK', 
  switchCode: '13',
  tagName: 'ELMIKE',
  uid: "ErH82WPbSNY8xjXJs52C87WrJ9G2"
},
];
// const EXAMPLE_DATA: MiTablaItem[] = [{
//   displayName: '', 
//   email: '', 
//   emailVerified: false,
//   main: '', 
//   role: '',
//   secondary: '', 
//   switchCode: '',
//   tagName: '',
//   uid: ''
// },
// ];

/**
 * Data source for the MiTabla view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MiTablaDataSource extends DataSource<MiTablaItem> {
  data: MiTablaItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MiTablaItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MiTablaItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MiTablaItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'tagName': return compare(a.tagName, b.tagName, isAsc);
        case 'displayName': return compare(+a.displayName, +b.displayName, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
