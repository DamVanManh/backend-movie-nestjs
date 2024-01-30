import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-nguoidung.dto';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { NguoiDung, LoaiNguoiDung } from '@prisma/client';
import { LoginResDto } from './dto/login-nguoidung-res.dto';

@Controller('QuanLyNguoiDung')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('DangNhap')
  async login(
    @Body() body: LoginDto,
  ): Promise<ApiResponse<LoginResDto | null>> {
    return await this.authService.login(body);
  }

  @HttpCode(201)
  @Post('DangKy')
  async signUp(
    @Body() body: SignUpDto,
  ): Promise<ApiResponse<NguoiDung | null>> {
    return await this.authService.signUp(body);
  }

  @HttpCode(200)
  @Get('LayDanhSachLoaiNguoiDung')
  async layDanhSachLoaiNguoiDung(): Promise<
    ApiResponse<LoaiNguoiDung[] | null>
  > {
    return await this.authService.layDanhSachLoaiNguoiDung();
  }
}
