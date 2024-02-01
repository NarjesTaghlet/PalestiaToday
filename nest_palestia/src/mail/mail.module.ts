import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';

@Module({
  controllers: [MailController],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: '27718364m@gmail.com',
          pass: 'qcrh tmtr tgoh mxya',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@gmail.com>',
      },
      //  template: {
      //   dir:  __dirnzme + '/,
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}