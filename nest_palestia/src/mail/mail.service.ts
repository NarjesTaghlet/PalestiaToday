import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Config } from '../configs/constants.config';
import { join } from 'path';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendUserEmail(subject: string, content: string): Promise<void> {
        console.log('Resolved path:', join(__dirname, 'templates'));

        await this.mailerService.sendMail({
            to: Config.adminEmail,
            subject: subject,
            text: content,
        });
    }


    // async sendWelcomeEmail(userEmail: string): Promise<void> {
    //   await this.mailerService.sendMail({
    //     to: userEmail,
    //     subject: 'Welcome to Our Newsletter!',
    //     template: 'confirmation',
    //     context: {
    //       user: userEmail,
    //     },
    //   });
    // }


}