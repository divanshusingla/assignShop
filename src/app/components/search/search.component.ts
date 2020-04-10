import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data/data.service';
import { HttpService } from 'src/app/Services/http/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private dataService: DataService, private httpService: HttpService) { }

  ngOnInit(): void {
  }
  refresh(){
    this.dataService.changeFilter('None');
    this.dataService.changeSortOption('high');
    this.dataService.changeSearchData('None');
  }
}
