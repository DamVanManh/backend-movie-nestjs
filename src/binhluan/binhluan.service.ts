import { Injectable } from '@nestjs/common';
import { NguoiDung } from '@prisma/client';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBinhluanDto } from './dto/create-binhluan.dto';

@Injectable()
export class BinhluanService {
  constructor(private prismaService: PrismaService) {}
  async getByIdAnh(id: string): Promise<ApiResponse<NguoiDung[] | string>> {
    // try {

    //   let data = await this.prismaService.NguoiDung.findMany({
    //     where: {
    //       hinh_id: parseFloat(id)
    //     }

    //   })
    //   if (!data.length) {
    //     ResponseHelper.error("Không tồn tại id hình")
    //   }
    //   return ResponseHelper.success(data)
    // } catch (error) {
    //   if (error?.status && error?.status != 500)
    //     ResponseHelper.error(error.message, error.status);
    //   ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }

  async binhLuan(
    createBinhluanDto: CreateBinhluanDto,
    nguoiDungId: string,
  ): Promise<ApiResponse<NguoiDung | string>> {
    // try {
    //   const hinh = await this.prismaService.hinh_anh.findUnique({
    //     where: {
    //       hinh_id: createBinhluanDto.hinhId,
    //     },
    //   });

    //   if (!hinh) {
    //     ResponseHelper.error("Không tồn tại hình")
    //   }

    //   let binhLuan = {
    //     ngay_NguoiDung: new Date(),
    //     noi_dung: createBinhluanDto.noiDung,
    //     NguoiDung_id: parseFloat(nguoiDungId),
    //     hinh_id: createBinhluanDto.hinhId,
    //   }
    //   const newBinhLuan = await this.prismaService.NguoiDung.create({ data: binhLuan });
    //   return ResponseHelper.success(newBinhLuan)
    // } catch (error) {
    //   if (error?.status && error?.status != 500)
    //     ResponseHelper.error(error.message, error.status);
    //   ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }
}
