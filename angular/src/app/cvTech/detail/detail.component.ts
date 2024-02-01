import { Component, OnInit } from '@angular/core';
import { CvService } from '../cv.service';
import {Personne} from "../../Model/Personne";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  personne! : Personne ;
  constructor(  private cvService:CvService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private toastr: ToastrService

    ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.personne = this.cvService.getPersonneById(params['id']);
      }
    )
  }

  delete() {
    try {
      // Call the service to delete the person locally
      this.cvService.deletePersonneById(this.personne.id);

      // Redirect to the CVComponent
      this.router.navigate(['cv']);
    } catch (error) {
      this.toastr.error("Problème de suppression, veuillez contacter l'admin");
      console.log(error)

    }
  }
}


