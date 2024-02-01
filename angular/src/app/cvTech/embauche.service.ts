import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Personne } from '../Model/Personne';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  private personnes: Personne[];

  constructor(private toastr: ToastrService) {
    this.personnes = [];
  }

  getEmbauchees(): Personne[] {
    return this.personnes;
  }

  embaucher(personne: Personne): void {
    const index = this.personnes.indexOf(personne);
    if (index < 0) {
      this.personnes.push(personne);
      this.toastr.success(`${personne.name} a été embauché.`, 'Embauche réussie', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false,
        enableHtml: true,
        toastClass: 'custom-toast-success',
        positionClass: 'toast-top-right', // Center toast on the screen
      });
    } else {
      this.toastr.warning(`${personne.name} est déjà sélectionné.`, 'Cv déjà sélectionné', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: true,
        enableHtml: true,
        toastClass: 'custom-toast-warning',
        positionClass: 'toast-top-right',
      });
    }
  }

  debaucher(personne: Personne): void {
    const index = this.personnes.indexOf(personne);
    if (index >= 0) {
      this.personnes.splice(index, 1);
      this.toastr.info(`${personne.name} a été retiré de la sélection.`, 'Débauche réussie', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: true,
        enableHtml: true,
        toastClass: 'custom-toast-info',
        positionClass: 'toast-top-right',
      });
    }
  }
}
