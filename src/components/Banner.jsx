// import React from 'react';
import heroImage from '../assets/hero.png';

const Banner = () => {
    return (
        <div className="bg-white pt-12 md:pt-20">
            <div className="container mx-auto max-w-7xl px-4 text-center">
                <h2 className="text-7xl text-center font-bold">We Build <br/>
                    
                        <span className='bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text'> Productive</span> Apps</h2>
                    <p className='mt-8 text-[#627382]'>At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.<br />Our goal is to turn your ideas into digital experiences that truly make an impact.</p>

                    <div className='flex justify-center mt-8 space-x-3'>

                         <a 
                        href="https://play.google.com/store/apps" 
                        target="_blank" 
                        rel=""
                        className="flex items-center space-x-2 border border-gray-300 py-3 px-6 rounded-lg hover:shadow-lg transition duration-200"
                    >
                        <img src="https://img.icons8.com/fluency/48/google-play-store-new.png" alt="Google Play" className="w-5 h-5"/>
                        <span className="font-semibold text-gray-700">Play Store</span>
                    </a>
                    
            
                    <a 
                        href="https://www.apple.com/app-store/" 
                        target="_blank" 
                        rel=""
                        className="flex items-center space-x-2 border border-gray-300 py-3 px-6 rounded-lg hover:shadow-lg transition duration-200"
                    >
                        <img src="https://img.icons8.com/fluency/48/apple-app-store.png" alt="App Store" className="w-5 h-5"/>
                        <span className="font-semibold text-gray-700">App Store</span>
                    </a>

                    </div>
            </div>

            <div className='flex justify-center mt-16'>
                <img src={heroImage} alt="" className='w-full max-w-xs md:max-w-xl lg:max-w-2xl relative z-10'/>
            </div>
            <div className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] mt-0 py-12 text-white">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                <h3 className="text-4xl font-bold mb-8">Trusted by Millions, Built for You</h3>

                <div className="grid grid-cols-3 gap-8">
                     <div className='mb-4'>
                            
                            <p className="text-sm ">Total Downloads</p>
                            <p className="text-5xl font-extrabold mt-4">29.6M</p>
                            <p className="text-xs mt-4 opacity-70">21% More Than Last Month</p>
                        </div>
                     <div className='mb-4'>
                            
                            <p className="text-sm ">Total Reviews</p>
                            <p className="text-5xl font-extrabold mt-4">906K</p>
                            <p className="text-xs mt-4 opacity-70">46% more than last month</p>
                        </div>
                     <div className='mb-4'>
                            
                            <p className="text-sm ">Active Apps</p>
                            <p className="text-5xl font-extrabold mt-4">132+</p>
                            <p className="text-xs mt-4 opacity-70">31 more will Launch</p>
                        </div>

                </div>
            </div>
            </div>
        </div>
    );
};

export default Banner;