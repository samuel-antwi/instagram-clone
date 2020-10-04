import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from './services/firebase';
import defaultUserImage from './images/user.jpg';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from './graphql/mutation';
import { withRouter } from 'react-router-dom';

const provider = new auth.GoogleAuthProvider();

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ status: 'loading' });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          setAuthState({ status: 'in', user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = db.ref(`metadata/'${user.uid}/refreshTime`);

          metadataRef.on('value', async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: 'in', user, token });
          });
        }
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  // Sign Up with  email and password
  const signUpWithEmailAndPassword = async (formData) => {
    const data = await auth().createUserWithEmailAndPassword(
      formData.email,
      formData.password
    );
    if (data.additionalUserInfo.isNewUser) {
      const variables = {
        userId: data.user.uid,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        bio: '',
        website: '',
        phoneNumber: '',
        profileImage: defaultUserImage,
      };
      await createUser({ variables });
    }
  };

  // Login with email and password
  const logInWithEmailAndPassword = async (email, password) => {
    const data = await auth().signInWithEmailAndPassword(email, password);
    return data;
  };

  // Signing user in with google
  const logInWithGoogle = async () => {
    const data = await auth().signInWithPopup(provider);
    if (data.additionalUserInfo.isNewUser) {
      const { uid, displayName, email, photoURL } = data.user;
      const username = `${displayName.replace(/\s+/g, '')}${uid.slice(-5)}`;
      const variables = {
        userId: uid,
        name: displayName,
        username,
        email,
        bio: '',
        website: '',
        phoneNumber: '',
        profileImage: photoURL,
      };
      await createUser({ variables });
    }
  };

  // Sign out user
  const signOut = async () => {
    setAuthState({ status: 'loading' });
    await auth().signOut();
    setAuthState({ status: 'out' });
  };

  // Update user email
  const updateUserEmail = async (email) => {
    await authState.user.updateEmail(email);
  };

  if (authState.status === 'loading') {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          logInWithGoogle,
          signOut,
          signUpWithEmailAndPassword,
          logInWithEmailAndPassword,
          updateUserEmail,
        }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export default withRouter(AuthProvider);

// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import React, { useState, useEffect, createContext } from 'react';
// // import auth from './services/firebase'
// import { config } from './services/firebaseConfig';
// import defaultUserImage from './images/user.jpg';
// import { useMutation } from '@apollo/react-hooks';
// import { CREATE_USER } from './graphql/mutation';
// import { withRouter } from 'react-router-dom';

// const provider = new firebase.auth.GoogleAuthProvider();

// // Find these options in your Firebase console
// // firebase.initializeApp(config);

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({ status: 'loading' });
//   const [createUser] = useMutation(CREATE_USER);

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(async (user) => {
//       if (user) {
//         const token = await user.getIdToken();
//         const idTokenResult = await user.getIdTokenResult();
//         const hasuraClaim =
//           idTokenResult.claims['https://hasura.io/jwt/claims'];

//         if (hasuraClaim) {
//           setAuthState({ status: 'in', user, token });
//         } else {
//           // Check if refresh is required.
//           const metadataRef = firebase
//             .database()
//             .ref(`metadata/'${user.uid}/refreshTime`);

//           metadataRef.on('value', async (data) => {
//             if (!data.exists) return;
//             // Force refresh to pick up the latest custom claims changes.
//             const token = await user.getIdToken(true);
//             setAuthState({ status: 'in', user, token });
//           });
//         }
//       } else {
//         setAuthState({ status: 'out' });
//       }
//     });
//   }, []);

//   // Sign Up with  email and password
//   const signUpWithEmailAndPassword = async (formData) => {
//     const data = await firebase
//       .auth()
//       .createUserWithEmailAndPassword(formData.email, formData.password);
//     if (data.additionalUserInfo.isNewUser) {
//       const variables = {
//         userId: data.user.uid,
//         name: formData.name,
//         username: formData.username,
//         email: formData.email,
//         bio: '',
//         website: '',
//         phoneNumber: '',
//         profileImage: defaultUserImage,
//       };
//       await createUser({ variables });
//     }
//   };

//   // Login with email and password
//   const logInWithEmailAndPassword = async (email, password) => {
//     const data = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password);
//     return data;
//   };

//   // Signing user in with google
//   const logInWithGoogle = async () => {
//     const data = await firebase.auth().signInWithPopup(provider);
//     if (data.additionalUserInfo.isNewUser) {
//       const { uid, displayName, email, photoURL } = data.user;
//       const username = `${displayName.replace(/\s+/g, '')}${uid.slice(-5)}`;
//       const variables = {
//         userId: uid,
//         name: displayName,
//         username,
//         email,
//         bio: '',
//         website: '',
//         phoneNumber: '',
//         profileImage: photoURL,
//       };
//       await createUser({ variables });
//     }
//   };

//   // Sign out user
//   const signOut = async () => {
//     setAuthState({ status: 'loading' });
//     await firebase.auth().signOut();
//     setAuthState({ status: 'out' });
//   };

//   // Update user email
//   const updateUserEmail = async (email) => {
//     await authState.user.updateEmail(email);
//   };

//   if (authState.status === 'loading') {
//     return null;
//   } else {
//     return (
//       <AuthContext.Provider
//         value={{
//           authState,
//           logInWithGoogle,
//           signOut,
//           signUpWithEmailAndPassword,
//           logInWithEmailAndPassword,
//           updateUserEmail,
//         }}>
//         {children}
//       </AuthContext.Provider>
//     );
//   }
// };

// export default withRouter(AuthProvider);
