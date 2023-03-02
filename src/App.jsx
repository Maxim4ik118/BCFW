import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import HomePage from 'pages/Home/Home';
// import SignInPage from 'pages/SignIn/SignIn';
// import SignUpPage from 'pages/SignUp/SignUp';
// import ContactsPage from 'pages/Contacts/Contacts';

import Loader from 'components/Loader/Loader';

import { selectIsLoggedIn, selectUserData } from 'redux/userSlice/selectors';

import { StyledNavLink } from 'App.styled';
import {
  getCurrentUserRequest,
  logOutRequest,
} from 'redux/userSlice/userSlice';

const HomePage = lazy(() => import('pages/Home/Home'));
const SignInPage = lazy(() => import('pages/SignIn/SignIn'));
const SignUpPage = lazy(() => import('pages/SignUp/SignUp'));
const ContactsPage = lazy(() => import('pages/Contacts/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userData = useSelector(selectUserData);

  const handleLogOut = () => {
    dispatch(logOutRequest());
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    dispatch(getCurrentUserRequest());
  }, [dispatch]);

  return (
    <div>
      <header>
        <nav>
          {isLoggedIn ? (
            <>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/contacts">Contacts</StyledNavLink>
              <span>Hello, {userData.name}</span>
              <button onClick={handleLogOut}>Logout</button>
            </>
          ) : (
            <>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/sign-in">Sign In</StyledNavLink>
              <StyledNavLink to="/sign-up">Sign Up</StyledNavLink>
            </>
          )}
        </nav>
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
