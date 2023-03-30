import { Injectable } from '@nestjs/common';
import { client } from 'src/lib/microcms';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  async findAll() {
    const data = await client.getList<News>({
      endpoint: 'news',
      queries: {
        orders: '-publishedAt',
        fields: 'id,title,url,period,publishedAt',
      },
    });
    return data;
  }

  async findOne(id: string) {
    const data = await client.getListDetail<News>({
      endpoint: 'news',
      contentId: id,
      queries: {
        orders: '-publishedAt',
        fields: 'id,title,url,period,publishedAt',
      },
    });
    return data;
  }
}
