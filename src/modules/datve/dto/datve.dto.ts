import { LichChieu } from '@prisma/client';
export interface DatveDto {
  maLichChieu: number;
  danhSachMaGhe: number[];
}

export type TaoLichChieuReqDto = Omit<LichChieu, 'maLichChieu'>;

export interface LayDanhSachPhongVeResDto {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
}
interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayGioChieu: Date;
}
interface DanhSachGhe {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: string | null;
}
