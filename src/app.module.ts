import { Module } from '@nestjs/common';
import { NguoiDungModule } from './modules/nguoidung/nguoidung.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './stratery/jwt.strategy';
import { HinhanhModule } from './modules/hinhanh/hinhanh.module';
import { BinhluanModule } from './modules/binhluan/binhluan.module';
import { PhimModule } from './modules/phim/phim.module';
// , HinhanhModule, BinhluanModule, LuuanhModule , NguoidungModule, AuthModule,
@Module({
  imports: [
    NguoiDungModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PhimModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
