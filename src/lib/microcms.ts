import { createClient } from 'microcms-js-sdk'; //ES6
import * as functions from 'firebase-functions';

// Initialize Client SDK.
export const client = createClient(functions.config().microcms_firebase_config);
