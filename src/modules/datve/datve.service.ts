import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { PrismaService } from 'src/database/prisma.service';
import {
  DatveDto,
  LayDanhSachPhongVeResDto,
  TaoLichChieuReqDto,
} from './dto/datve.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { MaLoaiNguoiDung } from '../nguoidung/dto/nguoidung.dto';

@Injectable()
export class DatveService {
  constructor(private prismaService: PrismaService) {}

  async datve(
    datveDto: DatveDto,
    taiKhoan: string,
  ): Promise<ApiResponse<string | null>> {
    try {
      let check = await this.prismaService.datVe.findFirst({
        where: {
          AND: [
            { taiKhoan },
            { maLichChieu: datveDto.maLichChieu },
            { maGhe: { in: datveDto.danhSachMaGhe } },
          ],
        },
      });

      if (check) {
        ResponseHelper.error(
          'Người dùng này đã đặt ghế này trước đó, vui lòng chọn ghế khác',
          HttpStatus.BAD_REQUEST,
        );
      }

      let datVes = datveDto.danhSachMaGhe.map((maGhe) => ({
        taiKhoan,
        maLichChieu: datveDto.maLichChieu,
        maGhe,
      }));

      await this.prismaService.datVe.createMany({
        data: datVes,
      });
      return ResponseHelper.success('Đặt vé thành công');
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async taoLichChieu(
    taoLichChieuReqDto: TaoLichChieuReqDto,
    maLoaiNguoiDungToken: string,
  ): Promise<ApiResponse<string | null>> {
    try {
      if (maLoaiNguoiDungToken !== MaLoaiNguoiDung.QuanTri) {
        ResponseHelper.error('Không có quyền truy cập!', HttpStatus.FORBIDDEN);
      }
      const { maRap, maPhim, ngayGioChieu } = taoLichChieuReqDto;

      let checkDate;
      try {
        checkDate = new Date(ngayGioChieu);
      } catch (error) {
        ResponseHelper.error(
          'Định dạng ngày không đúng, ví dụ định dạng đúng: 2024-11-05T08:15:30',
          HttpStatus.BAD_REQUEST,
        );
      }

      let check = await this.prismaService.lichChieu.findFirst({
        where: {
          AND: [{ maRap }, { maPhim }, { ngayGioChieu: checkDate }],
        },
      });

      if (check) {
        ResponseHelper.error(
          'Không thể tạo trùng lịch chiếu',
          HttpStatus.BAD_REQUEST,
        );
      }
      let newLichChieu = {
        ...taoLichChieuReqDto,
        ngayGioChieu: checkDate,
      };

      const lichChieuCteated = await this.prismaService.lichChieu.create({
        data: newLichChieu,
      });
      return ResponseHelper.success('Thêm lịch chiếu thành công!');
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async layDanhSachPhongVe(
    maLichChieu: number,
  ): Promise<ApiResponse<LayDanhSachPhongVeResDto | null>> {
    try {
      let check = await this.prismaService.lichChieu.findFirst({
        where: {
          maLichChieu,
        },
      });
      if (!check) {
        ResponseHelper.error(
          'Mã lịch chiếu không tồn tại!',
          HttpStatus.BAD_REQUEST,
        );
      }

      let data = await this.prismaService.lichChieu.findFirst({
        where: {
          maLichChieu,
        },
        include: {
          Phim: {
            where: {
              maPhim: check.maPhim,
            },
          },
          DatVe: {
            where: {
              maLichChieu: check.maLichChieu,
            },
          },
          RapPhim: {
            where: {
              maRap: check.maRap,
            },
            include: {
              Ghe: {
                where: {
                  maRap: check.maRap,
                },
              },
              CumRap: true,
            },
          },
        },
      });

      let result = {
        thongTinPhim: {
          maLichChieu: data?.maLichChieu,
          tenCumRap: data?.RapPhim?.CumRap?.tenCumRap,
          tenRap: data?.RapPhim?.tenRap,
          diaChi: data?.RapPhim?.CumRap?.diaChi,
          tenPhim: data?.Phim?.tenPhim,
          hinhAnh: data?.Phim?.hinhAnh,
          ngayGioChieu: data?.ngayGioChieu,
        },
        danhSachGhe: data?.RapPhim?.Ghe?.map((g) => ({
          ...g,
          giaVe: data?.giaVe,
          daDat: data?.DatVe?.map((dv) => dv.maGhe)?.includes(g.maGhe),
          taiKhoanNguoiDat: data?.DatVe?.find((dv) => dv?.maGhe === g.maGhe)
            ? data?.DatVe?.find((dv) => dv?.maGhe === g.maGhe).taiKhoan
            : null,
        })),
      };
      return ResponseHelper.success(result);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }
}
