import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "default/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "default/common";

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectModel(UserDocument.name) userModel: Model<UserDocument>
    ) {
        super(userModel)
    }
}