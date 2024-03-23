import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { login } from '../../api/serverApi';

const useAuthData = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = useSignIn();

  const redirectPath = location.state?.path || '/';

  const loginMutation = useMutation((credentials) => login(credentials), {
    onSuccess: (data) => {
      const { data: signinData } = data;
      setIdentifier('');
      setPassword('');
      signIn({
        token: signinData.jwt,
        expiresIn: 30 * 24 * 60,
        tokenType: 'Bearer',
        authState: signinData.user,
      });
      return navigate(redirectPath, { replace: true });
    },
    onError: (error, variables, context, mutation) => {
      console.log('err:::::: >>>>>', error);
    },
  });

  const { isLoading, error, isError } = loginMutation;

  const handleSubmit = async (e) => {
    setCheckErrors(true);
    e.preventDefault();
    loginMutation.mutate({ identifier, password });
  };

  return {
    error,
    isError,
    password,
    isLoading,
    identifier,
    setPassword,
    setIdentifier,
    onSubmit: handleSubmit,
  };
};

export default useAuthData;
