import app from "./firebaseConfig";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const database = getDatabase(app);

let signUpUser = (obj) => {
  let { email, password, firstname, lastname } = obj;
  console.log(firstname);
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        const user = success.user;
        const reference = ref(database, `users/${user.uid}`);
        delete obj.password;
        set(reference, obj)
          .then(() => {
            resolve("data is successfully submited in realtime Database");
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

let logInUser = (obj) => {
  let { email, password } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        // Signed in
        const { user } = data;
        // ...
        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (e) => {
          const status = e.exists();
          if (status) {
            resolve({ ...e.val(), uid: user.uid });
          } else {
            reject("data not found");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
};

export { signUpUser, logInUser };
