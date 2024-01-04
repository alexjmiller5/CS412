import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private http: HttpClient) { }

  fetchData(searchTerm: string): Observable<any> {
    // Simulate a backend API call with searchTerm
    // Replace the URL with your actual API endpoint
    return this.http.get<any>(`/api/data?search=${searchTerm}`);
  }
}