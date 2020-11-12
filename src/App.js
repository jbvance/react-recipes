import React, { lazy, Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import './App.css';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import AppShell from './AppShell';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FourOFour from './pages/FourOFour';
import RecipeSearch from './pages/RecipeSearch';
import Favorites from './pages/Favorites';
import Recipe from './pages/Recipe';
import NavBar from './components/Navbar';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Account = lazy(() => import('./pages/Account'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));
const Home1 = lazy(() => import('./pages/Home1'));

// required for redux devtools in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <Home1 />
    </Route>
    <Route exact path="/recipes">
      <RecipeSearch />
    </Route>
    <Route exact path="/recipes/:id">
      <Recipe />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AdminRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() && auth.isAdmin() ? (
          <AppShell>           
            {children}
          </AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <AuthenticatedRoute path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AdminRoute path="/inventory">
            <Inventory />
          </AdminRoute>
          <AuthenticatedRoute path="/account">
            <Account />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/settings">
            <Settings />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/users">
            <Users />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/favorites">
            <Favorites />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/favorites/:id">
            <Favorites />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <AuthProvider>
          <FetchProvider>
            <div className="bg-gray-100">
              <NavBar />
              <AppRoutes />
            </div>
          </FetchProvider>
        </AuthProvider>
      </Router>
    </ReduxProvider>
  );
}

export default App;
