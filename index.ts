import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AppModule } from './src/app.module';
import { getMessaging } from 'firebase-admin/messaging';

const expressServer = express();

admin.initializeApp({
  credential: admin.credential.cert(
    functions.config().portfolio_firebase_config,
  ),
});

export const subscribeToNewArticle = functions.firestore
  .document('notification/{notificationId}')
  .onCreate(async (snapshot) => {
    await getMessaging().subscribeToTopic(snapshot.data().token, 'news');
  });

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
