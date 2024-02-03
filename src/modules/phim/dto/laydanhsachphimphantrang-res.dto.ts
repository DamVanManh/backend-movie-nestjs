import { Phim } from '@prisma/client';
export interface LayDanhSachPhimPhanTrangResDto {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: Phim[];
}
