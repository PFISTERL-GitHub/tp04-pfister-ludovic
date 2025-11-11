import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pollution } from '../../models/pollution.model';
import { PollutionService } from '../../services/pollution.service';

@Component({
  selector: 'app-pollution-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pollution-detail.component.html',
  styleUrls: ['./pollution-detail.component.css']
})
export class PollutionDetailComponent {
  @Input() pollution!: Pollution;
  @Output() updated = new EventEmitter<Pollution>();

  constructor(private pollutionService: PollutionService) {}

  save() {
    this.pollutionService.update(this.pollution).subscribe(p => this.updated.emit(p));
  }
}

