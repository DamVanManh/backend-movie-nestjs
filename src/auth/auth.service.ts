import { Response } from 'express';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-nguoidung.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { nguoi_dung } from '@prisma/client';
import { LoginResDto } from './dto/login-nguoidung-res.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(body: LoginDto): Promise<ApiResponse<LoginResDto | null>> {
    try {
      const { taiKhoan, matKhau } = body;
      let checkUser = await this.prismaService.nguoi_dung.findFirst({
        where: {
          tai_khoan: taiKhoan,
        },
      });

      if (checkUser) {
        if (matKhau === checkUser.mat_khau) {
          let token = await this.jwtService.signAsync(
            {
              tai_khoan: checkUser.tai_khoan,
              email: checkUser.email,
              loaiNguoiDung: checkUser.loai_nguoi_dung,
            },
            {
              expiresIn: this.configService.get('EXPIRE_TOKEN_TIME'),
              secret: this.configService.get('SECRET_TOKEN'),
            },
          );
          const data: LoginResDto = {
            taiKhoan: checkUser.tai_khoan,
            hoTen: checkUser.ho_ten,
            email: checkUser.email,
            soDT: checkUser.so_dt,
            maLoaiNguoiDung: checkUser.loai_nguoi_dung,
            accessToken: token,
          };

          return ResponseHelper.success(data, 'Login thành công');
        } else {
          ResponseHelper.error('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED);
        }
      } else {
        ResponseHelper.error('Tài khoản không đúng', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async signUp(body: SignUpDto): Promise<ApiResponse<nguoi_dung | null>> {
    try {
      const { taiKhoan, email, matKhau, hoTen, soDt } = body;

      let checkEmailUser = await this.prismaService.nguoi_dung.findFirst({
        where: {
          email: email,
        },
      });
      let checkAccUser = await this.prismaService.nguoi_dung.findFirst({
        where: {
          tai_khoan: taiKhoan,
        },
      });

      if (checkEmailUser) {
        ResponseHelper.error('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      }

      if (checkAccUser) {
        ResponseHelper.error('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
      }

      let newNguoiDung = {
        tai_khoan: taiKhoan,
        email,
        mat_khau: matKhau,
        ho_ten: hoTen,
        so_dt: soDt,
        loai_nguoi_dung: 'KhachHang',
      };

      const nguoiDung = await this.prismaService.nguoi_dung.create({
        data: newNguoiDung,
      });
      return ResponseHelper.success(nguoiDung, 'Đăng ký thành công');
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }
}
