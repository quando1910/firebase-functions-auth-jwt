import * as functions from 'firebase-functions';
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';

const corsOptions = cors({
  origin: true
});

const SECRECT = 'jwt-sample';

/**
 * Simple login with passwordless method
 */
export const signInWithLink = functions.https.onRequest((request, response) => {
  return corsOptions(request, response, () => {
    const uid = request.query.uid;
    if (uid) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        uid: request.query.uid
      }, SECRECT);
      response.send({token});
    } else {
      response.status(400).send({msg: 'Bad Request'});
    }
  });
});
