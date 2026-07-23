import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@candydaysdz.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword123' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'admin@candydaysdz.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword123' })
  @IsString()
  @MinLength(12)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
