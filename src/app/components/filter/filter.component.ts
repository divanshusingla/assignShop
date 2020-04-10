import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { DataService } from 'src/app/Services/data/data.service';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  values = [];
  minValue: number;
  maxValue: number;
  constructor(private dataService: DataService,public dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit(): void {
    this.dataService.currentFilter.subscribe((res: any) => {
      console.log("Filter Values in Filter Dialog",res);
      this.minValue = res[0];
      this.maxValue = res[1];
    });
  }

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
  };

  applyFilter(){
    console.log(this.minValue,this.maxValue);
    this.values = [this.minValue,this.maxValue]
    this.dataService.changeFilter(this.values);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
