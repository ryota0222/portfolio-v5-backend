import { Injectable } from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { getMessaging } from 'firebase-admin/messaging';

@Injectable()
export class NotifyService {
  async create(createNotifyDto: CreateNotifyDto) {
    if (createNotifyDto.type !== 'new') {
      return { notified: false };
    }
    await getMessaging().send({
      topic: 'news',
      notification: {
        title: 'お知らせ',
        body: createNotifyDto.contents?.new?.publishValue.title,
        imageUrl: createNotifyDto.contents?.new?.publishValue.thumbnail?.url,
      },
      webpush: {
        fcmOptions: {
          link: `https://portfolio.ryotanny.com`,
        },
      },
    });

    return { notified: true };
  }
}
