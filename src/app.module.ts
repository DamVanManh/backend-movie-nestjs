import { Module } from '@nestjs/common';
import { NguoiDungModule } from './modules/nguoidung/nguoidung.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './stratery/jwt.strategy';
import { PhimModule } from './modules/phim/phim.module';
import { DatveModule } from './modules/datve/datve.module';
// , HinhanhModule, BinhluanModule, LuuanhModule , NguoidungModule, AuthModule,
@Module({
  imports: [
    NguoiDungModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PhimModule,
    DatveModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
