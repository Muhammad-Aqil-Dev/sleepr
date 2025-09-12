import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as  nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: configService.get('SMTP_USER'),
        clientId: configService.get("GOOGLE_OAUTH_CLIENT_ID"),
        clientSecret: configService.get("GOOGLE_OAUTH_CLIENT_SECRET"),
        refreshToken: configService.get("GOOGLE_OAUTH_REFRESH_TOKEN"),
      },
      connectionTimeout: 60000, // 60s
      greetingTimeout: 60000,   // 60s

    })

  }

  async notifyEmail({ email, text }: NotifyEmailDto) {

    console.log("notifyEmail", email)
    try {
      await this.transporter.sendMail({
        from: this.configService.get('SMTP_USER'),
        to: email,
        subject: "Sleepr Notification",
        text: text
      })

    } catch (error) {
      console.log(error)
    }
  }

}
