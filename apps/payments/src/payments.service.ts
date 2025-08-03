import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
// import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { NOTIFCATIONS_SERVICE, CreateChargeDto } from 'default/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe;
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFCATIONS_SERVICE) private readonly notificationsService: ClientProxy
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>("STRIPE_SECRET_KEY")!,
      {
        apiVersion: '2025-07-30.basil'
      }

    );

  }

  async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: "pm_card_visa",// paymentMethod.id,
      amount: amount * 100,
      // payment_method_types: ['cards'],
      currency: 'usd',
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    })


    this.notificationsService.emit('notify_email', { email })
    return paymentIntent;
  }
}
