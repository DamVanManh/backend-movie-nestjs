import { LichChieu } from '@prisma/client';
export interface DatveDto {
  maLichChieu: number;
  danhSachMaGhe: number[];
}

export type TaoLichChieuReqDto = Omit<LichChieu, 'maLichChieu'>;
