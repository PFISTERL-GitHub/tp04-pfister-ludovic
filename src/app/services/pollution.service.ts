import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Pollution } from '../pollution.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private pollutions: Pollution[] = [];
  private _pollutions$ = new BehaviorSubject<Pollution[]>(this.pollutions);

  get pollutions$(): Observable<Pollution[]> {
    return this._pollutions$.asObservable();
  }

  addPollution(pollution: Pollution) {
    this.pollutions.push(pollution);
    this._pollutions$.next([...this.pollutions]);
  }

  deletePollution(id: number) {
    this.pollutions = this.pollutions.filter(p => p.id !== id);
    this._pollutions$.next([...this.pollutions]);
  }

  updatePollution(updated: Pollution) {
    const index = this.pollutions.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.pollutions[index] = updated;
      this._pollutions$.next([...this.pollutions]);
    }
  }

  getPollutionById(id: number): Pollution | undefined {
    return this.pollutions.find(p => p.id === id);
  }
}