import { NguoiDung } from '@prisma/client';
export interface LayDanhSachNguoiDungPhanTrangResDto {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: NguoiDung[];
}
