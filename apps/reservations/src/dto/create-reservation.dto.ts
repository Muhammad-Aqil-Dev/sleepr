import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { CardDto } from "../../../../libs/common/src/dto/card.dto";
import { CreateChargeDto } from "default/common";

export class CreateReservationDto {
        @IsDate()
        @Type(() => Date)
        startDate: Date;

        @IsDate()
        @Type(() => Date)
        endDate: Date;

        @IsString()
        @IsNotEmpty()
        placeId: string;

        @IsString()
        @IsNotEmpty()
        invoiceId: string;

        @IsDefined()
        @IsNotEmptyObject()
        @ValidateNested()
        @Type(() => CreateChargeDto)
        charge: CreateChargeDto

}
