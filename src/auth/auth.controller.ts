import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (user) {
      return this.authService.login(user);
    }
    throw new UnauthorizedException();
  }

  @Public()
  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }
}
