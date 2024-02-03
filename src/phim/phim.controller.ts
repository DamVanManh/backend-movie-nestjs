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
} from '@nestjs/common';
import { PhimService } from './phim.service';
import { LayDanhSachPhimPhanTrangResDto } from './dto/laydanhsachphimphantrang-res.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { Banner, Phim } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ThemPhimUploadHinhReqDto } from './dto/themphimuploadhinhreq.dto';

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

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('LayThongTinPhim')
  async layThongTinPhim(
    @Query('maPhim', ParseIntPipe) maPhim: number,
  ): Promise<ApiResponse<Phim | null>> {
    return await this.phimService.layThongTinPhim(maPhim);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('hinhAnh', {
      // nếu browser chỉ gửi lên 1 file thì thay bằng FileInterceptor và bỏ tham số '10'(có thể up tối đa 10 hình)
      storage: diskStorage({
        destination: process.cwd() + '/public/images', // dường dẫn muốn lưu
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname), // đổi tên file sẽ lưu
      }),
    }),
  )
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
}