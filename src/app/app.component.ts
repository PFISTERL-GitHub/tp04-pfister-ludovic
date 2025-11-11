import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeclarationComponent } from './declaration/declaration.component';
import { RecapComponent } from './recap/recap.component';
import { PollutionListComponent } from './pollution-list/pollution-list.component';
import { Pollution } from './pollution.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DeclarationComponent, RecapComponent, PollutionListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lastPollution?: Pollution;
}