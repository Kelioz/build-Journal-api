import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JournalResponseDto } from './dto/journal-response.dto';

@ApiTags('journal')
@Controller('journal')
export class JournalController {
  constructor(private readonly svc: JournalService) {}

  @Post()
  @ApiOperation({ summary: 'Create journal entry' })
  @ApiBody({ type: CreateJournalDto })
  @ApiResponse({
    status: 201,
    description: 'Created journal entry',
    type: JournalResponseDto,
  })
  create(@Body() dto: CreateJournalDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({
    summary:
      'List journal entries; filter by from/to (ISO date), sort=asc|desc',
  })
  @ApiQuery({
    name: 'from',
    required: false,
    description: 'Start date (inclusive) in ISO format',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: 'End date (inclusive) in ISO format',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sort by date: asc or desc',
  })
  @ApiResponse({
    status: 200,
    description: 'List of entries',
    type: [JournalResponseDto],
  })
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('sort') sort?: 'asc' | 'desc',
  ) {
    return this.svc.findAll({ from, to, sort });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Journal entry',
    type: JournalResponseDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateJournalDto })
  @ApiResponse({
    status: 200,
    description: 'Updated entry',
    type: JournalResponseDto,
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJournalDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Deleted entry' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
