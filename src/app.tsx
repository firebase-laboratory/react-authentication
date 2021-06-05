import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import AuthProvider from './auth-provider';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';
import Login from './components/login';
import ForgotPassword from './components/forgot-password';
import UpdateProfile from './components/update-profile';

import { useAuth } from './auth-provider';

interface UserRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute: FunctionComponent<UserRouteProps> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const routeProps: RouteProps = {
    render: props => (currentUser ? <Component {...props} /> : <Redirect to='/login' />),
    ...rest,
  };

  return <Route {...routeProps} />;
};

const GuestRoute: FunctionComponent<UserRouteProps> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const routeProps: RouteProps = {
    render: props => (!currentUser ? <Component {...props} /> : <Redirect to='/' />),
    ...rest,
  };

  return <Route {...routeProps} />;
};

const App: FunctionComponent = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <PrivateRoute path='/update-profile' component={UpdateProfile} />
        <GuestRoute path='/signup' component={SignUp} />
        <GuestRoute path='/login' component={Login} />
        <Route path='/forgot-password' component={ForgotPassword} />
      </Switch>
    </AuthProvider>
  </Router>
);

export default App;
