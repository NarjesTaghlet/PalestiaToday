import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Personne } from 'src/app/Model/Personne';
import { EmbaucheService } from '../embauche.service';
import { NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component ({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ]
})
export class EmbaucheComponent implements OnInit {
  personnes: Personne[] = [];
  @Output() selectedPersonne = new EventEmitter();

  constructor( private embaucheService: EmbaucheService){

  }
  ngOnInit(){
    this.personnes = this.embaucheService.getEmbauchees();
  }
}
