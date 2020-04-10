import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data/data.service';


@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  itemsInTheCart : any =[];
  NumberOfItem: number;
  totalSum: number;
  totalDiscount: number;
  totalPayment: number;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {

//getting the items for the cart
this.getItemsForTheCart();
console.log("items for the cart is ",this.itemsInTheCart);
  }

getItemsForTheCart()
{
  this.itemsInTheCart = JSON.parse(localStorage.getItem("itemsForCart"));
  this.caculatingData(this.itemsInTheCart);
}





  refresh(){
    this.dataService.changeFilter('None');
    this.dataService.changeSortOption('high');
    this.dataService.changeSearchData('None');
    this.finalItems(this.itemsInTheCart);
  }


  //descreasing the quantity in the cart 
  subtractQuantity(item)
  {
    if(this.findItemInCartArray(item,this.itemsInTheCart))
    {
      this.itemsInTheCart[this.findItemInCartArray(item,this.itemsInTheCart) -1].quantity--;
      if(this.itemsInTheCart[this.findItemInCartArray(item,this.itemsInTheCart) -1].quantity == 0)
      {
        this.removeItem(item);
      }
      this.caculatingData(this.itemsInTheCart);
      }
  }

  //adding quantity in the cart 
  addQuantity(item)
  {
    if(this.findItemInCartArray(item,this.itemsInTheCart))
    {
      this.itemsInTheCart[this.findItemInCartArray(item,this.itemsInTheCart) -1].quantity++;
    }
    this.caculatingData(this.itemsInTheCart);

  }

  findItemInCartArray(item,itemsArray)
  {
    for(var i=0;i<itemsArray.length;i++)
    {
      if(itemsArray[i].id == item.id)
      {
        return (i+1);
      }
    }
    return 0;
  }

  //removing item from the cart 
  removeItem(item)
  {
    console.log("remove function is called");    
    var index = this.findItemInCartArray(item,this.itemsInTheCart) -1;
    this.itemsInTheCart.splice(index,1);
    this.caculatingData(this.itemsInTheCart); 
  }




  //final items in the cart are 
  finalItems(array)
  {
    localStorage.setItem("itemsForCart", JSON.stringify(array));
  }

  //calculating the total sum and the price and the total discount 
  caculatingData(array)
  {
    this.totalSum = 0;
    this.totalDiscount = 0;
    this.NumberOfItem = array.length;
    for(var i=0;i<array.length;i++)
    {
      this.totalSum += array[i].price * array[i].quantity;
      this.totalDiscount += (array[i].price * array[i].discount/100) * array[i].quantity 
    }
    this.totalPayment = this.totalSum - this.totalDiscount;
  }

}
