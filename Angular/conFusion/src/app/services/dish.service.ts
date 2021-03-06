import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes():Observable<Dish[]>{
    //return Promise.resolve(DISHES);
    /*return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES),2000);
    })*/
    
    //return of(DISHES).pipe(delay(2000))
    return this.http.get<Dish[]>(baseURL+'dishes');
    
  }

  getDish(id: string): Observable<Dish>{
    //return Promise.resolve(DISHES.filter((dish)=>(dish.id==id))[0]);
    /*return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish)=>(dish.id==id))[0]),2000);
    })*/
    /*
    return new Promise(resolve=>{
      setTimeout(()=>resolve(lo que se quiere hacer sin promesa),2000);
    })*/

    //return of(DISHES.filter((dish)=>(dish.id==id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL+'dishes/'+id);

  }

  getFeaturedDish(): Observable<Dish> {

    //return Promise.resolve(DISHES.filter((dish)=>(dish.featured))[0]);
    /*return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish)=>(dish.featured))[0]),2000)
    })*/
    //return of(DISHES.filter((dish)=>(dish.featured))[0]).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL+'dishes?featured=true').pipe(map(dishes=>dishes[0]));


  }

  getDishIds():Observable<string [] | any>{
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)));
  }
}
