import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    // creacion de usuarios desde administrador
    
    @IsEmail()//valida que sea un correo 
    email: string;
    
    @IsString()
    name: string;
    
    @MinLength(6)
    password: string;
    
    
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
    
    @IsArray()
    @IsOptional()
    roles?: string[];
    
}
