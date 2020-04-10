import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText: any;

  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit(): void {
  }


  searchItem(data) {
    var searchData = data;
    if (searchData.length == 0 || searchData == null) {
      this.router.navigate(['/home']);
    }
    if (searchData.length > 2) {
      this.router.navigate(['/searchItems']);
      this.dataService.changeSearchData(data);
    }
    console.log("search button is clicked from the header component with data", data);
    this.searchText = "";
  }

  refresh(){
    this.dataService.changeFilter('None');
    this.dataService.changeSortOption('high');
    this.dataService.changeSearchData('None');
  }

}
