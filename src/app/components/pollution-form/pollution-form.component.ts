import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pollution } from '../../models/pollution.model';
import { PollutionService } from '../../services/pollution.service';

@Component({
  selector: 'app-pollution-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pollution-form.component.html',
  styleUrls: ['./pollution-form.component.css']
})
export class PollutionFormComponent {
  @Output() pollutionAdded = new EventEmitter<Pollution>();

  pollution: Pollution = {
    id: 0,
    titre: '',
    type: '',
    description: '',
    date: '',
    lieu: '',
    latitude: 0,
    longitude: 0,
    photo: ''
  };

  constructor(private pollutionService: PollutionService) {}

  addPollution() {
    if (!this.pollution.titre || !this.pollution.type || !this.pollution.description ||
        !this.pollution.date || !this.pollution.lieu) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    this.pollutionService.add(this.pollution).subscribe(p => {
      this.pollutionAdded.emit(p);
      this.pollution = {
        id: 0,
        titre: '',
        type: '',
        description: '',
        date: '',
        lieu: '',
        latitude: 0,
        longitude: 0,
        photo: ''
      };
    });
  }
}

