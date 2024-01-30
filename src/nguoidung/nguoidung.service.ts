import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { NguoiDung } from '@prisma/client';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateNguoiDungDto } from './dto/update-nguoidung.dto';

@Injectable()
export class NguoidungService {
  constructor(private prisma: PrismaService) {}
  async getInfo(
    nguoiDungId: number,
  ): Promise<ApiResponse<NguoiDung | string | null>> {
    // try {
    //     let data = await this.prisma.NguoiDung.findUnique({
    //         where: {
    //             nguoi_dung_id: nguoiDungId
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

  async update(
    updateNguoiDungDto: UpdateNguoiDungDto,
    nguoiDungId: number,
  ): Promise<ApiResponse<NguoiDung | string | null>> {
    // try {
    //     let currentNguoiDung = await this.prisma.NguoiDung.findUnique({
    //         where: {
    //             nguoi_dung_id: nguoiDungId
    //         }
    //     });

    //     let nguoiDung = {
    //         ...updateNguoiDungDto,
    //         email: currentNguoiDung.email
    //     }
    //     let data = await this.prisma.NguoiDung.update({
    //         data: nguoiDung,
    //         where: {
    //             nguoi_dung_id: nguoiDungId
    //         }
    //     })
    //     return ResponseHelper.success(data)
    // } catch (error) {
    //     if (error?.status && error?.status != 500)
    //         ResponseHelper.error(error.message, error.status);
    //     ResponseHelper.internalError();
    // }

    return ResponseHelper.success('nguoiDung', 'Đăng ký thành công');
  }
}
