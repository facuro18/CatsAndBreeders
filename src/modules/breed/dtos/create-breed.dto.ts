import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
export class CreateBreedDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  public name: string;
}
