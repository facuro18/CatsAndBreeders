import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
export class UpdateBreedDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  public name?: string;
}
