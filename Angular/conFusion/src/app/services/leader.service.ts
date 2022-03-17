import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Observable<Leader[]>{
    //return Promise.resolve(LEADERS);
    
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader>{
    //return Promise.resolve(LEADERS.filter((leader)=>(leader.id==id))[0]);
    /*return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((leader)=>(leader.id==id))[0]),2000);
    })*/
    return of(LEADERS.filter((leader)=>(leader.id==id))[0]).pipe(delay(2000))
  }

  getFeaturedLeader(): Observable<Leader> {
    //return Promise.resolve(LEADERS.filter((leader)=>(leader.featured))[0]);
    /*return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((leader)=>(leader.featured))[0]),2000);
    })*/
    return of(LEADERS.filter((leader)=>(leader.featured))[0]).pipe(delay(2000))
  }
}
