import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data/data.service';
import { HttpService } from '../../Services/http/http.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  lists: any;
  discountedPrice = [];
  i: number;
  view: any;
  sortedList: any = [];
  sortOption: string;
  sellprice: any;
  arr: any = [];
  max: any;
  min: any;
  finalItemsArray: any = [];
  itemsForCart: any = [];
  searchItemData: any;
  searchItemArray: any = [];
  constructor(private dataService: DataService, private httpService: HttpService) { }

  ngOnInit(): void {

    // getting the default filter values
    this.dataService.currentFilter.subscribe((res: any) => {
      console.log("Filter", res);
      if (res == "None") {
        this.max = 10000;
        this.min = 100;
      } else {
        this.min = res[0];
        this.max = res[1];
      }
      // console.log(this.min, this.max);
      this.displayData(this.sortOption, this.min, this.max);
    });

    //getting the default sorting options
    this.dataService.currentSortOption.subscribe((res: any) => {
      this.sortOption = res;
      // console.log("sort option", this.sortOption);
      this.displayData(this.sortOption, this.min, this.max);
    });

    //getting the search data
    this.dataService.currrentSearchItem.subscribe((res: any) => {
      this.searchItemData = res;
      // console.log("shopping component search data",this.searchItemData);
      if (this.searchItemData != 'None') {
        this.displaySearchData(this.searchItemData);
        this.itemsForCart = JSON.parse(localStorage.getItem("itemsForCart"));
        console.log("default items in the cart are ", this.itemsForCart);

      }
    })
  }

  displayData(sortOption, minValue, maxValue) {
    this.httpService.getData().subscribe((res: any) => {
      this.lists = res;
      this.lists = this.calculatingItems(this.lists);
      // console.log('list of the data ', this.lists);
      this.lists = this.sortingChoice(sortOption);
      this.lists = this.filterItems(this.lists, minValue, maxValue);
      // console.log("final array to be displayed",this.lists);
    })
  }

  //displaying the search data
  displaySearchData(data) {
    console.log("cart items are", this.itemsForCart);
    this.httpService.getData().subscribe((res: any) => {
      this.searchItemArray = res;
      this.searchItemArray = this.filterSearchItems(this.searchItemArray, data);
      console.log("items array which are searched ", this.searchItemArray);
      this.lists = this.searchItemArray;
      console.log("search dislayed list ", this.lists);
      
    })
  }

  //filter the search items 
  filterSearchItems(array, data) {
    var lists = array.filter(function (item) {
      return (item.name.toLowerCase() === data.toLowerCase());
    })
    // console.log("this lists frm the filter array", lists);
    return lists;
  }

  //calculating items disounted price array
  calculatingItems(defaultItemsArray) {
    // console.log("array to be filtered defaultItems Array",defaultItemsArray);
    // console.log("length of the default array");   
    for (var i = 0; i < defaultItemsArray.length; i++) {
      var item =
      {
        id: defaultItemsArray[i].id,
        name: defaultItemsArray[i].name,
        discountedPrice: defaultItemsArray[i].price - ((defaultItemsArray[i].price * defaultItemsArray[i].discount) / 100),
        price: defaultItemsArray[i].price,
        discount: defaultItemsArray[i].discount,
        category: defaultItemsArray[i].category,
        imageUrl: defaultItemsArray[i].img_url,
      }
      // console.log("items =====>>>>>",item);
      this.finalItemsArray[i] = item;
    }
    // console.log("final array with siscounted price ",this.finalItemsArray);
    return this.finalItemsArray;
  }




  //filtering the iterms according to the filter option
  filterItems(array, minValue, maxValue) {
    var lists = array.filter(function (item) {
      return (item.price >= minValue && item.price <= maxValue);
    })
    // console.log("this lists frm the filter array", lists);
    return lists;
  }

  //sorting the items according to the sort options 
  sortingChoice(option) {
    this.arr = this.lists;
    if (option == "high") {
      this.sortedList = this.arr.slice().sort((a, b) => b.price - a.price);
      // console.log("Sorted List High", this.sortedList);
    }
    else if (option == "low") {
      this.sortedList = this.arr.slice().sort((a, b) => a.price - b.price);
      // console.log("Sorted List High", this.sortedList);

    }
    else if (option == "discount") {
      this.sortedList = this.arr.slice().sort((a, b) => b.discount - a.discount);
      // console.log("Sorted List Discount", this.sortedList);
    }
    return this.sortedList;
  }



  addToCart(item) {
    var itemToAdd =
    {
      id: item.id,
      name: item.name,
      discountedPrice: item.discountedPrice,
      price: item.price,
      discount: item.discount,
      category: item.category,
      imageUrl: item.img_url,
      quantity: 1,
    }
    if (this.findItemInCartArray(itemToAdd, this.itemsForCart)) {
      var index: number = this.findItemInCartArray(itemToAdd, this.itemsForCart) - 1;
      this.itemsForCart[index].quantity++;
    }
    else {
      this.itemsForCart.push(itemToAdd);
    }
    console.log("item to be addded in the cart ", this.itemsForCart);
    //storing the cart items in the local storage 
    localStorage.setItem("itemsForCart", JSON.stringify(this.itemsForCart));
  }

  //function to find if particular element is in the cart or not 
  findItemInCartArray(item, itemsArray) {
    for (var i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].id == item.id) {
        return (i + 1);
      }
    }
    return 0;
  }


}
