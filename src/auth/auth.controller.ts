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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-nguoidung.dto';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { NguoiDung, LoaiNguoiDung } from '@prisma/client';
import { LoginResDto } from './dto/login-nguoidung-res.dto';
import { LayDanhSachNguoiDungPhanTrangResDto } from './dto/laydanhsachnguoidungphantrang-res.dto copy';

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

  @HttpCode(200)
  @Get('LayDanhSachNguoiDung')
  async layDanhSachNguoiDung(): Promise<ApiResponse<NguoiDung[] | null>> {
    return await this.authService.layDanhSachNguoiDung();
  }

  @HttpCode(200)
  @Get('LayDanhSachNguoiDungPhanTrang')
  async layDanhSachNguoiDungPhanTrang(
    @Query('tuKhoa') tuKhoa: string,
    @Query('soTrang', ParseIntPipe) soTrang: number,
    @Query('soPhanTuTrenTrang', ParseIntPipe) soPhanTuTrenTrang: number,
  ): Promise<ApiResponse<LayDanhSachNguoiDungPhanTrangResDto | null>> {
    return await this.authService.layDanhSachNguoiDungPhanTrang(
      tuKhoa,
      soTrang,
      soPhanTuTrenTrang,
    );
  }

  @HttpCode(200)
  @Get('TimKiemNguoiDungPhanTrang')
  async timKiemNguoiDungPhanTrang(
    @Query('tuKhoa') tuKhoa: string,
    @Query('soTrang', ParseIntPipe) soTrang: number,
    @Query('soPhanTuTrenTrang', ParseIntPipe) soPhanTuTrenTrang: number,
  ): Promise<ApiResponse<LayDanhSachNguoiDungPhanTrangResDto | null>> {
    return await this.authService.layDanhSachNguoiDungPhanTrang(
      tuKhoa,
      soTrang,
      soPhanTuTrenTrang,
    );
  }

  @HttpCode(200)
  @Get('TimKiemNguoiDung')
  async timKiemNguoiDung(
    @Query('tuKhoa') tuKhoa: string,
  ): Promise<ApiResponse<NguoiDung[] | null>> {
    return await this.authService.timKiemNguoiDung(tuKhoa);
  }
}