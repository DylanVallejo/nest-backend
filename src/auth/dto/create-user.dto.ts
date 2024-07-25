import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()//valida que sea un correo 
    email: string;
    
    @IsString()
    name: string;
    
    @MinLength(6)
    password: string;
    
}
