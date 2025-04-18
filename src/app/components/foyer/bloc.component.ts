import { Component, OnInit } from '@angular/core';
import { BlocService } from '../../services/Bloc.service';

import { Bloc } from '../../models/bloc';


@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit {
  blocs: Bloc[] = [];
  selectedBloc: Bloc = { nomBloc: '', capaciteBloc: 0 };
  isEditMode = false;

  constructor(private blocService: BlocService) { }

  ngOnInit(): void {
    this.loadBlocs();
  }

  loadBlocs(): void {
    this.blocService.getAllBlocs().subscribe(data => {
      this.blocs = data;
    });
  }


  onSelect(bloc: Bloc): void {
    this.selectedBloc = { ...bloc };
    this.isEditMode = true;
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.blocService.updateBloc(this.selectedBloc).subscribe(() => {
        this.loadBlocs();
        this.resetForm();
      });
    } else {
      this.blocService.addBloc(this.selectedBloc).subscribe(() => {
        this.loadBlocs();
        this.resetForm();
      });
    }
  }

  onDelete(id: number): void {
    this.blocService.deleteBloc(id).subscribe(() => {
      this.loadBlocs();
    });
  }

  resetForm(): void {
    this.selectedBloc = { nomBloc: '', capaciteBloc: 0 };
    this.isEditMode = false;
  }
}