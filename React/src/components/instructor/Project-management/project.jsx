import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";



const Projects = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);

    const [selectedTraineeId, setSelectedTraineeId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);  // default page is 1

    

    const handleCloseModal = () => {
        setModalOpen(false);
        setDimmed(false); 
    };



    const [currentTrainee, setCurrentTrainee] = useState(null);
    const handleEditClick = (trainee) => {
        setCurrentTrainee(trainee);
        setEditData(trainee);
        setEditModalOpen(true);
        setDimmed(true); 
    };

    const handleEditAction = () => {
        setEditModalOpen(false);
        setDimmed(false); 
    };

    const contentClassName = isDimmed ? 'dimmed' : '';

    const [Trainees, setTrainees] = useState([]);

    const update = async (updatedData) => {
        try {

            const { data } = await axios.put("http://localhost:3000/user/updateUser", updatedData);
            console.log(data); 

            // Update the Trainees state with the updated data
            setTrainees(prevTrainees => {
                const updatedIndex = prevTrainees.findIndex(trainee => trainee.email === updatedData.email);
                if (updatedIndex !== -1) {
                    const updatedTrainees = [...prevTrainees];
                    updatedTrainees[updatedIndex] = updatedData;
                    return updatedTrainees;
                }
                return prevTrainees;
            });

        } catch (error) {
            console.error("Error updating Trainee:", error);
        }
    }

   const getAllTrainees = async (pageNo) => {
        try {
            setCurrentPage(pageNo);  // Update the currentPage state

            const { data } = await axios.get("http://localhost:3000/user/getAllUsers",{
                params: {
                    role:"trainee",
                    pageNo: pageNo
                }
            });
            console.log(data)
            if (data.response) {
                const formattedTrainees = data.response.map(item => ({
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    cohort: item.cohort,
                    stack: item.stack,
                    userId: item.userId
                }));
                setTrainees(formattedTrainees);
            }
        } catch (error) {
            console.error("Error fetching Trainees:", error);
        }
    };
    const blockUser = async (trainee) => {
        try {
           const {data}= await axios.post("http://localhost:3000/user/blockUser", { userId: trainee });
            console.log(data.response)
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };


    const handleBlockClick = (trainee) => {
        setSelectedTraineeId(trainee.userId);
        setModalOpen(true);
        setDimmed(true);
    };
    const handlePageChange = (direction) => {
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        getAllTrainees(newPage);
      };
    useEffect(() => {
        void getAllTrainees();
    }, []);


  return (
    <>
        <div className="w-full h-full p-4 pt-12 bg-opacity-50 bg-indigo-200">
            {isEditModalOpen && (
                <div className="modal-container  flex items-center justify-center z-100">
                    <div className="absolute  bg-[#efebea] opacity-50" onClick={() => setEditModalOpen(false)}></div>
                    <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                        <h2 className="text-xl font-semibold leading tracking">
                            Edit Trainee
                        </h2>
                        <div className="mt-4">
                            {/* Here you can have your edit form fields */}
                            {/* For example: */}
                            <label htmlFor="Email">Email</label><br />

                            <input
                                type="text"
                                value={editData.email || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="Email"
                                className="border p-2 mb-2"
                                disabled
                            /><br />
                            <label htmlFor="First Name">First Name</label><br />
                            <input
                                type="text"
                                value={editData.firstName || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                                placeholder="First Name"
                                className="border p-2 mb-2"
                            /><br />
                            <label htmlFor="Last Name">Last Name</label><br />

                            <input
                                type="text"
                                value={editData.lastName || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                                placeholder="Last Name"
                                className="border p-2 mb-2"
                            /><br />
                            <label htmlFor="Cohort">Cohort</label><br />

                            <input
                                type="text"
                                value={editData.cohort || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, cohort: e.target.value }))}
                                placeholder="Cohort"
                                className="border p-2 mb-2"
                            /><br />
                            <label htmlFor="Stack">Stack</label><br />

                            <input
                                type="text"
                                value={editData.stack || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, stack: e.target.value }))}
                                placeholder="Stack"
                                className="border p-2 mb-2"
                            />
                            {/* ... other fields */}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleEditAction}>Close</button>
                            <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2" onClick={() => { handleEditAction(); update(editData); }}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="modal-container flex items-center justify-center z-100">
                    <div className="absolute  bg-[#efebea] opacity-50" onClick={handleCloseModal}></div>
                    <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                        <h2 className="flex items-center gap-2 text-xl font-semibold leadi tracki">
                            <span className=''>Are you sure you want to block this user?</span>
                        </h2>
                        <p className="flex-1 dark:text-gray-400">By blocking this user, they will no longer be able to interact with you or view your content.</p>
                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                            {Trainees.map((trainee, index) => (
                                <div key={index}> {selectedTraineeId === trainee.userId ? (
                                    <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseModal}>Close</button>
                                   
                                  ) :null}
                                    {selectedTraineeId === trainee.userId ? (
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleCloseModal(); blockUser(trainee.userId); }}>Block</button>
                                    ) : null}
                                </div>
                            ))}

                       
                            </div>
                    </div>
                </div>
            )}
            <div className={`h-full w-full flex ${contentClassName}`}>
                <div className="w-full">
                    <nav className="text-purple-700 w-full p-4  dark:text-purple-700">
                        <ol className="text-purple-700 mt-6 flex h-8 space-x-2 dark:text-purple-700">
                            <li className="text-purple-700 flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-purple-700 text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Trainees</a>
                            </li>
                        </ol>
                        <h3 className="font-bold text-3xl ">Trainees</h3>

                    </nav>
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Trainee List</h2>
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
                                    {Trainees.map((trainee, index) => (

                                        <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                            <td className="p-3 border border-gray-300">
                                                <p>{trainee.firstName + " " + trainee.lastName}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{trainee.email}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{trainee.cohort}
                                                </p>
                                            </td>

                                            <td className="p-3 border border-gray-300">

                                                <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer" onClick={() => handleEditClick(trainee)}>                                                <span>Edit</span>

                                                </span>  <span
                                                    className="px-3 py-2 text-white rounded-md bg-red-500 cursor-pointer"
                                                    onClick={() => handleBlockClick(trainee)} // Pass the trainee object here
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
                                    <FaArrowLeft className= 'flex text-red-500'/>
                                    </button>
                                    <button type="button"  onClick={() => getAllTrainees(1)}   title="Page 1" className="bg-purple-700 inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border-rounded shadow-md text-white border-white">1</button>
                                    <button type="button" onClick={() => getAllTrainees(2)} className ="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 2">2</button>
                                    <button type="button"  onClick={() => getAllTrainees(3)} className="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 3">3</button>
                                    <button type="button"  onClick={() => getAllTrainees(4)}  className="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 4">4</button>
                                    <button type="button"  onClick={() => getAllTrainees(5)}  className="inline-flex items-center justify-center w-8 h-8 text-sm border-rounded shadow-md bg-purple-700 text-white border-white" title="Page 5">5</button>
                                    
                                    <button title="previous" type="button" className="pr-8 w-8 h-8 py-0 border rounded-md shadow-md bg-white border-gray-800"
                                    onClick={() => handlePageChange('next')}
                                    >
                                    <FaArrowRight className= 'flex text-red-500'/>
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

export default Projects
