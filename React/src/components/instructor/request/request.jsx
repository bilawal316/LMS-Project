import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


function Request() {

    const [Requests, setRequests] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const getAllRequests = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/user/getAllRequests",{
              params:{
                role:"trainee"

              }  
            });
            setData(data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
            if (data.response) {
                const formattedRequests = data.response.map(item => ({
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    userId: item.userId
                }));
                setRequests(formattedRequests);
            }
          
        } catch (error) {
            setLoading(false);

        }
    };
        getAllRequests(1);

    }, []); 

    const approveRequest = async (userId) => {
        try {
            await axios.put("http://localhost:3000/user/updateUser", {

                userId,
                isApproved: true,


            });
            // If successful, remove the approved request from the frontend
            setRequests(prevRequests => prevRequests.filter(request => request.userId !== userId));
            alert("The request has been approved successfully");
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };

  return (
    <>
        <div className="w-full p-4 lg:ml-80 lg:mr-8 my-6 bg-opacity-50 sm:mx-4 text-indigo-700 bg-indigo-200">
          
        
            <div className="h-full w-full flex ">
                <div className="w-full">
                    <nav className="text-purple-700 w-full p-4  dark:text-purple-700">
                        <ol className="text-purple-700 mt-6 flex h-8 space-x-2 dark:text-purple-700">
                            <li className="text-purple-700 flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-purple-700 text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Requests</a>
                            </li>
                        </ol>
                        <h3 className="font-bold text-3xl ">Requests</h3>

                    </nav>
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Request List</h2>
                        <div className="overflow-x-auto w-full bg-white ">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-yellow-200">
                                    <tr className="text-left">
                                        <th className="p-3 border border-gray-300">Name</th>
                                        <th className="p-3 border border-gray-300">Email</th>
                                        <th className="p-3 border border-gray-300">Cohort</th>
                                        <th className="p-3 border border-gray-300">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Requests.map((Request, index) => (

                                        <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                            <td className="p-3 border border-gray-300">
                                                <p>{Request.firstName + " " + Request.lastName}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Request.email}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Request.cohort}
                                                </p>
                                            </td>

                                            <td className="p-3 border border-gray-300">

                                                <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer"
                                                onClick={() => approveRequest(Request.userId)}>
                                                    <span>Approve</span>

                                                </span>  <span
                                                    className="px-3 py-2 text-white rounded-md bg-red-500 cursor-pointer"
                                                    onClick={() => handleBlockClick(Request)} // Pass the Request object here
                                                >
                                                    <span>Block</span>
                                                </span>
                                            </td> 
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div className="flex justify-center space-x-1 text-gray-100 p-2">
                                    <button title="previous" type="button" className="pr-8 w-8 h-8 py-0 border rounded-md shadow-md bg-white border-gray-800"
                                    onClick={() => handlePageChange('prev')}
                                    >
                                    <FaArrowLeft className= 'flex text-purple-700'/>
                                    </button>
                                    <button type="button"  onClick={() => getAllRequests(1)}   title="Page 1" className="bg-purple-700 inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border-rounded shadow-md text-white border-white">1</button>
                                    <button type="button" onClick={() => getAllRequests(2)} className ="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 2">2</button>
                                    <button type="button"  onClick={() => getAllRequests(3)} className="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 3">3</button>
                                    <button type="button"  onClick={() => getAllRequests(4)}  className="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 4">4</button>
                                    <button type="button"  onClick={() => getAllRequests(5)}  className="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 5">5</button>
                                    
                                    <button title="previous" type="button" className="pr-8 w-8 h-8 py-0 border rounded-md shadow-md bg-white border-gray-800"
                                    onClick={() => handlePageChange('next')}
                                    >
                                    <FaArrowRight className= 'flex text-purple-700'/>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  );
}

export default Request
