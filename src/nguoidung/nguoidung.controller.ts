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
import { LoginDto } from './dto/login-nguoidung.dto';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { NguoiDung, LoaiNguoiDung } from '@prisma/client';
import { LoginResDto } from './dto/login-nguoidung-res.dto';
import { LayDanhSachNguoiDungPhanTrangResDto } from './dto/laydanhsachnguoidungphantrang-res.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('QuanLyNguoiDung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @HttpCode(200)
  @Post('DangNhap')
  async login(
    @Body() body: LoginDto,
  ): Promise<ApiResponse<LoginResDto | null>> {
    return await this.nguoiDungService.login(body);
  }

  @HttpCode(201)
  @Post('DangKy')
  async signUp(
    @Body() body: SignUpDto,
  ): Promise<ApiResponse<NguoiDung | null>> {
    return await this.nguoiDungService.signUp(body);
  }

  @HttpCode(200)
  @Get('LayDanhSachLoaiNguoiDung')
  async layDanhSachLoaiNguoiDung(): Promise<
    ApiResponse<LoaiNguoiDung[] | null>
  > {
    return await this.nguoiDungService.layDanhSachLoaiNguoiDung();
  }

  @HttpCode(200)
  @Get('LayDanhSachNguoiDung')
  async layDanhSachNguoiDung(): Promise<ApiResponse<NguoiDung[] | null>> {
    return await this.nguoiDungService.layDanhSachNguoiDung();
  }

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

  @HttpCode(200)
  @Get('TimKiemNguoiDung')
  async timKiemNguoiDung(
    @Query('tuKhoa') tuKhoa: string,
  ): Promise<ApiResponse<NguoiDung[] | null>> {
    return await this.nguoiDungService.timKiemNguoiDung(tuKhoa);
  }

  // cần return data liên quan thông tin đặt vé mà hiện tại chưa làm nên sẽ hoàn thiện sau
  // @HttpCode(200) // token phải là quản trị
  // @Post('LayThongTinNguoiDung')
  // async layThongTinNguoiDung(
  //   @Query('tuKhoa') tuKhoa: string,
  // ): Promise<ApiResponse<NguoiDung[] | null>> {
  //   return await this.NguoiDungService.layThongTinNguoiDung(tuKhoa);
  // }

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
