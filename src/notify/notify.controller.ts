import { Controller, Post, Body } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { Headers } from '@nestjs/common';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  create(@Body() createNotifyDto: CreateNotifyDto, @Headers() headers) {
    const requestKey = headers['x-notification-request-key'];

    if (!requestKey || requestKey !== process.env.NOTIFICATION_REQUEST_KEY) {
      return 'invalid request key.';
    }
    return this.notifyService.create(createNotifyDto);
  }
}
