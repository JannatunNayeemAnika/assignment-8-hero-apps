import React from 'react';
import Banner from '../Components/Banner';
import Apps from './Apps';
import { Link } from 'react-router';
import AppCard from '../Components/AppCard';
import useApps from '../Hooks/useApps';

const Home = () => {

  const { apps, loading, error } = useApps();

  const featuredApps = Array.isArray(apps) ? apps.slice(0, 8) : [];

  return (
    <div className="min-h-screen pt-20">
      <Banner />

      <div>
        <h1 className='text-5xl text-center font-bold mt-20'>Trending Apps</h1>
        <p className='text-xl text-center font-normal text-[#627382] mt-5 mb-10'>Explore All Trending Apps on the Market developed by us</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-1 max-w-6xl mx-auto'>
        {featuredApps.map(app => (
          <AppCard key={app.id} apps={app} />
        ))}
      </div>

      <div className='text-center mt-10'>
        <Link to='/apps' className='pl-4 pr-4 p-2 rounded-md bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white btn'>
          Show All
        </Link>
      </div>

    </div>
  );
};

export default Home;
