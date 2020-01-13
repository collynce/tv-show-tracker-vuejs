import {firebaseApp} from './firebase'
import 'firebase/firestore'

export const db = firebaseApp.firestore();
// db.settings({timestampsInSnapshots: true});
