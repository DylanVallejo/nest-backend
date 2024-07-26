import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel( User.name ) 
    private userModel: Model<User>
  ){}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 1 encriptacion de password
    // 2 guardar el usuario 
    // 3 generar el jwt
    //manejar las excepciones
    try{
      const newUser = new this.userModel( createUserDto );
      return await newUser.save();  
    }catch(error){
      if( error.code === 11000 ){
        throw new BadRequestException(`${ createUserDto.email } already exist!`)
      }
      throw new InternalServerErrorException('Somethin terrible happen!!!')
    }  
  }

  findAll() {
    return `This action returns all auth`;
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
}
