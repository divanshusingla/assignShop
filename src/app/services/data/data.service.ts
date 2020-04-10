import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // Sort Option in Shopping List
  private sortOptionSource = new BehaviorSubject('high');
  currentSortOption = this.sortOptionSource.asObservable();

  changeSortOption(message: string) {
    this.sortOptionSource.next(message);
  }

//Filtering
private filterSource = new BehaviorSubject('None');
currentFilter = this.filterSource.asObservable();
changeFilter(message: any) {
this.filterSource.next(message)
}


// Add to Cart Selection
private itemSource = new BehaviorSubject('None');
currentitem = this.itemSource.asObservable();
changeitem(message: any) {
this.itemSource.next(message);
}

//search text for the search item
private searchItem = new BehaviorSubject('None');
currrentSearchItem = this.searchItem.asObservable();
changeSearchData(message : any)
{
  this.searchItem.next(message);
}

}
