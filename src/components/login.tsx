import React, { FunctionComponent, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Container,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Button,
  Grid,
  Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useAuth } from '../auth-provider';
import { useFormCardStyles } from '../theme';
import { EMAIL_PATTERN } from '../constants';
import SigninWith from './signin-with';

const Login: FunctionComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useFormCardStyles();
  const history = useHistory();

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async ({ email, password }) => {
    try {
      setErrorMessage('');
      setLoading(true);

      await login(email, password);

      history.push('/');
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography component='h1' variant='h5'>
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              autoFocus
              error={!!errors.email}
              helperText={(errors.email && errors.email.message) || ' '}
              {...register('email', {
                required: { value: true, message: 'Please enter your email address.' },
                pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address.' },
              })}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Password'
              type='password'
              id='password'
              autoComplete='password'
              error={!!errors.password}
              helperText={(errors.password && errors.password.message) || ' '}
              {...register('password', {
                required: { value: true, message: 'Please enter your password.' },
              })}
            />
            <Button
              color='primary'
              size='large'
              fullWidth
              variant='contained'
              type='submit'
              className={classes.submit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={26} /> : 'Log In'}
            </Button>
            {errorMessage && (
              <Alert className={classes.error} severity='error'>
                {errorMessage}
              </Alert>
            )}
          </form>
          <SigninWith />
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to='/forgot-password'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              Don't have an account?{' '}
              <Link component={RouterLink} to='/signup'>
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
