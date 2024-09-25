import {
  Inject,
  Controller,
  Post,
  Get,
  Query,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailService } from '../email/email.service';
import { RedisService } from '../redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`,
    });
    return '发送成功';
  }

  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, false);
    vo.accessToken = this.userService.signAccessToken(vo.userInfo);
    vo.refreshToken = this.userService.signRefreshToken(vo.userInfo);
    return vo;
  }

  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, true);
    vo.accessToken = this.userService.signAccessToken(vo.userInfo);
    vo.refreshToken = this.userService.signRefreshToken(vo.userInfo);
    return vo;
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('jwt_secret')
      });
      const user = await this.userService.findUserById(data.userId, false);
      const access_token = this.userService.signAccessToken(user);
      const refresh_token = this.userService.signRefreshToken(user);
      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @Get('admin/refresh')
  async adminRefresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('jwt_secret')
      });
      const user = await this.userService.findUserById(data.userId, true);
      const access_token = this.userService.signAccessToken(user);
      const refresh_token = this.userService.signRefreshToken(user);
      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }
}
