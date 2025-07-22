import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'default/common';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as  Joi from 'joi';
@Module({
  imports: [
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'apps/auth/.env', // 👈 Add this line
    
          validationSchema: Joi.object({
            MONGODB_URI: Joi.string().required(),
            JWT_SECRET:Joi.string().required(),
            JWT_Expiration:Joi.string().required(),
            PORT: Joi.number().required(), // 👈 Add this line
          })
        }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_Expiration')}s`
        }
      })
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
