import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import {IsNotEmpty, MinLength} from "class-validator";
import {errorMessages} from "../../generics/error_messages";

export class LoginCredentialsDto extends PartialType(RegisterUserDto) {

    @IsNotEmpty()
    username : string

    @IsNotEmpty()
    @MinLength(4,{ message: errorMessages.MinError(4) })
    password : string


}
