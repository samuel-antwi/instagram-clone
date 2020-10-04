import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AiFillFacebook } from 'react-icons/ai';
import styled from 'styled-components';
import { OrComponent } from './login';
import SEO from '../components/shared/Seo';
import { AuthContext } from '../auth';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/es/lib/isEmail';
import { LoginWithFacebook } from './login';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
  });
  const { signUpWithEmailAndPassword } = useContext(AuthContext);
  const disabledButton = !formState.isValid || formState.isSubmitting;

  const history = useHistory();

  const onSubmit = async (data) => {
    setError('');
    try {
      await signUpWithEmailAndPassword(data);
      setTimeout(() => history.push('/'), 1000);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.message.includes('users_username_key')) {
      setError('Username already taken');
    } else if (error.code.includes('auth')) {
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <SEO title='Sign up' />
      <div className='container mx-auto pt-20 px-5'>
        <div className=' border border-gray-400 max-w-md mx-auto md:p-10 bg-white'>
          <img
            style={{ width: '200px' }}
            className='mb-5 mx-auto'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
            alt='Instagram'
          />
          <h1 className='font-medium md:text-2xl mb-3 text-gray-600'>
            Sign up to see photos and videos from your friends.
          </h1>
          <LoginWithFacebook />
          <OrComponent />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col pt-4'>
            <input
              style={{
                borderColor: errors.email
                  ? 'red'
                  : formState.touched.email && '',
              }}
              ref={register({
                required: true,
                validate: (input) => isEmail(input),
              })}
              name='email'
              className='p-3 border rounded my-1 bg-gray-100 focus:outline-none'
              type='text'
              placeholder='Email'
            />
            <input
              style={{
                borderColor: errors.name
                  ? 'red'
                  : formState.touched.name && 'green',
              }}
              ref={register({
                required: true,
                minLength: 5,
                maxLength: 20,
              })}
              name='name'
              className='p-3 border rounded my-1 bg-gray-100 focus:outline-none'
              type='text'
              placeholder='Full Name'
            />
            <input
              style={{
                borderColor: errors.username
                  ? 'red'
                  : formState.touched.username && 'green',
              }}
              ref={register({
                required: true,
                minLength: 5,
                maxLength: 20,
                pattern: /^[a-zA-Z0-9_.]*$/,
              })}
              name='username'
              className='p-3 border rounded my-1 bg-gray-100 focus:outline-none'
              type='text'
              placeholder='Username'
            />
            <input
              style={{
                borderColor: errors.password
                  ? 'red'
                  : formState.touched.password && 'green',
              }}
              ref={register({
                required: true,
                minLength: 5,
              })}
              name='password'
              className='p-3 border rounded my-1 bg-gray-100 focus:outline-none'
              type='Password'
              placeholder='Password'
            />
            <button
              className='text-white p-2 rounded mb-2 mt-4  bg-blue-500 focus:outline-none'
              type='submit'>
              {formState.isSubmitting ? 'Loading...' : 'Sign up'}
            </button>
            {error ? (
              <AuthError error={error} />
            ) : (
              <small className='text-gray-600 mb-3'>
                Password should be at least 6 characters long
              </small>
            )}
            <h3 className='text-gray-500'>
              By signing up, you agree to our Terms, Data Policy and Cookies
              Policy
            </h3>
          </form>
        </div>
        <Account />
      </div>
    </React.Fragment>
  );
};

const Account = () => {
  return (
    <div className=' border border-gray-400 max-w-md mx-auto p-6 bg-white mt-3'>
      <div className='flex items-center justify-center'>
        <h1 className='mr-2 text-gray-600'> Have an account?</h1>
        <Link className='text-blue-600 font-medium' to='/accounts/login'>
          Log in
        </Link>
      </div>
    </div>
  );
};

export const AuthError = ({ error }) => {
  return <h2 className='text-red-700 text-sm  mb-3'>{error}</h2>;
};

export default SignUpPage;
