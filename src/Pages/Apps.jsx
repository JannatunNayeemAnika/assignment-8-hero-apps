// import React, { useEffect, useState } from 'react';

import { Suspense, useEffect, useState } from "react";
// import App1 from "./App1";
import useApps from "../Hooks/useApps";
import AppCard from "../Components/AppCard";
import LoadingSpinner from "../Components/LoadingSpinner";

import { Link } from "react-router";

const Apps = () => {
    const { apps, loading } = useApps();
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [filteredApps, setFilteredApps] = useState(apps);
    const term = search.trim().toLocaleLowerCase()

    useEffect(() => {
        setIsSearching(true);

        const timer = setTimeout(() => {
            const results = term
                ? apps.filter(app => app.title.toLocaleLowerCase().includes(term))
                : apps;

            setFilteredApps(results);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [term, apps]);


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <LoadingSpinner />
            </div>
        );
    }

  
    const searchedApps = term
        ? apps.filter(app =>
            app.title.toLocaleLowerCase().includes(term)
        )
        : apps



    const NoAppFoundMessage = (
        <div className="text-center mt-16 col-span-full ">
            <div className="flex justify-center mb-5" >
                
            </div>
            <h1 className="text-4xl font-bold mb-5">OPPS!! APP NOT FOUND</h1>

            <p className="text-gray-500 mt-2 mb-5">
                The App you are requesting is not found on our system.  please try another apps
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
                Go Back!
            </Link>
        </div>
    );


    return (
        <div>
            <h1 className='text-5xl text-center font-bold mt-20'>Our All Applications</h1>
            <p className='text-xl text-center font-normal text-[#627382] mt-5'>Explore All Apps on the Market developed by us. We code for Millions</p>

            <div className="flex justify-between flex-1 max-w-6xl mx-auto mt-10 mb-4">
                <h2 className="font-bold text-2xl">({searchedApps.length}) Apps Found</h2>
                <label className="input" >
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} type="search" placeholder="search Apps" />
                </label>

                
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 max-w-6xl mx-auto '>


                {isSearching ? (
                   
                    <div className="col-span-full flex justify-center py-20">
                        <LoadingSpinner />
                    </div>
                ) : filteredApps.length > 0 ? (
                   
                    filteredApps.map(app => (
                        <AppCard key={app.id} apps={app}></AppCard>
                    ))
                ) : (
                    
                    NoAppFoundMessage
                )}


            </div>


            <div className=''>

            </div>



        </div>

    );
};

export default Apps;