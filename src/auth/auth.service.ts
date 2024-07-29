import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { RegisterDto, CreateUserDto, UpdateAuthDto, LoginDto, } from './dto'

import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';




@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel( User.name ) 
    private userModel: Model<User>,
    private jwtService: JwtService
  ){}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 1 encriptacion de password
    // 2 guardar el usuario 
    // 3 generar el jwt
    //manejar las excepciones
    try{
      const  {password, ...userData}  = createUserDto;
      
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      })
      await newUser.save();
      // retornando el usuario sin la contraseña
      const {password: _, ...user} = newUser.toJSON();
      
      return user;
      
    }catch(error){
      if( error.code === 11000 ){
        throw new BadRequestException(`${ createUserDto.email } already exist!`)
      }
      throw new InternalServerErrorException('Somethin terrible happen!!!')
    }  
  }
  
  
  async register (registerDto: RegisterDto): Promise<LoginResponse> {
    // crear un registro de usuario utilizando el create 
    // y returnar el token 
    await this.create( registerDto );
  
    return await this.login(registerDto)
  }
  
  async login(loginDto: LoginDto):Promise<LoginResponse> {
    
    // console.log({loginDto})
    
    const {email, password} = loginDto;
    
    const user = await this.userModel.findOne({email});
    
    if(!user){
      throw new UnauthorizedException("Not valid credentials - email");
    }
    
    if(!bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException("Not valid credentials - password");
    }
    
    const { password: _, ...rest } = user.toJSON();
    
    
    return {
      user: rest,
      token: this.getJwtToken({ id :  user.id } )
    };
    
    // user {_id , name , roles} -> token -> afsadf.asdfsa.asdf
  }

  findAll():Promise<User[]> {
    return this.userModel.find();
  }
  
  
  async findUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    const {password, ...rest} = user.toJSON();
    return rest
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  
  
  getJwtToken(payload: JwtPayload){
    
    const token = this.jwtService.sign(payload)
    return token;
    
  }
}
