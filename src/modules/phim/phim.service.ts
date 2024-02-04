import { HttpStatus, Injectable } from '@nestjs/common';
import { LayDanhSachPhimPhanTrangResDto } from './dto/laydanhsachphimphantrang-res.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { Banner, Phim } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { MaLoaiNguoiDung } from 'src/modules/nguoidung/dto/maloainguoidung.dto';
import { ThemPhimUploadHinhReqDto } from './dto/themphimuploadhinh-req.dto';
import { CapNhatPhimUploadReqDto } from './dto/capnhatphimupload-req.dto';

@Injectable()
export class PhimService {
  constructor(private prismaService: PrismaService) {}

  async layDanhSachBanner(): Promise<ApiResponse<Banner[] | null>> {
    try {
      let data = await this.prismaService.banner.findMany();
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async layDanhSachPhim(tenPhim: string): Promise<ApiResponse<Phim[] | null>> {
    try {
      let data = await this.prismaService.phim.findMany({
        where: {
          tenPhim: {
            contains: tenPhim,
          },
        },
      });
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async layDanhSachPhimPhanTrang(
    tenPhim: string,
    soTrang: number,
    soPhanTuTrenTrang: number,
  ): Promise<ApiResponse<LayDanhSachPhimPhanTrangResDto | null>> {
    try {
      let index = (soTrang - 1) * soPhanTuTrenTrang;

      let dataCount = await this.prismaService.phim.count({
        where: {
          tenPhim: {
            contains: tenPhim,
          },
        },
      });
      let totalPage = Math.ceil(dataCount / soPhanTuTrenTrang);

      // người dùng filter theo page
      let phims = await this.prismaService.phim.findMany({
        skip: index,
        take: soPhanTuTrenTrang,
        where: {
          tenPhim: {
            contains: tenPhim,
          },
        },
      });

      let data = {
        currentPage: soTrang,
        count: soPhanTuTrenTrang,
        totalPages: totalPage,
        totalCount: dataCount,
        items: phims,
      };
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async xoaPhim(
    maPhim: number,
    maLoaiNguoiDungToken: string,
  ): Promise<ApiResponse<string | null>> {
    try {
      if (maLoaiNguoiDungToken !== MaLoaiNguoiDung.QuanTri) {
        ResponseHelper.error('Không có quyền truy cập!', HttpStatus.FORBIDDEN);
      }

      let check = await this.prismaService.phim.findFirst({
        where: {
          maPhim,
        },
      });

      if (!check) {
        ResponseHelper.error('Mã phim không tồn tại', HttpStatus.BAD_REQUEST);
      }

      let phim = await this.prismaService.phim.delete({
        where: {
          maPhim,
        },
      });

      return ResponseHelper.success('Xóa thành công!');
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async layThongTinPhim(maPhim: number): Promise<ApiResponse<Phim | null>> {
    try {
      let data = await this.prismaService.phim.findFirst({
        where: {
          maPhim,
        },
      });
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async themPhimUploadHinh(
    file: Express.Multer.File,
    themPhimUploadHinhReqDto: ThemPhimUploadHinhReqDto,
    maLoaiNguoiDungToken: string,
  ): Promise<ApiResponse<Phim | null>> {
    try {
      if (maLoaiNguoiDungToken !== MaLoaiNguoiDung.QuanTri) {
        ResponseHelper.error('Không có quyền truy cập!', HttpStatus.FORBIDDEN);
      }

      const newPhim = {
        tenPhim: themPhimUploadHinhReqDto.tenPhim,
        trailer: themPhimUploadHinhReqDto.trailer,
        hinhAnh: file.filename,
        moTa: themPhimUploadHinhReqDto.moTa,
        ngayKhoiChieu: new Date(themPhimUploadHinhReqDto.ngayKhoiChieu),
        danhGia: parseInt(themPhimUploadHinhReqDto.danhGia),
        hot: Boolean(parseInt(themPhimUploadHinhReqDto.hot)),
        dangChieu: Boolean(parseInt(themPhimUploadHinhReqDto.dangChieu)),
        sapChieu: Boolean(parseInt(themPhimUploadHinhReqDto.sapChieu)),
      };
      let data = await this.prismaService.phim.create({
        data: newPhim,
      });
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async capNhatPhimUpload(
    file: Express.Multer.File,
    themPhimUploadHinhReqDto: CapNhatPhimUploadReqDto,
    maLoaiNguoiDungToken: string,
  ): Promise<ApiResponse<Phim | null>> {
    try {
      if (maLoaiNguoiDungToken !== MaLoaiNguoiDung.QuanTri) {
        ResponseHelper.error('Không có quyền truy cập!', HttpStatus.FORBIDDEN);
      }

      const maPhim = parseInt(themPhimUploadHinhReqDto.maPhim);

      let checkPhim = await this.prismaService.phim.findFirst({
        where: {
          maPhim,
        },
      });

      if (!checkPhim) {
        ResponseHelper.error('Phim không tồn tại!', HttpStatus.BAD_REQUEST);
      }

      const dataUpdate = {
        tenPhim: themPhimUploadHinhReqDto.tenPhim
          ? themPhimUploadHinhReqDto.tenPhim
          : checkPhim.tenPhim,
        trailer: themPhimUploadHinhReqDto.trailer
          ? themPhimUploadHinhReqDto.trailer
          : checkPhim.trailer,
        hinhAnh: file && file.filename ? file.filename : checkPhim.hinhAnh,
        moTa: themPhimUploadHinhReqDto.moTa
          ? themPhimUploadHinhReqDto.moTa
          : checkPhim.moTa,
        ngayKhoiChieu: themPhimUploadHinhReqDto.ngayKhoiChieu
          ? new Date(themPhimUploadHinhReqDto.ngayKhoiChieu)
          : checkPhim.ngayKhoiChieu,
        danhGia: themPhimUploadHinhReqDto.danhGia
          ? parseInt(themPhimUploadHinhReqDto.danhGia)
          : checkPhim.danhGia,
        hot: themPhimUploadHinhReqDto.hot
          ? Boolean(parseInt(themPhimUploadHinhReqDto.hot))
          : checkPhim.hot,
        dangChieu: themPhimUploadHinhReqDto.dangChieu
          ? Boolean(parseInt(themPhimUploadHinhReqDto.dangChieu))
          : checkPhim.dangChieu,
        sapChieu: themPhimUploadHinhReqDto.sapChieu
          ? Boolean(parseInt(themPhimUploadHinhReqDto.sapChieu))
          : checkPhim.sapChieu,
      };
      let data = await this.prismaService.phim.update({
        where: { maPhim },
        data: {
          ...dataUpdate,
        },
      });
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }
}
