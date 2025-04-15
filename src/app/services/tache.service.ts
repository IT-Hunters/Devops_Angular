import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tache {
  idTache: number;
  dateTache: string;
  duree: number;
  tarifHoraire: number;
  typeTache: string;
  tarifFinal: number;
  etudiantOrdinaire?: { idEtudiant: number; nomEt: string; prenomEt: string };
}

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:8089/projet/taches'; // Updated to match the new base URL

  constructor(private http: HttpClient) { }

  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl);
  }

  getTache(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/${id}`);
  }

  addTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.apiUrl, tache);
  }

  updateTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(this.apiUrl, tache);
  }

  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addTasksAndAffectToEtudiant(tasks: Tache[], nomEt: string, prenomEt: string): Observable<Tache[]> {
    return this.http.post<Tache[]>(`${this.apiUrl}/add-tasks-affect-etudiant/${nomEt}/${prenomEt}`, tasks);
  }
}