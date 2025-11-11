import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../services/pollution.service';
import { Pollution } from '../pollution.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pollution-list',
  imports: [CommonModule],
  templateUrl: './pollution-list.component.html',
  styleUrls: ['./pollution-list.component.css']
})
export class PollutionListComponent implements OnInit {

  pollutions$!: Observable<Pollution[]>;

  constructor(private pollutionService: PollutionService) {}

  ngOnInit(): void {
    this.pollutions$ = this.pollutionService.pollutions$;
  }

  deletePollution(id: number) {
    this.pollutionService.deletePollution(id);
  }
}