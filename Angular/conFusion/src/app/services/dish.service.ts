import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes():Observable<Dish[]>{
    //return Promise.resolve(DISHES);
    /*return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES),2000);
    })*/
    
    return of(DISHES).pipe(delay(2000))
    
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

    return of(DISHES.filter((dish)=>(dish.id==id))[0]).pipe(delay(2000));

  }

  getFeaturedDish(): Observable<Dish> {

    //return Promise.resolve(DISHES.filter((dish)=>(dish.featured))[0]);
    /*return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish)=>(dish.featured))[0]),2000)
    })*/
    return of(DISHES.filter((dish)=>(dish.featured))[0]).pipe(delay(2000));



  }
}
