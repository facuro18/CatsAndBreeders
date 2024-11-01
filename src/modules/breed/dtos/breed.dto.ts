import { IsArray, IsInt, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CatDto } from '@modules/cat/dtos';

export class BreedDto {
  @IsInt()
  @ApiProperty()
  public id?: number;
  @IsString()
  @MinLength(1)
  @ApiProperty()
  public name: string;

  @IsArray()
  @ApiProperty()
  public cats?: CatDto[];

  constructor(init: Partial<BreedDto>) {
    Object.assign(this, init);
  }
}
