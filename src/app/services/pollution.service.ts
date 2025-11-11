import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Pollution } from '../models/pollution.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private pollutions$ = new BehaviorSubject<Pollution[]>([
    {
      id: 1,
      titre: 'Pollution plastique en bord de mer',
      type: 'Plastique',
      description: 'Accumulation de déchets plastiques sur la plage.',
      date: '2025-10-10',
      lieu: 'Nice',
      latitude: 43.7,
      longitude: 7.25,
      photo: 'https://example.com/plage.jpg'
    }
  ]);

  getAll(): Observable<Pollution[]> {
    return this.pollutions$.asObservable().pipe(delay(300));
  }

  getById(id: number): Observable<Pollution | undefined> {
    return this.getAll().pipe(map(list => list.find(p => p.id === id)));
  }

  add(pollution: Pollution): Observable<Pollution> {
    const current = this.pollutions$.value;
    const newPollution = { ...pollution, id: Date.now() };
    this.pollutions$.next([...current, newPollution]);
    return of(newPollution).pipe(delay(300));
  }

  update(updated: Pollution): Observable<Pollution> {
    const current = this.pollutions$.value.map(p =>
      p.id === updated.id ? updated : p
    );
    this.pollutions$.next(current);
    return of(updated).pipe(delay(300));
  }

  delete(id: number): Observable<boolean> {
    const current = this.pollutions$.value.filter(p => p.id !== id);
    this.pollutions$.next(current);
    return of(true).pipe(delay(300));
  }

  filterPollutions(type?: string, lieu?: string): Observable<Pollution[]> {
    let filtered = this.pollutions$;
    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }
    if (lieu) {
      filtered = filtered.filter(p => p.lieu.toLowerCase().includes(lieu.toLowerCase()));
    }
    return of(filtered);
  }
}