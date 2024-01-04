import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {UsersIcon, UserIcon} from '@heroicons/react/24/outline'

const TraineeNum = () => {
  const [totalTrainees, setTotalTrainees] = useState(0);

  const getTotalTrainees = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/user/getTotalTrainees");

      if (data.response) {
        setTotalTrainees(data.response.totalTrainees);
      }
    } catch (error) {
      console.error("Error fetching total trainees:", error);
    }
  };

  useEffect(() => {
    void getTotalTrainees();
  }, []);

  return (
    // <div className='w-full px-80 p-8 bg-slate-700'>
    <div className="w-62  h-10 rounded-lg shadow-md text-center bg-slate-700">
      h
      {/* <div className='flex'>
      <UsersIcon className='text-purple-700'style={{ width: '40px', height: '40px' }}/>
        <h2 className="text-3xl font-semibold text-purple-500 mb-4">Trainee List</h2>
        </div> */}
        {/* <div className="bg-purple-700 p-6 rounded-lg">
          <p className="flex text-lg font-medium text-white">
            Total Trainees: {totalTrainees}</p>
        </div> */}
      </div>
      // </div>
  );
};

export default TraineeNum;
