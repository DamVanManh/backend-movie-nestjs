import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoidung.service';
import { NguoiDungController } from './nguoidung.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
})
export class NguoiDungModule {}
