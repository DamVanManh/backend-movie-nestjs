import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { nguoi_dung } from '@prisma/client';
import { CreateLuuanhDto } from './dto/create-luuanh.dto';
import { DeleteLuuanhDto } from './dto/delete-luuanh.dto';

@Injectable()
export class LuuanhService {
  constructor(private prismaService: PrismaService) {}
  async getInfoLuuHinh(
    idAnh: string,
    nguoiDungId: number,
  ): Promise<ApiResponse<nguoi_dung | string>> {
    // try {

    //   let data = await this.prismaService.nguoi_dung.findUnique({
    //     where: {
    //       nguoi_dung_id_hinh_id: {
    //         hinh_id: parseFloat(idAnh),
    //         nguoi_dung_id: nguoiDungId
    //       }
    //     }
    //   })
    //   return ResponseHelper.success(data)
    // } catch (error) {
    //   if (error?.status && error?.status != 500)
    //     ResponseHelper.error(error.message, error.status);
    //   ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async getHinhAnhDaLuus(
    nguoiDungId: number,
  ): Promise<ApiResponse<nguoi_dung[] | string | null>> {
    // try {

    //   let data = await this.prismaService.nguoi_dung.findMany({
    //     where: {
    //       nguoi_dung_id: nguoiDungId
    //     },
    //     include: {
    //       nguoi_dung: true
    //     },
    //   })
    //   let hinhAnhs = data.map(d => ({ ...d.nguoi_dung }))
    //   return ResponseHelper.success(hinhAnhs)
    // } catch (error) {
    //   if (error?.status && error?.status != 500)
    //     ResponseHelper.error(error.message, error.status);
    //   ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async luuAnh(
    createLuuanhDto: CreateLuuanhDto,
    nguoiDungId: number,
  ): Promise<ApiResponse<nguoi_dung | string>> {
    // try {

    //   let currentLuuAnh = await this.prismaService.nguoi_dung.findUnique({
    //     where: {
    //       nguoi_dung_id_hinh_id: {
    //         hinh_id: createLuuanhDto.hinh_id,
    //         nguoi_dung_id: nguoiDungId
    //       }
    //     }
    //   })

    //   if (currentLuuAnh) {
    //     ResponseHelper.error("Ảnh đã được lưu")
    //   }

    //   let luuAnh = {
    //     ...createLuuanhDto,
    //     nguoi_dung_id: nguoiDungId,
    //     ngay_luu: new Date()
    //   }
    //   const newLuuAnh = await this.prismaService.nguoi_dung.create({ data: luuAnh });
    //   return ResponseHelper.success(newLuuAnh)
    // } catch (error) {
    //   if (error?.status && error?.status != 500)
    //     ResponseHelper.error(error.message, error.status);
    //   ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async deleteLuuAnh(
    deleteLuuanhDto: DeleteLuuanhDto,
    nguoiDungId: number,
  ): Promise<ApiResponse<string>> {
    // try {

    //   let currentLuuAnh = await this.prismaService.nguoi_dung.findUnique({
    //     where: {
    //       nguoi_dung_id_hinh_id: {
    //         hinh_id: deleteLuuanhDto.hinh_id,
    //         nguoi_dung_id: nguoiDungId
    //       }
    //     }
    //   })

    //   if (!currentLuuAnh) {
    //     ResponseHelper.error("Ảnh chưa được lưu")
    //   }

    //   await this.prismaService.nguoi_dung.delete({
    //     where: {
    //       nguoi_dung_id_hinh_id: {
    //         hinh_id: deleteLuuanhDto.hinh_id,
    //         nguoi_dung_id: nguoiDungId
    //       }

    //     }
    //   });
    //   return ResponseHelper.success("")
    // } catch (error) {
    //   if (error?.status && error?.status != 500)
    //     ResponseHelper.error(error.message, error.status);
    //   ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }
}
