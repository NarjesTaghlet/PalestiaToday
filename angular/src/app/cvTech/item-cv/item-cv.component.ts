import { Component, Input, Output ,OnInit,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personne } from '../../Model/Personne';


@Component({
  selector: 'app-item-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-cv.component.html',
  styleUrls: ['./item-cv.component.css']
})
export class ItemCvComponent implements OnInit{
  @Input()
  personne!: Personne;
  @Output() selectedPersonne = new EventEmitter();
constructor() { }

ngOnInit() {
}

  selectPersonne() {
    // Emettre un événement et y injecter la personne
    this.selectedPersonne.emit(this.personne);
}
}
