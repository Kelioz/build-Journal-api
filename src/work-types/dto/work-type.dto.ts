import { ApiProperty } from '@nestjs/swagger';

export class WorkTypeDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Кладка перегородок' })
  name: string;
}
