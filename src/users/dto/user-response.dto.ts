import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ivanov@example.com' })
  email: string;

  @ApiProperty({ example: 'Иван Иванов', required: false })
  name?: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: string;
}
