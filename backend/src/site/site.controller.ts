import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SiteService } from './site.service';

@ApiTags('site')
@Controller('api/v1/site')
export class SiteController {
  constructor(private siteService: SiteService) {}

  @Get('config')
  @ApiOperation({ summary: 'Get site configuration' })
  getConfig() {
    const data = this.siteService.getConfig();
    return { data, error: null };
  }

  @Put('config')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update site configuration' })
  updateConfig(@Body() body: Record<string, any>) {
    const data = this.siteService.updateConfig(body);
    return { data, error: null };
  }
}
