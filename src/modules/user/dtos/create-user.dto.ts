import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  name: string;
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have an uppercase, lowercase letter and a number',
  })
  @ApiProperty()
  password: string;
}
