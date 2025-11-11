import { Component } from '@angular/core';
import { PollutionListComponent } from './components/pollution-list/pollution-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PollutionListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}