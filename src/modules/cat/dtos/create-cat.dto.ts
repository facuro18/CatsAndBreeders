import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  public name: string;
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public age: number;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  public breedId: number;
}
