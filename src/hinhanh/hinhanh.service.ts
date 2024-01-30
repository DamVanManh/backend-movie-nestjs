import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NguoiDung } from '@prisma/client';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { PrismaService } from 'src/database/prisma.service';
import { InfoHinhAnhVaNguoiTaoAnh } from './dto/info-hinhanh.sto';
import { CreateHinhAnhDto } from './dto/create-hinhanh.dto';

@Injectable()
export class HinhanhService {
  constructor(private prismaService: PrismaService) {}
  async getHinhAnhs(): Promise<ApiResponse<NguoiDung[] | string>> {
    // try {

    //     let data = await this.prismaService.NguoiDung.findMany();
    //     return ResponseHelper.success(data)
    // } catch (error) {
    //     if (error?.status && error?.status != 500)
    //         ResponseHelper.error(error.message, error.status);
    //     ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async getHinhAnhByName(
    q: string,
  ): Promise<ApiResponse<NguoiDung[] | string>> {
    // try {

    //     let data = await this.prismaService.NguoiDung.findMany({
    //         where: {
    //             ten_hinh: {
    //                 contains: q
    //             }
    //         }
    //     });
    //     return ResponseHelper.success(data)
    // } catch (error) {
    //     if (error?.status && error?.status != 500)
    //         ResponseHelper.error(error.message, error.status);
    //     ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async getInfoHinhAnhVaNguoiTaoAnh(
    id: string,
  ): Promise<ApiResponse<InfoHinhAnhVaNguoiTaoAnh | string>> {
    // try {

    //     let data = await this.prismaService.NguoiDung.findUnique({
    //         where: {
    //             hinh_id: parseFloat(id)
    //         },
    //         include: {
    //             NguoiDung: {
    //                 select: {
    //                     email: true,
    //                     ho_ten: true,
    //                     tuoi: true,
    //                     anh_dai_dien: true,
    //                     NguoiDung_id: true,
    //                 },
    //             },
    //         },

    //     })
    //     if (!data) {
    //         ResponseHelper.error('Không tồn tại id ảnh')
    //     }
    //     return ResponseHelper.success(data)
    // } catch (error) {
    //     if (error?.status && error?.status != 500)
    //         ResponseHelper.error(error.message, error.status);
    //     ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async getHinhAnhsByNguoiDung(
    nguoiDungId: number,
  ): Promise<ApiResponse<NguoiDung[] | string | null>> {
    // try {

    //     let data = await this.prismaService.NguoiDung.findMany({
    //         where: {
    //             NguoiDung_id: nguoiDungId
    //         }
    //     });
    //     return ResponseHelper.success(data)
    // } catch (error) {
    //     if (error?.status && error?.status != 500)
    //         ResponseHelper.error(error.message, error.status);
    //     ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async xoaAnhbyHinhId(
    hinhId: string,
    nguoiDungId: number,
  ): Promise<ApiResponse<string>> {
    // try {
    //     let hinhanh = await this.prismaService.NguoiDung.findUnique({
    //         where: {
    //             hinh_id: parseFloat(hinhId),
    //             NguoiDung_id: nguoiDungId
    //         }
    //     })

    //     if (!hinhanh) {
    //         ResponseHelper.error('Không thể xoá hình của user khác hoặc không tồn tại hình');
    //     }

    //     // xoá các record ở table khác có dùng hinh_id làm FK
    //     await this.prismaService.binh_luan.deleteMany({
    //         where: {
    //             hinh_id: parseFloat(hinhId)
    //         }
    //     });
    //     await this.prismaService.luu_anh.deleteMany({
    //         where: {
    //             hinh_id: parseFloat(hinhId)
    //         }
    //     });

    //     // xoá hình sau khi thảo mãn điều kiện
    //     await this.prismaService.NguoiDung.delete({
    //         where: {
    //             hinh_id: parseFloat(hinhId)
    //         }
    //     });
    //     return ResponseHelper.success('')
    // } catch (error) {
    //     if (error?.status && error?.status != 500)
    //         ResponseHelper.error(error.message, error.status);
    //     ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async create(
    createHinhAnhDto: CreateHinhAnhDto,
    nguoiDungId: number,
  ): Promise<ApiResponse<NguoiDung | string>> {
    // try {

    //     let hinhAnh = {
    //         ...createHinhAnhDto,
    //         NguoiDung_id: nguoiDungId
    //     }
    //     const newHinhAnh = await this.prismaService.NguoiDung.create({ data: hinhAnh });

    //     return ResponseHelper.success(newHinhAnh)
    // } catch (error) {
    //     if (error?.status && error?.status != 500)
    //         ResponseHelper.error(error.message, error.status);
    //     ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }
}
