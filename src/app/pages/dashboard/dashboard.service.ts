import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { QueueItem, Policy } from './dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  loadQueue(): Observable<QueueItem[]> {
    return this.http.get<any>('assets/data/seed.json').pipe(map((data) => data.workQueue));
  }

  loadPolicies(): Observable<Policy[]> {
    return this.http.get<any>('assets/data/seed.json').pipe(map((data) => data.policies));
  }
}
