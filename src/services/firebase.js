import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { config } from './firebaseConfig';

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
