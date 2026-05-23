import { Controller, Get } from '@nestjs/common';
import { WorkTypesService } from './work-types.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WorkTypeDto } from './dto/work-type.dto';

@ApiTags('work-types')
@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly svc: WorkTypesService) {}

  @Get()
  @ApiOperation({ summary: 'List available work types' })
  @ApiResponse({
    status: 200,
    type: [WorkTypeDto],
    description: 'Available work types',
  })
  findAll() {
    return this.svc.findAll();
  }
}
