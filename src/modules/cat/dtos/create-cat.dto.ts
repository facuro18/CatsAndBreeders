import { IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(1)
  public name: string;
  @IsInt()
  @IsPositive()
  public age: number;
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  public breed: string;
}
