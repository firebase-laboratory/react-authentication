import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, SvgIcon, IconButton, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useAuth } from '../auth-provider';
import { useFormCardStyles } from '../theme';

type IconProps = JSX.IntrinsicAttributes & {
  color?: 'inherit' | 'disabled' | 'error' | 'action' | 'primary' | 'secondary';
  fontSize?: 'inherit' | 'default' | 'large' | 'small';
};

const FacebookIcon = (props: IconProps) => (
  <SvgIcon {...props} viewBox='0 0 840 859'>
    <path d='M67 14C37 20 11 46 5 76c-2 9-2 20-2 354 0 333 0 344 2 353 6 30 32 56 62 62 9 2 17 2 189 2h179V493H316V355h119v-63l2-74c13-84 66-135 150-145 20-2 100 0 127 4h5v123h-39l-48 1c-26 3-43 13-49 30-5 13-5 15-6 71v53h68l68 1a2743 2743 0 01-17 134v3h-59l-60 1v353h94c88 0 94 0 103-2 29-6 54-29 62-59l2-353c0-340 0-347-2-357-6-31-32-56-62-62-9-2-21-2-354-2-329 0-345 0-353 2z' />
  </SvgIcon>
);

const GoogleIcon = (props: IconProps) => (
  <SvgIcon {...props} viewBox='0 0 512 512'>
    <path d='M458 217c2 14 4 28 4 44 0 120-81 205-202 205a210 210 0 11141-365l-60 59c-22-21-50-32-81-32-69 0-125 59-125 128s56 128 125 128c63 0 106-36 115-85H260v-82h198z' />
  </SvgIcon>
);

const AppleIcon = (props: IconProps) => (
  <SvgIcon {...props} viewBox='0 0 842 1000'>
    <path d='M702 960c-54 53-114 44-171 20-61-26-116-27-180 0-80 34-122 24-170-20-271-279-231-704 77-720 75 4 127 41 171 44 65-13 128-51 198-46 84 7 147 40 189 100a220 220 0 0027 396c-32 83-73 166-141 227zM423 237C415 113 515 11 631 1c16 143-130 250-208 236z' />
  </SvgIcon>
);

const SigninWith: FunctionComponent = () => {
  const { signinWithGoogle, signinWithFacebook, signinWithApple } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useFormCardStyles();
  const history = useHistory();

  const onSubmit = async (signinMethod: (popup?: boolean) => Promise<void | firebase.default.auth.UserCredential>) => {
    try {
      setErrorMessage('');

      await signinMethod();

      history.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Typography>Or sign in with:</Typography>
      <Grid container justify='center'>
        <Grid item>
          <IconButton aria-label='google' onClick={() => onSubmit(signinWithGoogle)}>
            <GoogleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label='facebook' onClick={() => onSubmit(signinWithFacebook)}>
            <FacebookIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label='apple' onClick={() => onSubmit(signinWithApple)}>
            <AppleIcon />
          </IconButton>
        </Grid>
      </Grid>
      {errorMessage && (
        <Alert className={classes.error} severity='error'>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default SigninWith;
