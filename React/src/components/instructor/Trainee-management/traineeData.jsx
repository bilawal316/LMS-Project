import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TraineeData = () => {

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);

    const [selectedTraineeId, setSelectedTraineeId] = useState(null);
  
    

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


    const getAllTrainees = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/user/getAllUsers");
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

    useEffect(() => {
        void getAllTrainees();
    }, []);

    
    return (

        <div className='className="h-screen flex justify-center items-center my-8"'>
            {isEditModalOpen && (
                <div className="modal-container  flex items-center justify-center z-100">
                    <div className="absolute  bg-black opacity-50" onClick={() => setEditModalOpen(false)}></div>
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
                            <label htmlFor="Class">Class</label><br />

                            <input
                                type="text"
                                value={editData.cohort || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, cohort: e.target.value }))}
                                placeholder="Class"
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
                    <div className="absolute  bg-black opacity-50" onClick={handleCloseModal}></div>
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
            <div className={`h-screen w-screen flex justify-center ${contentClassName}`}>
                <div className=" ps-12 w-10/12 h-5/6">
                    
                       
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <h2 className="mb-4 text-2xl font-semibold leadi">Trainee List</h2>
                        <div className="overflow-x-auto w-11/12 bg-white ">
                            <table className="w-full text-sm border-collapse">

                                <thead className="bg-white">
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
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TraineeData;