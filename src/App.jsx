import React from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';

import SignInPage from 'pages/SignIn/SignIn';
import SignUpPage from 'pages/SignUp/SignUp';

import Loader from 'components/Loader/Loader';

import { StyledNavLink } from 'App.styled';
import ContactsPage from 'pages/Contacts/Contacts';


const styles = {
  color: '#010101',
  paddingTop: '80px',
};

export const App = () => {
  return (
    <div style={styles}>
      <header>
        <nav>
          <StyledNavLink to="/">Contacts</StyledNavLink>
          <StyledNavLink to="/sign-in">Sign In</StyledNavLink>
          <StyledNavLink to="/sign-up">Sign Up</StyledNavLink>
        </nav>
      </header>

      <main>
          <Routes>
            <Route path="/" element={<ContactsPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            
            <Route
              path="*"
              element={
                <Navigate to="/" />
              }
            />
          </Routes>
      </main>
    </div>
  );
};
