import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { NotifyModule } from './notify/notify.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NewsModule, NotifyModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
