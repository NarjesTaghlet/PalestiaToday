import { Component } from '@angular/core';
import {MailService} from "../services/mail.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  email = {
    subject: '',
    content: ''
  };

  constructor(private mailService: MailService, private toastr: ToastrService) {
  }

  onSubmit() {
    this.mailService.sendEmail(this.email.subject, this.email.content).subscribe({
      next: (response) => {this.toastr.success("E-mail sent successfully");
        this.email.subject='';
        this.email.content='';
      },
      error: (error) => this.toastr.error("Error sending E-mail"),
    });
  }
}



