import * as admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  uid: string;
};

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

// example usage 
export default async function revenueCatApi(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const firebaseToken = req.headers?.authorization?.split(" ")[1];

  if (!firebaseToken) {
    res.status(404).end();
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

  res.status(200).json({ uid: decodedToken.uid });
}