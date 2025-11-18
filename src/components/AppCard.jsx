import React from 'react';
import DownloadsImg from '../assets/icon-downloads.png';
import Star from '../assets/icon-ratings.png';
import { Link } from 'react-router';

const AppCard = ({apps={}}) => {
    const {image, title,downloads,ratingAvg,id} = apps;
    return (
       <Link to={`/apps/${id}`}>
       <div className="card bg-base-100 w-70 shadow-lg mt-4 hover:scale-105 transition ease-in-out">
  <figure>
    <img
      src={image}
      alt="Shoes" className="w-70 h-60 object-cover" />
  </figure>
  <div className="card-body">
  <h2 className='font-semibold text-lg text-black text-center'>{title}</h2>
    <div className="card-actions justify-between">
      <div className="flex items-center space-x-2 bg-green-100 rounded-sm p-1">
        <img src={DownloadsImg} alt="icon" className='w-4 h-4'/>
        <p className='text-[#00D390]'>{downloads}</p>
      </div>
      <div className="flex items-center space-x-2 bg-yellow-100 p-1">
        <img src={Star} alt="star" className='w-4 h-4' />
        <p className='text-[#FF8811]'>{ratingAvg}</p>
      </div>

    </div>
  </div>
</div>
       </Link>
    );
};

export default AppCard;