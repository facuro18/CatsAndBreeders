import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  @ApiProperty()
  public name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  public age?: number;
}
