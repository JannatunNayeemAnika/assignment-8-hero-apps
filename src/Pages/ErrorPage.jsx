
import React from 'react';
import { Link } from 'react-router';
import errImg from '../assets/error-404.png'

const ErrorPage = () => {
  return (
    <><div className="py-20 min-h-screen flex flex-col justify-center items-center bg-gray-100">

        <img src={errImg} alt="" className='w-70 h-70' />



          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found!</h2>
          <p className="text-gray-600 mb-6">
              The page you are looking for is not available.
          </p>
          <Link
              to="/"
              className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
              Go Back!
          </Link>
      </div></>
  );
};

export default ErrorPage;