import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-nguoidung.dto';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { nguoi_dung } from '@prisma/client';
import { LoginResDto } from './dto/login-nguoidung-res.dto';

@Controller('QuanLyNguoiDung')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('DangNhap')
  async login(
    @Body() body: LoginDto,
  ): Promise<ApiResponse<LoginResDto | string>> {
    return await this.authService.login(body);
  }

  @HttpCode(201)
  @Post('DangKy')
  async signUp(
    @Body() body: SignUpDto,
  ): Promise<ApiResponse<nguoi_dung | string>> {
    return await this.authService.signUp(body);
  }
}
