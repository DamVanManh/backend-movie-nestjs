import {
  NguoiDung,
  LoaiNguoiDung,
  LichChieu,
  Phim,
  DatVe,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  taiKhoan: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  matKhau: string;
  @ApiProperty()
  hoTen: string;
  @ApiProperty()
  soDt: string;
}

export interface LayDanhSachNguoiDungPhanTrangResDto {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: NguoiDung[];
}
export interface LoginResDto {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
  accessToken: string;
}
export class LoginDto {
  @ApiProperty()
  taiKhoan: string;
  @ApiProperty()
  matKhau: string;
}
export enum MaLoaiNguoiDung {
  KhachHang = 'KhachHang',
  QuanTri = 'QuanTri',
}

export interface LayThongTinNguoiDungResDto {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
  loaiNguoiDung: LoaiNguoiDung;
  danhSachVeDaMuas: DanhSachVeDaMua[];
}
interface DanhSachVeDaMua extends DatVe {
  LichChieu: LichChieuWithPhim;
}
interface LichChieuWithPhim extends LichChieu {
  Phim: Phim;
}
