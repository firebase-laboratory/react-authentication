import React, { FunctionComponent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Container,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Button,
  Snackbar,
  Grid,
  Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useAuth } from '../auth-provider';
import { useFormCardStyles } from '../theme';
import { EMAIL_PATTERN } from '../constants';

const ForgotPassword: FunctionComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { resetPassword } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useFormCardStyles();

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async ({ email, password }) => {
    try {
      setMessage('');
      setErrorMessage('');
      setLoading(true);

      await resetPassword(email);

      setMessage('Check your email inbox for further instructions');
      setLoading(false);
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
            Forgot Password
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
            <Button
              color='primary'
              size='large'
              fullWidth
              variant='contained'
              type='submit'
              className={classes.submit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={26} /> : 'Reset Password'}
            </Button>
            {errorMessage && (
              <Alert className={classes.error} severity='error'>
                {errorMessage}
              </Alert>
            )}
            {message && (
              <Snackbar open={true} onClose={() => setMessage('')}>
                <Alert onClose={() => setMessage('')} severity='success'>
                  {message}
                </Alert>
              </Snackbar>
            )}
          </form>
          <Grid container justify='center'>
            <Grid item>
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

export default ForgotPassword;
