import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  url :string = "http://localhost:3000/db";

  constructor(private http:HttpClient) { }

  allStates(): Observable<any>{
    return this.http.get(this.url);
  }
}
