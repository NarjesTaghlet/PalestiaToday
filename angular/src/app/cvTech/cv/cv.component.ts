import {Component, OnInit} from '@angular/core';
import { ListeCvComponent } from "../liste-cv/liste-cv.component";
//import { EmbaucheComponent } from '../cvTech/embauche/embauche.component';
import { DetailCvComponent } from "../detail-cv/detail-cv.component";
import { Personne } from '../../Model/Personne';
import {NgIf} from '@angular/common';
import { CvService } from '../cv.service';
import { EmbaucheComponent } from "../embauche/embauche.component";

@Component({
    selector: 'app-cv',
    standalone: true,
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.css'],
    imports: [
        ListeCvComponent,
        DetailCvComponent,
        NgIf,
        EmbaucheComponent
    ]
})
export class CvComponent implements OnInit{
  personnes: Personne[] = [];
  selectedPersonne!: Personne;
  constructor(
    private cvService: CvService
  ){
  }

ngOnInit() {
    this.personnes = this.cvService.getPersonnes();
}

selectPersonne(personne :Personne){
this.selectedPersonne=personne;
}

}
