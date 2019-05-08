import { db } from './firebase';
 
export const onceGetAllBin = () => 
	db.ref(`bins`).once('value');