import { DatveService } from './datve.service';

import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DatveDto } from './dto/datve.dto';

@Controller('QuanLyDatVe')
export class DatveController {
  constructor(private readonly datveService: DatveService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Post('DatVe')
  async datve(
    @Body() datveDto: DatveDto,
    @Req() req: Request,
  ): Promise<ApiResponse<string | null>> {
    const taiKhoan = req.user['taiKhoan'];
    return await this.datveService.datve(datveDto, taiKhoan);
  }
}
