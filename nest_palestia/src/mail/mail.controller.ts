import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body() mailData: { subject: string; content: string }) {
    await this.mailService.sendUserEmail(mailData.subject, mailData.content);
    return { message: 'Email sent successfully' };
  }

  // @Post('subscribe')
  // async subscribeToNewsletter(@Body() body: { email: string }) {
  //   await this.mailService.sendWelcomeEmail(body.email);
  //   return { message: 'Subscription successful, welcome email sent!' };
  // }

}