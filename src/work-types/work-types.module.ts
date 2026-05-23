import { Module } from '@nestjs/common';
import { WorkTypesService } from './work-types.service';
import { WorkTypesController } from './work-types.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [WorkTypesService, PrismaService],
  controllers: [WorkTypesController],
  exports: [WorkTypesService],
})
export class WorkTypesModule {}
