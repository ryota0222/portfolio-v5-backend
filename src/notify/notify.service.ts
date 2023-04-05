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
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          defaultVibrateTimings: true,
          notificationCount: 1,
          icon: 'https://portfolio.ryotanny.com/favicons/android-chrome-96x96.png',
        },
      },
      webpush: {
        fcmOptions: {
          link: `https://portfolio.ryotanny.com`,
        },
        notification: {
          silent: false,
          badge: '1',
          vibrate: [400, 100, 400],
          sound: 'default',
        },
      },
    });

    return { notified: true };
  }
}
