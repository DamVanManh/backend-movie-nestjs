import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PhimService } from './phim.service';
import { LayDanhSachPhimPhanTrangResDto } from './dto/laydanhsachphimphantrang-res.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { Banner, Phim } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('QuanLyPhim')
export class PhimController {
  constructor(private readonly phimService: PhimService) {}

  @HttpCode(200)
  @Get('LayDanhSachBanner')
  layDanhSachBanner(): Promise<ApiResponse<Banner[] | null>> {
    return this.phimService.layDanhSachBanner();
  }

  @HttpCode(200)
  @Get('LayDanhSachPhim')
  layDanhSachPhim(
    @Query('tenPhim') tenPhim: string,
  ): Promise<ApiResponse<Phim[] | null>> {
    return this.phimService.layDanhSachPhim(tenPhim);
  }

  @HttpCode(200)
  @Get('LayDanhSachPhimPhanTrang')
  async layDanhSachPhimPhanTrang(
    @Query('tenPhim') tenPhim: string,
    @Query('soTrang', ParseIntPipe) soTrang: number,
    @Query('soPhanTuTrenTrang', ParseIntPipe) soPhanTuTrenTrang: number,
  ): Promise<ApiResponse<LayDanhSachPhimPhanTrangResDto | null>> {
    return await this.phimService.layDanhSachPhimPhanTrang(
      tenPhim,
      soTrang,
      soPhanTuTrenTrang,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete('XoaPhim')
  async xoaPhim(
    @Query('maPhim', ParseIntPipe) maPhim: number,
    @Req() req: Request,
  ): Promise<ApiResponse<string | null>> {
    const maLoaiNguoiDungToken = req.user['maLoaiNguoiDung'];
    return await this.phimService.xoaPhim(maPhim, maLoaiNguoiDungToken);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhimDto) {
    return this.phimService.update(+id, updatePhimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phimService.remove(+id);
  }
}
