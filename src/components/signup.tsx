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

const Signup: FunctionComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const { signup } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useFormCardStyles();
  const history = useHistory();

  const onSubmit: SubmitHandler<{ email: string; password: string; confirmPassword: string }> = async ({
    email,
    password,
  }) => {
    try {
      setErrorMessage('');
      setLoading(true);

      await signup(email, password);

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
            Sign Up
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
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Confirm Password'
              type='password'
              id='confirm_password'
              autoComplete='password'
              error={!!errors.confirmPassword}
              helperText={(errors.confirmPassword && errors.confirmPassword.message) || ' '}
              {...register('confirmPassword', {
                required: { value: true, message: 'Please confirm your password.' },
                validate: value => value === watch('password') || 'The passwords do not match.',
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
              {loading ? <CircularProgress size={26} /> : 'Sign Up'}
            </Button>
            {errorMessage && (
              <Alert className={classes.error} severity='error'>
                {errorMessage}
              </Alert>
            )}
          </form>
          <SigninWith />
          <Grid container justify='center'>
            <Grid item>
              Already have an account?{' '}
              <Link component={RouterLink} to='/login'>
                Log In
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
