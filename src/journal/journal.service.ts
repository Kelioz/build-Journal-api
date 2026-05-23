import { Injectable } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateJournalDto) {
    return this.prisma.journalEntry.create({
      data: {
        date: new Date(dto.date),
        workTypeId: dto.workTypeId,
        volume: dto.volume,
        unit: dto.unit,
        performer: dto.performer,
        notes: dto.notes,
      },
    });
  }

  findAll(params: { from?: string; to?: string; sort?: 'asc' | 'desc' }) {
    const where: any = {};
    if (params.from || params.to) {
      where.date = {};
      if (params.from) where.date.gte = new Date(params.from);
      if (params.to) where.date.lte = new Date(params.to);
    }

    return this.prisma.journalEntry.findMany({
      where,
      orderBy: { date: params.sort === 'asc' ? 'asc' : 'desc' },
      include: { workType: true },
    });
  }

  findOne(id: number) {
    return this.prisma.journalEntry.findUnique({
      where: { id },
      include: { workType: true },
    });
  }

  update(id: number, dto: UpdateJournalDto) {
    const data: any = { ...dto };
    if (dto.date) data.date = new Date(dto.date);
    return this.prisma.journalEntry.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.journalEntry.delete({ where: { id } });
  }
}
