import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../../services/pollution.service';
import { Pollution } from '../../models/pollution.model';
import { PollutionDetailComponent } from '../pollution-detail/pollution-detail.component';
import { PollutionFormComponent } from '../pollution-form/pollution-form.component';

@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule, PollutionDetailComponent, PollutionFormComponent],
  templateUrl: './pollution-list.component.html',
  styleUrls: ['./pollution-list.component.css']
})
export class PollutionListComponent implements OnInit {
  pollutions: Pollution[] = [];
  selectedPollution?: Pollution;
  typeFilter = '';
  lieuFilter = '';

  constructor(private pollutionService: PollutionService) {}

  ngOnInit() {
    this.pollutionService.getAll().subscribe(data => this.pollutions = data);
  }

  selectPollution(p: Pollution) {
    this.selectedPollution = p;
  }

  loadPollutions() {
    this.pollutionService.getAll().subscribe(p => this.pollutions = p);
  }

  applyFilters() {
    this.pollutionService.filterPollutions(this.typeFilter, this.lieuFilter)
      .subscribe(p => this.pollutions = p);
  }

  deletePollution(id: number, event: Event) {
    event.stopPropagation();
    this.pollutionService.delete(id).subscribe(() => {
      this.pollutions = this.pollutions.filter(p => p.id !== id);
      this.selectedPollution = undefined;
    });
  }

  onPollutionAdded(pollution: Pollution) {
    this.pollutions.push(pollution);
  }

  onUpdated(updated: Pollution) {
    this.pollutions = this.pollutions.map(p => p.id === updated.id ? updated : p);
    this.selectedPollution = undefined;
  }
}
