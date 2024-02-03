import { Module } from '@nestjs/common';
import { DatveService } from './datve.service';
import { DatveController } from './datve.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DatveController],
  providers: [DatveService],
})
export class DatveModule {}
