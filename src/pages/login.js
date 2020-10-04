import React, { useState, useContext } from 'react';
import SEO from '../components/shared/Seo';
import { Link, useHistory } from 'react-router-dom';
import { AiFillFacebook } from 'react-icons/ai';
import styled from 'styled-components';
import { AuthContext } from '../auth';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_USER_EMAIL } from '../graphql/queries';
import isEmail from 'validator/es/lib/isEmail';
import { AuthError } from './signup';
import LoadingScreen from '../components/shared/LoadingScreen';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const { logInWithEmailAndPassword } = useContext(AuthContext);
  const [error, setError] = useState('');
  const client = useApolloClient();
  const disabledButton = Boolean(!formState.isValid || formState.isSubmitting);
  const history = useHistory();

  const onSubmit = async ({ input, password }) => {
    if (!isEmail(input)) {
      input = await getUserEmail(input);
    }
    try {
      setLoading(true);
      setError('');
      await logInWithEmailAndPassword(input, password);
      setTimeout(() => history.push('/'), 0);
    } catch (error) {
      console.log(error.code);
      handleError(error);
    }
    setLoading(false);
  };

  const handleError = (error) => {
    if (error.code.includes('auth')) {
      setError(error.message);
    }
  };

  //  A function to get users email address when they try to login with username or phone number
  const getUserEmail = async (input) => {
    const variables = { input };
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables,
    });
    const userEmail = response.data.users[0]?.email || 'no@email.com';
    return userEmail;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <SEO title='Login' />
      <div className='container mx-auto pt-20 px-5'>
        <div className=' border border-gray-400 max-w-md mx-auto md:p-10 bg-white'>
          <img
            style={{ width: '200px' }}
            className='mb-5 mx-auto'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
            alt='Instagram'
          />
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <input
              ref={register({
                required: true,
                minLength: 5,
              })}
              name='input'
              className='p-3 border rounded my-1 bg-gray-100 focus:outline-none'
              type='text'
              placeholder='Username, email or phone'
            />
            <input
              ref={register({
                required: true,
                minLength: 5,
              })}
              name='password'
              className='p-3 border rounded my-1 bg-gray-100 focus:outline-none'
              type='Password'
              placeholder='Password'
            />
            {disabledButton ? (
              <button
                disabled={disabledButton}
                className={
                  'text-white p-2 rounded mt-4 my-2 focus:outline-none bg-blue-300 cursor-default'
                }
                type='submit'>
                Log In
              </button>
            ) : (
              <button
                className={
                  'text-white p-2 rounded mt-4 my-2 focus:outline-none bg-blue-500'
                }
                type='submit'>
                Log In
              </button>
            )}
            <AuthError error={error} />
          </form>
          <OrComponent />
          <LoginWithFacebook />
        </div>
        <Account />
      </div>
    </React.Fragment>
  );
};

export const OrComponent = () => {
  return (
    <div className='grid grid-cols-3'>
      <div className=' mt-2 border-t border-gray-500'></div>
      <h1 className='text-center text-gray-500'>OR</h1>
      <div className=' border-t mt-2 border-gray-500'></div>
    </div>
  );
};

// Log user in with facebook
export const LoginWithFacebook = () => {
  const { logInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState();
  const history = useHistory();

  const handleLogInWithGoogle = async () => {
    try {
      setError('');
      await logInWithGoogle();
      history.push('/');
    } catch (error) {
      console.log('Error logging in with google', error);
      setError(error.message);
    }
  };

  return (
    <FacebookStyles>
      <div className='pt-4 text-center'>
        <button
          onClick={handleLogInWithGoogle}
          className=' facebook flex justify-center items-center mb-4 font-medium focus:outline-none'>
          <AiFillFacebook className='mr-2' size='1.5rem' /> Log in with Facebook
        </button>
        <AuthError error={error} />
        <Link className='forgotten' to='/reset-password'>
          Forgot password?
        </Link>
      </div>
    </FacebookStyles>
  );
};

const Account = () => {
  return (
    <div className=' border border-gray-400 max-w-md mx-auto p-6 bg-white mt-3'>
      <div className='flex items-center justify-center'>
        <h1 className='mr-2 text-gray-600'>Don't have an account?</h1>
        <Link className='text-blue-600 font-medium' to='/accounts/emailsignup'>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

const FacebookStyles = styled.div`
  .facebook {
    color: #385185;
  }
  .forgotten {
    color: #0092d1;
  }
`;
