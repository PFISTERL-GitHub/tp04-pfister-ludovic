import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Pollution } from '../pollution.model';
import { PollutionService } from '../services/pollution.service';


@Component({
  selector: 'app-declaration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './declaration.component.html',
  styleUrl: './declaration.component.css'
})
export class DeclarationComponent {
  @Output() pollutionCreated = new EventEmitter<Pollution>();
  
  pollutionForm: FormGroup;
  submitted = false;
  pollutionData: any = null;

  types = ['Plastique', 'Chimique', 'Dépôt sauvage', 'Eau', 'Air', 'Autre'];

  constructor(private fb: FormBuilder, private pollutionService: PollutionService) {
    this.pollutionForm = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      lieu: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      photo: ['']
    });
  }

  onSubmit(): void {
    if (this.pollutionForm.valid) {
      const pollution: Pollution = {
        id: Date.now(),
        ...this.pollutionForm.value
      } as Pollution;
      this.pollutionService.addPollution(pollution);
      this.pollutionCreated.emit(pollution);
      this.submitted = true;
    }
  }

  resetForm() {
    this.pollutionForm.reset();
    this.submitted = false;
  }
}