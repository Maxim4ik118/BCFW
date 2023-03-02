import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerRequest } from 'redux/userSlice/userSlice';
import { selectAuthError, selectIsLoggedIn } from 'redux/userSlice/selectors';

import { Alert, SignUpForm } from 'components';

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (!isLoggedIn) return;

    navigate('/contacts');
  }, [isLoggedIn, navigate]);

  const handleRegister = formData => {
    dispatch(registerRequest(formData));
  };

  return (
    <div>
      {error !== null && (
        <Alert>
          <p>Oops, some error occured... {error}</p>
        </Alert>
      )}
      <SignUpForm onSubmit={handleRegister} />
    </div>
  );
}

export default SignUpPage;
