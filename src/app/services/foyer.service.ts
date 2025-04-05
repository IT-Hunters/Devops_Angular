import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foyer } from '../models/foyer';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  private apiUrl = `http://localhost:8089/projet/foyer`; // Base URL: http://localhost:8089/projet/foyer or http://spring:8089/projet/foyer

  constructor(private http: HttpClient) { }

  getAllFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/retrieve-all-foyers`);
  }

  getFoyersByUniversityName(nomUniversite: string): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/retrieve-by-nomUniversite/${nomUniversite}`);
  }

  addFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.apiUrl}/add-foyer`, foyer);
  }

  updateFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(`${this.apiUrl}/update-foyer`, foyer);
  }

  deleteFoyer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-foyer/${id}`);
  }
}
