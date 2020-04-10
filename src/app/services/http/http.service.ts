import { Injectable,Inject } from '@angular/core';
import { HttpClientModule ,HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get('../../assets/data/shoppingList.json');
  }
}

