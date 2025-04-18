import { Component, OnInit } from '@angular/core';
import { TacheService, Tache } from '../../services/tache.service';

@Component({
  selector: 'app-tache-list',
  templateUrl: './tache-list.component.html',
  styleUrls: ['./tache-list.component.css']
})
export class TacheListComponent implements OnInit {
  taches: Tache[] = [];
  newTache: Tache = {
    idTache: 0,
    dateTache: '',
    duree: 0,
    tarifHoraire: 0,
    typeTache: 'MENAGERE',
    tarifFinal: 0
  };
  editingTache: Tache | null = null;
  nomEt: string = '';
  prenomEt: string = '';
  tasksToAssign: Tache[] = [];

  constructor(private tacheService: TacheService) {}

  ngOnInit(): void {
    this.loadTaches();
  }

  loadTaches(): void {
    this.tacheService.getAllTaches().subscribe({
      next: (data) => {
        this.taches = data;
      },
      error: (err) => {
        console.error('Error fetching taches:', err);
      }
    });
  }

  addTache(): void {
    // Calculate tarifFinal
    this.newTache.tarifFinal = this.newTache.duree * this.newTache.tarifHoraire;
    this.tacheService.addTache(this.newTache).subscribe({
      next: (tache) => {
        this.taches.push(tache);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding tache:', err);
      }
    });
  }

  editTache(tache: Tache): void {
    this.editingTache = { ...tache };
  }

  updateTache(): void {
    if (this.editingTache) {
      // Calculate tarifFinal
      this.editingTache.tarifFinal = this.editingTache.duree * this.editingTache.tarifHoraire;
      this.tacheService.updateTache(this.editingTache).subscribe({
        next: (updatedTache) => {
          const index = this.taches.findIndex(t => t.idTache === updatedTache.idTache);
          if (index !== -1) {
            this.taches[index] = updatedTache;
          }
          this.editingTache = null;
        },
        error: (err) => {
          console.error('Error updating tache:', err);
        }
      });
    }
  }

  deleteTache(id: number): void {
    this.tacheService.deleteTache(id).subscribe({
      next: () => {
        this.taches = this.taches.filter(t => t.idTache !== id);
      },
      error: (err) => {
        console.error('Error deleting tache:', err);
      }
    });
  }

  addTasksAndAffectToEtudiant(): void {
    if (this.nomEt && this.prenomEt && this.tasksToAssign.length > 0) {
      this.tacheService.addTasksAndAffectToEtudiant(this.tasksToAssign, this.nomEt, this.prenomEt).subscribe({
        next: (updatedTasks) => {
          this.loadTaches();
          this.nomEt = '';
          this.prenomEt = '';
          this.tasksToAssign = [];
        },
        error: (err) => {
          console.error('Error assigning tasks:', err);
        }
      });
    }
  }

  toggleTaskSelection(tache: Tache): void {
    const index = this.tasksToAssign.findIndex(t => t.idTache === tache.idTache);
    if (index === -1) {
      this.tasksToAssign.push(tache);
    } else {
      this.tasksToAssign.splice(index, 1);
    }
  }

  toggleAllTasks(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.tasksToAssign = [...this.taches];
    } else {
      this.tasksToAssign = [];
    }
  }

  resetForm(): void {
    this.newTache = {
      idTache: 0,
      dateTache: '',
      duree: 0,
      tarifHoraire: 0,
      typeTache: 'MENAGERE',
      tarifFinal: 0
    };
  }
}