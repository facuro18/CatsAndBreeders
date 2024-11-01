import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BreedDto } from '@modules/breed/dtos';

export class CatDto {
  @IsInt()
  @ApiProperty()
  public id?: number;
  @IsString()
  @MinLength(1)
  @ApiProperty()
  public name: string;
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public age: number;

  @ApiProperty()
  public breed?: BreedDto;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  public breedId: number;

  constructor(init: Partial<CatDto>) {
    Object.assign(this, init);
  }
}
