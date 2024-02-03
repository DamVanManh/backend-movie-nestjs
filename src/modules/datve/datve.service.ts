import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { PrismaService } from 'src/database/prisma.service';
import { DatveDto } from './dto/datve.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class DatveService {
  constructor(private prismaService: PrismaService) {}

  async datve(
    datveDto: DatveDto,
    taiKhoan: string,
  ): Promise<ApiResponse<string | null>> {
    try {
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
}
