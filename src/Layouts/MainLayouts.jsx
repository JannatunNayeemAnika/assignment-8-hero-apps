import React from 'react';


import { Outlet, useNavigation } from 'react-router';
import ErrorPage from '../Pages/ErrorPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../Components/LoadingSpinner';

// import Banner from '../Components/Banner';

const MainLayouts = () => {

    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading' || navigation.state === 'submitting';

    return (
        // <div className='flex flex-col min-h-screen'>
        //     <Navbar/>
        //     {/* <Banner></Banner> */}
            
        //     <div className='flex-1'>
                
        //         <Outlet/>
        //     </div>
        //     <Footer/>
        // </div>

        <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <div className='flex-1'>
                
                
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <Outlet/>
                )}

            </div>
            <Footer/>
        </div>


    );
};

export default MainLayouts;