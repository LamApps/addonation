import Firebase from '../config/firebase';
const auth = Firebase.auth();
const database = Firebase.database();
import firebase from 'firebase';

export type AuthData = {
    token: string;
    email: string;
    name: string;
  };
  const signIn = (email: string, password: string): Promise<AuthData> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
      .then((userCredential: { user: any; }) => {
        // Signed in
        var user = userCredential.user;
        // var token = await user.getIdToken();
        resolve({
          token: user.uid,
          email: user.email,
          name: user.displayName
        })
        // ...
      })
      .catch((error: { code: any; message: any; }) => {
        reject(error)
      });
    });
  };

  const signInWithCredential = (credential:string): Promise<AuthData> => {
    return new Promise((resolve, reject) => {
      auth.signInWithCredential(credential)
      .then((userCredential: { user: any; }) => {
        // Signed in
        var user = userCredential.user;
        database.ref('users').orderByChild('email').equalTo(user.email).once('value', snap => {
          const data = snap.val()
          console.log(data)
          if(!data){
            database.ref('seconds/'+user.uid).set({total: 0, logs: {}, monthly: {}});
            database.ref('users').push({ id: user.uid, email: user.email, password: 'password', name: user.displayName, type: 'google', timestamp: firebase.database.ServerValue.TIMESTAMP})
          }
        })
        // var token = await user.getIdToken();
        resolve({
          token: user.uid,
          email: user.email,
          name: user.displayName
        })
        // ...
      })
      .catch((error: { code: any; message: any; }) => {
        reject(error)
      });
    });
  };
  const signUp = (email: string, password: string, name: string): Promise<void> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential: { user: any; }) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
          displayName: name
        })
        database.ref('seconds/'+user.uid).set({total: 0, logs: {}, monthly: {}});
        database.ref('users').push({ id: user.uid, email: email, password: password, name: name, type: 'email', timestamp: firebase.database.ServerValue.TIMESTAMP});
        // var token = await user.getIdToken();
        resolve()
        // ...
      })
      .catch((error: { code: any; message: any; }) => {
        reject(error)
      });
    })
  };
  const signOut = (): Promise<void> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below
    return new Promise((resolve, reject) => {
      auth.signOut()
      .then(() => {
        resolve()
        // ...
      })
      .catch((error: { code: any; message: any; }) => {
        reject(error)
      });
    });
  };
  
  export const authService = {
    signIn,
    signInWithCredential,
    signUp,
    signOut,
  };