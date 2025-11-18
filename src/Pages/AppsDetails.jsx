import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useApps from '../Hooks/useApps';
import DownloadsImg from '../assets/icon-downloads.png';
import Star from '../assets/icon-ratings.png';
import ReviewsIcon from '../assets/icon-review.png';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppsDetails = () => {
  const { id } = useParams()
  const { apps, loading } = useApps()
  console.log('ID from params:', id);
  console.log('Apps:', apps);
  console.log('Loading:', loading);
  const app = apps?.find(a => a.id === Number(id));

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (app) {
      const existingList = JSON.parse(localStorage.getItem('installation')) || [];
      const isAppInstalled = existingList.some(a => a.id === app.id);
      setIsInstalled(isAppInstalled);
    }
  }, [app]);

  if (loading) return <p className="text-center mt-8 text-xl">Loading...</p>

  if (!app || app.length === 0) {
    return <p className="text-center mt-8 text-xl text-red-500">No Apps Found</p>
  }


  //  if (!app) return <p className="text-center mt-8 text-xl text-red-500">No App Found</p>

  const { title, image, companyName, reviews, ratingAvg, downloads, size, ratings, description } = app;


  const chartData = ratings
    ?.map(r => ({
      name: r.name,
      count: r.count,
    }))
    .slice()
    .reverse() || [];


  const maxCount = chartData.reduce((max, r) => Math.max(max, r.count), 0) || 1000;



  const handleAddToInstallation = () => {
    const existingList = JSON.parse(localStorage.getItem('installation')) || [];
    let updatedList = [];

    const isDuplicate = existingList.some(a => a.id === app.id);

    if (isDuplicate) {
      toast.warn(`App "${title}" is already installed.`);
      return;
    }

    updatedList = [...existingList, app];
    localStorage.setItem('installation', JSON.stringify(updatedList));


    setIsInstalled(true);
    toast.success(`${title} Installed Successfully!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // const buttonClasses = `btn text-white text-xl font-semibold w-full sm:w-auto transition duration-300 ease-in-out ${isInstalled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00D390] hover:bg-green-600'}`;

  const baseClasses = 'btn text-white text-xl font-semibold w-full sm:w-auto transition duration-300 ease-in-out bg-[#00D390]';

  const dynamicStyle = isInstalled
    ? ' opacity-80 hover:bg-[#00D390]'
    : 'hover:bg-green-600';

  const buttonClasses = `${baseClasses} ${dynamicStyle}`;


  return (
    <div className='p-4 min-h-screen  items-start justify-center'>
      <ToastContainer />
      <div className=' max-w-7xl mx-auto w-350 h-85 p-6 bg-white shadow-lg rounded-lg mt-20'>
        <div className='flex items-center space-x-6'>
          <div>
            <img src={image} alt="title" className='w-70 h-70 object-cover rounded-lg shadow-md' />
          </div>
          <div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
              <p className="text-gray-600 text-sm mt-1">
                Developed by <span className="text-indigo-600 font-medium">{companyName}</span>{ }
              </p>
            </div>
            <hr className="my-6 border-gray-200" />

            <div className="flex flex-col space-y-4 ">

              <div className="flex space-x-8 mt-4">
                <div className=" flex flex-col items-center text-center" >
                  <img src={DownloadsImg} alt="Downloads Icon" className='w-6 h-6 mx-auto mb-1' />
                  <p className="text-gray-500 text-sm">Downloads</p>
                  <p className="text-xl  font-semibold text-gray-800">{downloads}</p>
                </div>


                <div className=" flex flex-col items-center text-center">
                  <img src={Star} alt="Ratings Icon" className='w-6 h-6 mx-auto mb-1' />
                  <p className="text-gray-500 text-sm">Average Ratings</p>
                  <p className="text-xl text-center font-semibold text-gray-800">{ratingAvg}</p>
                </div>


                <div className=" flex flex-col items-center text-center">

                  <img src={ReviewsIcon || DownloadsImg} alt="Reviews Icon" className='w-6 h-6 mx-auto mb-1' />
                  <p className="text-gray-500 text-sm">Total Reviews</p>
                  <p className="text-xl font-semibold text-gray-800">{reviews}</p>
                </div>

              </div>
              <div>
                <button onClick={handleAddToInstallation}
                  className={buttonClasses}
                
                >
                  {isInstalled ? 'Installed' : `Install Now (${size})`}
                </button>
              </div>

            </div>

          </div>
        </div>


      </div>

      {/* chart */}

      <div className='max-w-7xl mx-auto bg-white mt-10 shadow-xl'>
        <h3 className='text-xl font-semibold'>Ratings</h3>
        <div className='bg-base-400  rounded-xl p-4 h-80'>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              layout="vertical"
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: -25,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                dataKey="count"
                axisLine={false}
                tickLine={false}
                domain={[0, maxCount]}
                tickFormatter={(value) => {
                  if (value === 0) return '0';
                  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                  if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
                  return value.toLocaleString();
                }}
                style={{ fontSize: '12px' }}

              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={70}
                style={{ fontSize: '13px', fontWeight: 'bold' }}

              />
              <Tooltip
                formatter={(value) => [value.toLocaleString(), 'Reviews']}

              />
              {/* <Legend /> */}
              <Bar dataKey="count" fill="#f97316"
                barSize={30}


                activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>
      <div className='max-w-7xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4 pb-2'>Description</h2>
        <p className='text-gray-600 leading-relaxed whitespace-pre-line'>
          {description}
        </p>
      </div>

    </div>


  );
};

export default AppsDetails; 