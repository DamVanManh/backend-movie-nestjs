import { Phim } from '@prisma/client';

export interface ThemPhimUploadHinhReqDto
  extends Partial<
    Omit<
      Phim,
      'hinhAnh' | 'danhGia' | 'maPhim' | 'hot' | 'dangChieu' | 'sapChieu'
    >
  > {
  danhGia: string;
  hot: string;
  dangChieu: string;
  sapChieu: string;
}
