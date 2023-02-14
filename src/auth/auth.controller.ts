import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Auth, GetRawHeaders, GetUser } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The token is valid.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. The token is invalid.',
  })
  @Get('check-token')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtected(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetRawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      user,
      email,
      rawHeaders,
      headers,
    };
  }

  @Get('protected2')
  @RoleProtected(ValidRoles.ADMIN, ValidRoles.SUPER)
  @UseGuards(AuthGuard(), UserRoleGuard)
  getProtected2(@GetUser() user: User) {
    return user;
  }

  @Get('protected3')
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER)
  getProtected3(@GetUser() user: User) {
    return user;
  }
}
