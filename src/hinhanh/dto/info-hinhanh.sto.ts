import { NguoiDung } from '@prisma/client';
type NguoiDungInfo = Omit<NguoiDung, 'mat_khau'>;

export interface InfoHinhAnhVaNguoiTaoAnh {
  NguoiDung: NguoiDungInfo;
}
