import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkTypesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.workType.findMany({ orderBy: { name: 'asc' } });
  }
}
