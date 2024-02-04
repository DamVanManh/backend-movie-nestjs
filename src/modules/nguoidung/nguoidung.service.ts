import { Response } from 'express';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-nguoidung.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { LoaiNguoiDung, NguoiDung } from '@prisma/client';
import { LoginResDto } from './dto/login-nguoidung-res.dto';
import { LayDanhSachNguoiDungPhanTrangResDto } from './dto/laydanhsachnguoidungphantrang-res.dto';
import { MaLoaiNguoiDung } from './dto/maloainguoidung.dto';

@Injectable()
export class NguoiDungService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(body: LoginDto): Promise<ApiResponse<LoginResDto | null>> {
    try {
      const { taiKhoan, matKhau } = body;
      let checkUser = await this.prismaService.nguoiDung.findFirst({
        where: {
          taiKhoan: taiKhoan,
        },
      });

      if (checkUser) {
        if (matKhau === checkUser.matKhau) {
          let token = await this.jwtService.signAsync(
            {
              taiKhoan: checkUser.taiKhoan,
              email: checkUser.email,
              maLoaiNguoiDung: checkUser.maLoaiNguoiDung,
            },
            {
              expiresIn: this.configService.get('EXPIRE_TOKEN_TIME'),
              secret: this.configService.get('SECRET_TOKEN'),
            },
          );
          const data: LoginResDto = {
            taiKhoan: checkUser.taiKhoan,
            hoTen: checkUser.hoTen,
            email: checkUser.email,
            soDT: checkUser.soDt,
            maLoaiNguoiDung: checkUser.maLoaiNguoiDung,
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

  async signUp(body: SignUpDto): Promise<ApiResponse<NguoiDung | null>> {
    try {
      const { taiKhoan, email, matKhau, hoTen, soDt } = body;

      let checkEmailUser = await this.prismaService.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });
      let checkAccUser = await this.prismaService.nguoiDung.findFirst({
        where: {
          taiKhoan: taiKhoan,
        },
      });

      if (checkEmailUser) {
        ResponseHelper.error('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      }

      if (checkAccUser) {
        ResponseHelper.error('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
      }

      let newNguoiDung = {
        taiKhoan,
        email,
        matKhau,
        hoTen,
        soDt,
        maLoaiNguoiDung: 'KhachHang',
      };

      const nguoiDung = await this.prismaService.nguoiDung.create({
        data: newNguoiDung,
      });
      return ResponseHelper.success(nguoiDung, 'Đăng ký thành công');
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async layDanhSachLoaiNguoiDung(): Promise<
    ApiResponse<LoaiNguoiDung[] | null>
  > {
    try {
      let data = await this.prismaService.loaiNguoiDung.findMany();
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async layDanhSachNguoiDung(): Promise<ApiResponse<NguoiDung[] | null>> {
    try {
      let data = await this.prismaService.nguoiDung.findMany();
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async layDanhSachNguoiDungPhanTrang(
    tuKhoa: string,
    soTrang: number,
    soPhanTuTrenTrang: number,
  ): Promise<ApiResponse<LayDanhSachNguoiDungPhanTrangResDto | null>> {
    try {
      let index = (soTrang - 1) * soPhanTuTrenTrang;

      let dataCount = await this.prismaService.nguoiDung.count({
        where: {
          hoTen: {
            contains: tuKhoa,
          },
        },
      });
      let totalPage = Math.ceil(dataCount / soPhanTuTrenTrang);

      // người dùng filter theo page
      let nguoiDungs = await this.prismaService.nguoiDung.findMany({
        skip: index,
        take: soPhanTuTrenTrang,
        where: {
          hoTen: {
            contains: tuKhoa,
          },
        },
      });

      let data = {
        currentPage: soTrang,
        count: soPhanTuTrenTrang,
        totalPages: totalPage,
        totalCount: dataCount,
        items: nguoiDungs,
      };
      return ResponseHelper.success(data);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async timKiemNguoiDung(
    tuKhoa: string,
  ): Promise<ApiResponse<NguoiDung[] | null>> {
    try {
      let nguoiDungs = await this.prismaService.nguoiDung.findMany({
        where: {
          hoTen: {
            contains: tuKhoa,
          },
        },
      });
      return ResponseHelper.success(nguoiDungs);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async themNguoiDung(
    body: NguoiDung,
    maLoaiNguoiDungToken: string,
  ): Promise<ApiResponse<NguoiDung | null>> {
    try {
      if (maLoaiNguoiDungToken !== MaLoaiNguoiDung.QuanTri) {
        ResponseHelper.error('Không có quyền truy cập!', HttpStatus.FORBIDDEN);
      }
      const { taiKhoan, email, matKhau, soDt, maLoaiNguoiDung, hoTen } = body;
      let check = await this.prismaService.nguoiDung.findFirst({
        where: {
          OR: [{ taiKhoan }, { email }],
        },
      });

      if (check) {
        if (check.email === email && check.taiKhoan === taiKhoan) {
          ResponseHelper.error(
            'Email và tài khoản đã tồn tại',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (check.email === email) {
          ResponseHelper.error('Email đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        if (check.taiKhoan === taiKhoan) {
          ResponseHelper.error('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
        }
      } else {
        if (!taiKhoan || !email || !matKhau) {
          ResponseHelper.error('Dữ liệu không hợp lệ!', HttpStatus.BAD_REQUEST);
        }

        let newNguoiDung = {
          taiKhoan,
          matKhau,
          email,
          soDt: soDt ?? null,
          maLoaiNguoiDung: maLoaiNguoiDung ?? null,
          hoTen: hoTen ?? null,
        };

        const savedNguoiDung = await this.prismaService.nguoiDung.create({
          data: newNguoiDung,
        });
        return ResponseHelper.success(savedNguoiDung);
      }
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async capNhatThongTinNguoiDung(
    body: NguoiDung,
    maLoaiNguoiDungToken: string,
  ): Promise<ApiResponse<NguoiDung | null>> {
    try {
      const { taiKhoan, email, maLoaiNguoiDung } = body;

      let check = await this.prismaService.nguoiDung.findFirst({
        where: {
          taiKhoan: taiKhoan,
        },
      });

      if (!check) {
        ResponseHelper.error('Tài khoản không tồn tại', HttpStatus.BAD_REQUEST);
      }

      // accout là Khách Hàng thì không được phép đổi maLoaiNguoiDung
      if (
        maLoaiNguoiDung &&
        maLoaiNguoiDung !== check.maLoaiNguoiDung &&
        maLoaiNguoiDungToken !== MaLoaiNguoiDung.QuanTri
      ) {
        ResponseHelper.error('Không có quyền truy cập!', HttpStatus.FORBIDDEN);
      }

      // check email có tồn tại chưa nếu user change mail
      if (email && email !== check.email) {
        let checkEmail = await this.prismaService.nguoiDung.findFirst({
          where: {
            email: email,
          },
        });
        if (checkEmail) {
          ResponseHelper.error('Email đã tồn tại', HttpStatus.BAD_REQUEST);
        }
      }

      const updatedNguoiDung = await this.prismaService.nguoiDung.update({
        where: { taiKhoan },
        data: {
          ...body,
        },
      });
      return ResponseHelper.success(updatedNguoiDung);
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async xoaNguoiDung(
    taiKhoan: string,
    maLoaiNguoiDungToken: string,
  ): Promise<ApiResponse<string | null>> {
    try {
      if (maLoaiNguoiDungToken !== MaLoaiNguoiDung.QuanTri) {
        ResponseHelper.error('Không có quyền truy cập!', HttpStatus.FORBIDDEN);
      }

      let check = await this.prismaService.nguoiDung.findFirst({
        where: {
          taiKhoan: taiKhoan,
        },
      });

      if (!check) {
        ResponseHelper.error('Tài khoản không tồn tại', HttpStatus.BAD_REQUEST);
      }

      let nguoiDung = await this.prismaService.nguoiDung.delete({
        where: {
          taiKhoan,
        },
      });

      return ResponseHelper.success('Xóa thành công!');
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }
}
