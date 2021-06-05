import React, { ReactNode, useContext, useState, useEffect, FunctionComponent } from 'react';
import { Card, CardContent, CircularProgress, Container } from '@material-ui/core';

import { auth, facebookAuthProvider, googleAuthProvider, appleAuthProvider } from './firebase';
import { useFormCardStyles } from './theme';

const signup = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);
const login = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);
const signinWithGoogle = (popup = false) =>
  popup ? auth.signInWithPopup(googleAuthProvider) : auth.signInWithRedirect(googleAuthProvider);
const signinWithFacebook = (popup = false) =>
  popup ? auth.signInWithPopup(facebookAuthProvider) : auth.signInWithRedirect(facebookAuthProvider);
const signinWithApple = (popup = false) =>
  popup ? auth.signInWithPopup(appleAuthProvider) : auth.signInWithRedirect(appleAuthProvider);
const logout = () => auth.signOut();
const resetPassword = (email: string) => auth.sendPasswordResetEmail(email);

type AuthContextValue = {
  currentUser: firebase.default.User | null;
  signup: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>;
  login: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>;
  signinWithGoogle: (popup?: boolean) => Promise<firebase.default.auth.UserCredential | void>;
  signinWithFacebook: (popup?: boolean) => Promise<firebase.default.auth.UserCredential | void>;
  signinWithApple: (popup?: boolean) => Promise<firebase.default.auth.UserCredential | void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue>({
  currentUser: null,
  signup,
  login,
  signinWithGoogle,
  signinWithFacebook,
  signinWithApple,
  logout,
  resetPassword,
  updateEmail: () => Promise.resolve<void>(undefined),
  updatePassword: () => Promise.resolve<void>(undefined),
});

const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.default.User | null>(null);
  const [loading, setLoading] = useState(true);
  const classes = useFormCardStyles();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    currentUser,
    signup,
    login,
    signinWithGoogle,
    signinWithFacebook,
    signinWithApple,
    logout,
    resetPassword,
    updateEmail: email => currentUser!.updateEmail(email),
    updatePassword: password => currentUser!.updatePassword(password),
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Container maxWidth='xs'>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <CircularProgress className={classes.submit} size={64} />{' '}
            </CardContent>
          </Card>
        </Container>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
