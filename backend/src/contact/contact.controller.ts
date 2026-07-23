import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Request } from 'express';

export class ContactFormDto {
  @ApiProperty({ example: 'Ahmed' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ahmed@email.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+213555123456' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Commande spéciale' })
  @IsString()
  subject: string;

  @ApiProperty({ example: 'Je voudrais un bouquet pour un anniversaire.' })
  @IsString()
  message: string;
}

@ApiTags('contact')
@Controller('api/v1/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact submissions (admin)' })
  findAll() {
    const data = this.contactService.findAll();
    return { data, error: null };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit contact form' })
  create(@Body() dto: ContactFormDto, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    const data = this.contactService.create(dto, ip);
    return {
      data: { id: data.id, message: 'Votre message a été envoyé avec succès.' },
      error: null,
    };
  }
}
