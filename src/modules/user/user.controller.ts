import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dtos';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { filterUser } from './filter/user.filter';
import { RoleGuardDecorator } from '@modules/auth/decorators';
import { errors, ValidRoles } from '@modules/shared/constants';
import { JwtGuard, RoleGuard } from '@modules/auth/guards';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @ApiResponse({ type: UserEntity, status: 201 })
  // create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
  //   return this.userService.create(createUserDto);
  // }
  @RoleGuardDecorator(ValidRoles.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Get('/')
  @ApiResponse({ type: UserEntity, status: 200, isArray: true })
  async findAll(): Promise<Partial<UserEntity>[]> {
    const users = await this.userService.findAll();
    // console.log(users);
    const usersMapped = users.map((user) => filterUser(user, { isIncludeMode: true, all: true }));
    // console.log(usersMapped);

    return usersMapped.filter((value) => Object.keys(value).length !== 0); //delete empty objs
  }

  @RoleGuardDecorator(ValidRoles.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiResponse({ type: UserEntity, status: 200 })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Partial<UserEntity>> {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException(errors.notFound);
    return filterUser(user, { include: ['name', 'id'], exclude: ['password'], isIncludeMode: false, all: false });
  }

  @RoleGuardDecorator(ValidRoles.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Patch(':id')
  @ApiResponse({ type: UserEntity, status: 200 })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<UserEntity>> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) throw new NotFoundException(errors.notFound);
    return filterUser(updatedUser, { isIncludeMode: true, all: true });
  }

  @RoleGuardDecorator(ValidRoles.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiResponse({ type: String, status: 200 })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const userDeleted = await this.userService.delete(id);
    if (!userDeleted) throw new NotFoundException(errors.notFound);
    return 'User deleted successfully';
  }
}
