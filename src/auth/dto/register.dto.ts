import {  IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    
    // creacion de usuarios normales
    @IsEmail()
    email: string;
    
    @IsString()
    name:string;
    
    @MinLength(6)
    password: string;
    

    
}