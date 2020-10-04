import React from 'react';
import Layout from '../components/shared/Layout';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Layout minimalNavbar title='Page Not Found'>
      <div className='mt-20'>
        <h1 className='text-3xl mb-5 text-center'>
          Sorry, this page isn't available.
        </h1>
        <div className='md:flex items-center justify-center px-3'>
          <p className='text-lg mb-4 md:mb-0'>
            The link you followed may be broken, or the page may have been
            removed.
          </p>
          <Link className='text-blue-800 font-medium text-lg ml-1 ' to='/'>
            Go back to Insatgram.
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
