import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, NOTIFCATIONS_SERVICE } from 'default/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        NOTIFCATIONS_HOST: Joi.string().required(),
        NOTIFCATIONS_PORT: Joi.number().required(),
      })
    }),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: NOTIFCATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFCATIONS_HOST'),
            port: configService.get("NOTIFCATIONS_PORT")
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule { }
