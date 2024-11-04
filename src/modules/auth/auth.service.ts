import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { errors } from '@modules/shared/constants/errors.config';
import { CreateUserDto } from '@modules/user/dtos';
import { BcryptAdapter } from '@core/index';
import { ValidRoles } from '@modules/shared/constants/roles';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async getTokens(validUser) {
    const access_token = this.jwtService.sign(validUser, {
      expiresIn: '15m',
      secret: 'access_token_secret',
    });
    const refresh_token = this.jwtService.sign(validUser, {
      expiresIn: '30d',
      secret: 'refresh_token_secret',
    });
    return { access_token, refresh_token };
  }

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const user = await this.userService.findByEmail(email);

    //Email already registered
    if (user) throw new UnauthorizedException(errors.unauthorizedReq);

    const hashedPassword = await BcryptAdapter.hash(createUserDto.password);

    const userResponse = await this.userService.create(
      {
        ...createUserDto,
        password: hashedPassword,
      },
      [ValidRoles.USER],
    );
    return userResponse;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException(errors.validationFailed);

    const isMatching = BcryptAdapter.compare(password, user.password);

    if (!isMatching) throw new BadRequestException(errors.validationFailed);

    const payload: JwtPayload = {
      userId: user.id,
      email: email,
      roles: user.roles,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
