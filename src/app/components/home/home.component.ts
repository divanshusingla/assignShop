import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data/data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SortComponent } from '../sort/sort.component';
import { FilterComponent } from '../filter/filter.component';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService,public dialog: MatDialog) { }
  ngOnInit(): void {
  }



  sortData(data)
  {
    console.log("data on changing sort option home component",data);    
    this.dataService.changeSortOption(data);
    
  }
  openFilterDialog()
  {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '250px' , panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Filter dialog was closed');
    });
  }
  //desktop filter
   // ng-5 filter tray
   minValue: number = 100 ;
   maxValue: number = 10000;
   options: Options = {
     floor: 100,
     ceil: 10000,
     translate: (value: number, label: LabelType): string => {
       switch (label) {
         case LabelType.Low:
           return '₹' + value;
         case LabelType.High:
           return '₹' + value;
         default:
           return '₹' + value;
       }
     }
   }
   //sending fiter data
   sendFilterData(minValue,maxValue){
   var values = [minValue,maxValue]
   this.dataService.changeFilter(values);
   }
  //sortdialog data
  openSortDialog()
  {
    const dialogRef = this.dialog.open(SortComponent, {
      width: '250px' , panelClass: 'custom-dialog-container' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Sort dialog was closed');
    });
  }

}
