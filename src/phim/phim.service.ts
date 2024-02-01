import { HttpStatus, Injectable } from '@nestjs/common';
import { LayDanhSachPhimPhanTrangResDto } from './dto/laydanhsachphimphantrang-res.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { Banner, Phim } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { MaLoaiNguoiDung } from 'src/nguoidung/dto/maloainguoidung.dto';

@Injectable()
export class PhimService {
  constructor(private prismaService: PrismaService) {}

  async layDanhSachBanner(): Promise<ApiResponse<Banner[] | null>> {
    const data = this.prismaService.banner.findMany();
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
        ResponseHelper.error(undefined, HttpStatus.FORBIDDEN);
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

  findOne(id: number) {
    return `This action returns a #${id} phim`;
  }

  update(id: number, updatePhimDto) {
    return `This action updates a #${id} phim`;
  }

  remove(id: number) {
    return `This action removes a #${id} phim`;
  }
}
