import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Query,
  ParseIntPipe,
  UseGuards,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { NguoiDungService } from './nguoidung.service';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { NguoiDung, LoaiNguoiDung } from '@prisma/client';
import {
  LayDanhSachNguoiDungPhanTrangResDto,
  LoginResDto,
  SignUpDto,
  LoginDto,
  LayThongTinNguoiDungResDto,
} from './dto/nguoidung.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('QuanLyNguoiDung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @ApiTags('QuanLyNguoiDung')
  @HttpCode(200)
  @Post('DangNhap')
  async login(
    @Body() body: LoginDto,
  ): Promise<ApiResponse<LoginResDto | null>> {
    return await this.nguoiDungService.login(body);
  }

  @ApiTags('QuanLyNguoiDung')
  @HttpCode(201)
  @Post('DangKy')
  async signUp(
    @Body() body: SignUpDto,
  ): Promise<ApiResponse<NguoiDung | null>> {
    return await this.nguoiDungService.signUp(body);
  }

  @ApiTags('QuanLyNguoiDung')
  @HttpCode(200)
  @Get('LayDanhSachLoaiNguoiDung')
  async layDanhSachLoaiNguoiDung(): Promise<
    ApiResponse<LoaiNguoiDung[] | null>
  > {
    return await this.nguoiDungService.layDanhSachLoaiNguoiDung();
  }

  @ApiTags('QuanLyNguoiDung')
  @HttpCode(200)
  @Get('LayDanhSachNguoiDung')
  async layDanhSachNguoiDung(): Promise<ApiResponse<NguoiDung[] | null>> {
    return await this.nguoiDungService.layDanhSachNguoiDung();
  }

  @ApiTags('QuanLyNguoiDung')
  @HttpCode(200)
  @Get('LayDanhSachNguoiDungPhanTrang')
  async layDanhSachNguoiDungPhanTrang(
    @Query('tuKhoa') tuKhoa: string,
    @Query('soTrang', ParseIntPipe) soTrang: number,
    @Query('soPhanTuTrenTrang', ParseIntPipe) soPhanTuTrenTrang: number,
  ): Promise<ApiResponse<LayDanhSachNguoiDungPhanTrangResDto | null>> {
    return await this.nguoiDungService.layDanhSachNguoiDungPhanTrang(
      tuKhoa,
      soTrang,
      soPhanTuTrenTrang,
    );
  }

  @ApiTags('QuanLyNguoiDung')
  @HttpCode(200)
  @Get('TimKiemNguoiDungPhanTrang')
  async timKiemNguoiDungPhanTrang(
    @Query('tuKhoa') tuKhoa: string,
    @Query('soTrang', ParseIntPipe) soTrang: number,
    @Query('soPhanTuTrenTrang', ParseIntPipe) soPhanTuTrenTrang: number,
  ): Promise<ApiResponse<LayDanhSachNguoiDungPhanTrangResDto | null>> {
    return await this.nguoiDungService.layDanhSachNguoiDungPhanTrang(
      tuKhoa,
      soTrang,
      soPhanTuTrenTrang,
    );
  }

  @ApiTags('QuanLyNguoiDung')
  @HttpCode(200)
  @Get('TimKiemNguoiDung')
  async timKiemNguoiDung(
    @Query('tuKhoa') tuKhoa: string,
  ): Promise<ApiResponse<NguoiDung[] | null>> {
    return await this.nguoiDungService.timKiemNguoiDung(tuKhoa);
  }

  @ApiTags('QuanLyNguoiDung')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('LayThongTinNguoiDung')
  async layThongTinNguoiDung(
    @Query('taiKhoan') taiKhoan: string,
  ): Promise<ApiResponse<LayThongTinNguoiDungResDto | null>> {
    return await this.nguoiDungService.layThongTinNguoiDung(taiKhoan);
  }

  @ApiTags('QuanLyNguoiDung')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Post('ThemNguoiDung')
  async themNguoiDung(
    @Body() body: NguoiDung,
    @Req() req: Request,
  ): Promise<ApiResponse<NguoiDung | null>> {
    const maLoaiNguoiDungToken = req.user['maLoaiNguoiDung'];
    return await this.nguoiDungService.themNguoiDung(
      body,
      maLoaiNguoiDungToken,
    );
  }

  @ApiTags('QuanLyNguoiDung')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Put('CapNhatThongTinNguoiDung')
  async capNhatThongTinNguoiDung(
    @Body() body: NguoiDung,
    @Req() req: Request,
  ): Promise<ApiResponse<NguoiDung | null>> {
    const maLoaiNguoiDungToken = req.user['maLoaiNguoiDung'];
    return await this.nguoiDungService.capNhatThongTinNguoiDung(
      body,
      maLoaiNguoiDungToken,
    );
  }

  @ApiTags('QuanLyNguoiDung')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete('XoaNguoiDung')
  async xoaNguoiDung(
    @Query('taiKhoan') taiKhoan: string,
    @Req() req: Request,
  ): Promise<ApiResponse<string | null>> {
    const maLoaiNguoiDungToken = req.user['maLoaiNguoiDung'];
    return await this.nguoiDungService.xoaNguoiDung(
      taiKhoan,
      maLoaiNguoiDungToken,
    );
  }
}
