import { Component, Input, Output ,EventEmitter } from '@angular/core';
import { ItemCvComponent } from "../item-cv/item-cv.component";
import { Personne } from '../../Model/Personne';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-liste-cv',
  standalone: true,
  templateUrl: './liste-cv.component.html',
  imports: [
    ItemCvComponent,
    NgFor,
  ],
  styleUrls: ['./liste-cv.component.css']
})
export class ListeCvComponent {
  //les elements externes peuvent y transferer des elmts via cette variable
  @Input() personnes: Personne[]  = [] ;
  @Output() selectedpersonne = new EventEmitter();
  constructor(){}

    selectPersonne(selectedPersonne : Personne){
    console.log(selectedPersonne);
    this.selectedpersonne.emit(selectedPersonne)
    }
}
