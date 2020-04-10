import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  selectValue: string = 'Price -- High Low';
  sortingOptions: string[] = ['Price -- High Low', 'Price -- Low High', 'Discount'];
  sortChoice: string;
  recieveValue: string;

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit(): void {
    this.dataService.currentSortOption.subscribe((res: any) => {
      console.log("received value",res);
      
      this.recieveValue = res;
      if(this.recieveValue=="high"){
        this.selectValue = "Price -- High Low";
      }
      if(this.recieveValue=="low"){
        this.selectValue = "Price -- Low High";
      }
      if(this.recieveValue=="discount"){
        this.selectValue = "Discount";
      }
      // console.log(this.recieveValue);
      // console.log(this.selectValue);
    });
  }
  
  sendSortValue(value)
  {
    console.log("What you have selected",value);
    if(value == "Price -- High Low"){
      this.sortChoice = "high";
    }
    if(value=="Price -- Low High"){
      this.sortChoice = "low";
    }
    if(value=="Discount"){
      this.sortChoice = "discount";
    }
    this.dataService.changeSortOption(this.sortChoice);
    this.dialogRef.close();
  } 


  closeDialog(): void {
    this.dialogRef.close();
  }
}
