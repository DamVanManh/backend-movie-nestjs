import { nguoi_dung } from '@prisma/client';
type NguoiDungInfo = Omit<nguoi_dung, 'mat_khau'>;

export interface InfoHinhAnhVaNguoiTaoAnh {
  nguoi_dung: NguoiDungInfo;
}
