import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

@Injectable()
export class UsersService {
  private usersPath: string;

  constructor() {
    this.usersPath = path.resolve(
      process.env.CONTENT_PATH || '../content',
      'users.json',
    );
    this.ensureFile();
  }

  private ensureFile() {
    const dir = path.dirname(this.usersPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.usersPath)) {
      fs.writeFileSync(this.usersPath, JSON.stringify([]));
    }
  }

  private readUsers(): User[] {
    return JSON.parse(fs.readFileSync(this.usersPath, 'utf-8'));
  }

  private writeUsers(users: User[]) {
    fs.writeFileSync(this.usersPath, JSON.stringify(users, null, 2));
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = this.readUsers();
    return users.find((u) => u.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    const users = this.readUsers();
    return users.find((u) => u.id === id) || null;
  }

  async create(email: string, password: string, role: string = 'editor'): Promise<User> {
    const users = this.readUsers();
    if (users.find((u) => u.email === email)) {
      throw new ConflictException('Email already exists');
    }

    const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    const passwordHash = await bcrypt.hash(password, rounds);

    const user: User = {
      id: uuid(),
      email,
      passwordHash,
      role: role as any,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    this.writeUsers(users);
    return user;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}
