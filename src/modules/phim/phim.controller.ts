import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Body,
  Patch,
} from '@nestjs/common';
import { PhimService } from './phim.service';
import { LayDanhSachPhimPhanTrangResDto } from './dto/laydanhsachphimphantrang-res.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { Banner, Phim } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ThemPhimUploadHinhReqDto } from './dto/themphimuploadhinh-req.dto';
import { CapNhatPhimUploadReqDto } from './dto/capnhatphimupload-req.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('QuanLyPhim')
export class PhimController {
  constructor(private readonly phimService: PhimService) {}

  @ApiTags('QuanLyPhim')
  @HttpCode(200)
  @Get('LayDanhSachBanner')
  layDanhSachBanner(): Promise<ApiResponse<Banner[] | null>> {
    return this.phimService.layDanhSachBanner();
  }

  @ApiTags('QuanLyPhim')
  @HttpCode(200)
  @Get('LayDanhSachPhim')
  layDanhSachPhim(
    @Query('tenPhim') tenPhim: string,
  ): Promise<ApiResponse<Phim[] | null>> {
    return this.phimService.layDanhSachPhim(tenPhim);
  }

  @ApiTags('QuanLyPhim')
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

  @ApiTags('QuanLyPhim')
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

  @ApiTags('QuanLyPhim')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('LayThongTinPhim')
  async layThongTinPhim(
    @Query('maPhim', ParseIntPipe) maPhim: number,
  ): Promise<ApiResponse<Phim | null>> {
    return await this.phimService.layThongTinPhim(maPhim);
  }

  @ApiTags('QuanLyPhim')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('hinhAnh', {
      storage: diskStorage({
        destination: process.cwd() + '/public/images',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @ApiTags('QuanLyPhim')
  @Post('/ThemPhimUploadHinh')
  async themPhimUploadHinh(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() themPhimUploadHinhReqDto: ThemPhimUploadHinhReqDto,
  ): Promise<ApiResponse<Phim | null>> {
    const maLoaiNguoiDungToken = req.user['maLoaiNguoiDung'];
    return await this.phimService.themPhimUploadHinh(
      file,
      themPhimUploadHinhReqDto,
      maLoaiNguoiDungToken,
    );
  }

  @ApiTags('QuanLyPhim')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('hinhAnh', {
      storage: diskStorage({
        destination: process.cwd() + '/public/images',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @ApiTags('QuanLyPhim')
  @UseGuards(AuthGuard('jwt'))
  @Patch('/CapNhatPhimUpload')
  async capNhatPhimUpload(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() capNhatPhimUploadReqDto: CapNhatPhimUploadReqDto,
  ): Promise<ApiResponse<Phim | null>> {
    const maLoaiNguoiDungToken = req.user['maLoaiNguoiDung'];
    return await this.phimService.capNhatPhimUpload(
      file,
      capNhatPhimUploadReqDto,
      maLoaiNguoiDungToken,
    );
  }
}
