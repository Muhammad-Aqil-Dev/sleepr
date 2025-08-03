import { IsEmail } from "class-validator";
import { CreateChargeDto } from "default/common";

export class PaymentCreateChargeDto extends CreateChargeDto {

    @IsEmail()
    email: string
}