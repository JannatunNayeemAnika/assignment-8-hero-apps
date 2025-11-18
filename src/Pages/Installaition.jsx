import React, { useState } from 'react';
import DownloadsImg from '../assets/icon-downloads.png';
import Star from '../assets/icon-ratings.png';
import { loadInstallation } from '../utils/localStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const parseSizeToNumber = (sizeString) => {
    if (!sizeString) return 0;
    
    
    const match = sizeString.match(/(\d+\.?\d*)\s*(MB|GB|KB)/i);
    
    if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2].toUpperCase();
        
        
        if (unit === 'GB') return value * 1024;
        if (unit === 'KB') return value / 1024;
        return value; 
    }
    
    
    const numericValue = parseFloat(sizeString);
    return isNaN(numericValue) ? 0 : numericValue;
};

const Installation = () => {
    // const [installation, setInstallation] = useState(()=> loadInstallation())
    //  Array.isArray(data[0]) ? data.flat() : data;

    const [installation, setInstallation] = useState(() => {
  const data = loadInstallation() || [];
  return Array.isArray(data[0]) ? data.flat() : data;
});
    const [sortOrder, setSortOrder] = useState('none')


    // useEffect(()=> {
    //     const savedList = JSON.parse(localStorage.getItem('installation'))
    //     if (savedList) setInstallation(savedList)
    // }, [])



    const sortedItem = (() => {
        
        const sortApps = (a, b) => {
            const sizeA = parseSizeToNumber(a.size);
            const sizeB = parseSizeToNumber(b.size);

            if (sortOrder === 'size-asc') {
                return sizeA - sizeB;
            } else if (sortOrder === 'size-desc') {
                return sizeB - sizeA; 
            }
            return 0;
        };

        if (sortOrder === 'none') {
             return installation;
        } else {
             return [...installation].sort(sortApps);
        }
    })()





//      const sortedItem = (() => {
//     if (sortOrder === 'size-asc') {
//       return [...installation].sort((b, c) => b.size - c.size)
//     } else if (sortOrder === 'size-desc') {
//       return [...installation].sort((b, c) => c.size - b.size)
//     } else {
//       return installation
//     }
//   })()

  const handleRemove = (id, title) => {
    const existingList = JSON.parse(localStorage.getItem('installation')) || [];
    let updatedList = existingList.filter(a => a.id !== id)
    // remove from localstorage
    // removeFromInstallation(id)
    // for ui instant update
    setInstallation(updatedList)
    toast.success(`'${title}' successfully uninstalled!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    localStorage.setItem('installation', JSON.stringify(updatedList))
  }


    return (
        <div className='space-y-6 flex flex-col min-h-screen max-w-7xl mx-auto'>

          <ToastContainer />
            <div className='flex justify-between py-5 items-center'>
        <h1 className='text-3xl font-semibold'>
          {' '}
          <span className='text-xl text-black'>
            ({sortedItem.length}) Apps Found
          </span>
        </h1>

        <label className='form-control w-full max-w-xs'>
          <select
            className='select select-bordered'
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value='none'>Sort by size</option>
            <option value='size-asc'>Low-&gt;High</option>
            <option value='size-desc'>High-&gt;Low</option>
          </select>
        </label>
      </div>
      <div className='space-y-3 '>
        {sortedItem.map(a => (
          <div key={a.id} className='card card-side bg-base-100 shadow-lg p-4'>
            <figure>
              <img
                className='w-40 h-28 object-cover'
                src={a.image}
                alt={a.name}
              />
            </figure>
            <div className='card-body'>
              <h3 className='card-title'>{a.title}</h3>
              <div className='flex space-x-3'>
                <div className="flex items-center space-x-2 bg-green-100 rounded-sm p-1">
                        <img src={DownloadsImg} alt="icon" className='w-4 h-4'/>
                        <p className='text-[#00D390]'>{a.downloads}</p>
                      </div>
                      <div className="flex items-center space-x-2 bg-yellow-100 p-1">
                        <img src={Star} alt="star" className='w-4 h-4' />
                        <p className='text-[#FF8811]'>{a.ratingAvg}</p>
                      </div>
                      <div>
                        <p className='text-[#627382]'>{a.size}</p>
                      </div>
              </div>
            </div>
            <div className='pr-4 flex items-center gap-3'>
              <button
                onClick={() => handleRemove(a.id, a.title)}
                className='btn text-white bg-[#00D390]'
              >
                Uninstall
              </button>
            </div>
          </div>
        ))}
      </div>
        </div>
    );
};

export default Installation;