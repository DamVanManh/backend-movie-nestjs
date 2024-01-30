import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BinhluanService } from './binhluan.service';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { nguoi_dung } from '@prisma/client';
import { CreateBinhluanDto } from './dto/create-binhluan.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('binhluan')
export class BinhluanController {
  constructor(private readonly binhluanService: BinhluanService) {}

  @HttpCode(200)
  @Get('id-anh/:id')
  async getByIdAnh(
    @Param('id') id: string,
  ): Promise<ApiResponse<nguoi_dung[] | string>> {
    return await this.binhluanService.getByIdAnh(id);
  }

  @HttpCode(201)
  @Post()
  async binhLuan(
    @Body() createBinhluanDto: CreateBinhluanDto,
    @Req() req: Request,
  ): Promise<ApiResponse<nguoi_dung | string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.binhluanService.binhLuan(createBinhluanDto, nguoiDungId);
  }
}
