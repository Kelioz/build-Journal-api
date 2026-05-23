import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [JournalService, PrismaService],
  controllers: [JournalController],
  exports: [JournalService],
})
export class JournalModule {}
