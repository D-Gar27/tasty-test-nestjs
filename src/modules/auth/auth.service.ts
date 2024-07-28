import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LogingUserDto } from '../users/users.dto';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(data.password);
    const userData = {
      ...data,
      password: hashedPassword,
      is_banned: false,
      is_admin: false,
    };
    const { name, email, id } = await this.prisma.user.create({
      data: userData,
    });
    return { name, email, id };
  }

  async login(user: LogingUserDto, isForAdmin: boolean) {
    const { email, id, is_admin, name } = await this.validateUser(
      user.email,
      user.password,
    );
    if (isForAdmin && !is_admin)
      throw new UnauthorizedException('Unauthorized');
    if (!isForAdmin && is_admin)
      throw new UnauthorizedException('Unauthorized');
    const payload = {
      email: email,
      sub: id,
      is_admin: is_admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email,
        id,
        name,
      },
    };
  }
  async makeAdmin(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id },
      data: { is_admin: true },
    });
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.is_banned) throw new BadRequestException('User has been banned');
      return user;
    }
    throw new BadRequestException('Invalid credentials');
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
