import { db } from './firebase';

export const doCreateUser = (uid, username, email, date) =>
  db.ref(`users/${uid}`).set({
    uid,
    username,
    email,
    point: 0,
    addedBinCount: 0,
    votedBinCount: 0,
    date,
  });

export const onceGetAllBin = () =>
	db.ref(`bins`).once('value');
