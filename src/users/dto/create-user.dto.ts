import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'ivanov@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Иван Иванов', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
