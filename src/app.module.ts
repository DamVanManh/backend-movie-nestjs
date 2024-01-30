import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NguoidungModule } from './nguoidung/nguoidung.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './stratery/jwt.strategy';
import { HinhanhModule } from './hinhanh/hinhanh.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { LuuanhModule } from './luuanh/luuanh.module';
// , HinhanhModule, BinhluanModule, LuuanhModule , NguoidungModule, AuthModule,
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
