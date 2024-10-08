import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import {CreateUserDto, LoginDto,UpdateAuthDto,RegisterDto} from './dto'
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    // console.log(createAuthDto)
    return this.
    authService.create(createAuthDto);
  }
  
  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
  
  
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    //regisro de usuario 
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request):Promise<User[]> {
    // const user =req['user']
    // console.log({user});
    return this.authService.findAll();
  }
  
  // crear controlador recibir el token y regresar una nueva instancia de LoginResponse
  //LoginResponse
  // @UseGuards(AuthGuard)  
  // @Post('/check-token')   //puede ser meeadinte un get tambien 
  // checkToken(@Request() request: Request):Promise<LoginResponse> {
  //   return this.authService.checkToken(request);
  // }
  
  
  @UseGuards( AuthGuard )
  @Get('check-token')
  checkToken( @Request() req: Request ): LoginResponse {
      
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    }

  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
