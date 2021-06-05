import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, CardContent, CircularProgress, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useAuth } from '../auth-provider';
import { useFormCardStyles } from '../theme';

const Dashboard: FunctionComponent = () => {
  const { logout } = useAuth();
  const [dashboardErrorMessage, setDashboardErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useFormCardStyles();
  const history = useHistory();

  const onLogout = async () => {
    try {
      setDashboardErrorMessage('');
      setLoading(true);

      await logout();

      history.push('/login');
    } catch (error) {
      setDashboardErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography component='h1' variant='h5'>
            Dashboard
          </Typography>
          <Button
            color='primary'
            size='large'
            fullWidth
            variant='contained'
            type='submit'
            className={classes.submit}
            disabled={loading}
            onClick={onLogout}
          >
            {loading ? <CircularProgress size={26} /> : 'Log Out'}
          </Button>
          {dashboardErrorMessage && (
            <Alert className={classes.error} severity='error'>
              {dashboardErrorMessage}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
