import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);


    

    const handleCloseModal = () => {
        setModalOpen(false);
        setDimmed(false); 
    };



    const [currentProfile, setCurrentProfile] = useState(null);
    const handleEditClick = (Profile) => {
        setCurrentProfile(Profile);
        setEditData(Profile);
        setEditModalOpen(true);
        setDimmed(true); 
    };

    const handleEditAction = () => {
        setEditModalOpen(false);
        setDimmed(false); 
    };

    const contentClassName = isDimmed ? 'dimmed' : '';

    const [Profiles, setProfiles] = useState([]);

    const update = async (updatedData) => {
        try {

            const { data } = await axios.put("http://localhost:3000/user/updateUser", updatedData);
            console.log(data); 

            // Update the Profiles state with the updated data
            setProfiles(prevProfiles => {
                const updatedIndex = prevProfiles.findIndex(Profile => Profile.email === updatedData.email);
                if (updatedIndex !== -1) {
                    const updatedProfiles = [...prevProfiles];
                    updatedProfiles[updatedIndex] = updatedData;
                    return updatedProfiles;
                }
                return prevProfiles;
            });

        } catch (error) {
            console.error("Error updating Profile:", error);
        }
    }
 
   const getAllProfiles = async (userId) => {
        try {
            const { data } = await axios.get("http://localhost:3000/user/getUserByUserId",{
                params: {
                    userId: userId
                }
            });
            console.log(data)
            
            if (data.response) {
                setProfiles(data.response);
            }
        } catch (error) {
            console.error("Error fetching Profiles:", error);
        }
    };
    const blockUser = async (Profile) => {
        try {
           const {data}= await axios.post("http://localhost:3000/user/blockUser", { userId: Profile });
            console.log(data.response)
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };


    const handleBlockClick = (Profile) => {
        setSelectedProfileId(Profile.userId);
        setModalOpen(true);
        setDimmed(true);
    };
    
    useEffect(() => {
        void getAllProfiles("0fe8be08-81e1-40f4-9155-bd21244400ec");
    }, []);


  return (
    <>
        <div className="w-full p-4 lg:ml-80 lg:mr-8 my-6 bg-opacity-50 sm:mx-4 text-indigo-700 bg-indigo-200">
            {isEditModalOpen && (
                <div className="modal-container  flex items-center justify-center z-100">
                    <div className="absolute  bg-[#efebea] opacity-50" onClick={() => setEditModalOpen(false)}></div>
                    <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                        <h2 className="text-xl font-semibold leading tracking">
                            Edit Profile
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
                            {Profiles.map((Profile, index) => (
                                <div key={index}> {selectedProfileId === Profile.userId ? (
                                    <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseModal}>Close</button>
                                   
                                  ) :null}
                                    {selectedProfileId === Profile.userId ? (
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleCloseModal(); blockUser(Profile.userId); }}>Block</button>
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
                                <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Profiles</a>
                            </li>
                        </ol>
                        <h3 className="font-bold text-3xl ">Profiles</h3>

                    </nav>
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Profile List</h2>
                        <div className="overflow-x-auto w-full bg-white ">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-yellow-200">
                                    <tr className="text-left">
                                        <th className="p-3 border border-gray-300">First Name</th>
                                        <th className="p-3 border border-gray-300">Last Name</th>
                                        <th className="p-3 border border-gray-300">User Id</th>
                                        <th className="p-3 border border-gray-300">Email</th>
                                        <th className="p-3 border border-gray-300">Role</th>
                                        <th className="p-3 border border-gray-300">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {Profiles.map((Profile, index) => ( */}

                                        <tr  className="border-b border-opacity-20 border-gray-700 bg-white">
                                            <td className="p-3 border border-gray-300">
                                                <p>{Profiles.firstName}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Profiles.lastName}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Profiles.userId}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Profiles.email}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Profiles.role}
                                                </p>
                                            </td>

                                            <td className="p-3 border border-gray-300">

                                                <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer" onClick={() => handleEditClick(Profiles)}>                                                <span>Edit</span>

                                                </span>  <span
                                                    className="px-3 py-2 text-white rounded-md bg-red-500 cursor-pointer"
                                                    onClick={() => handleBlockClick(Profiles)} // Pass the Profile object here
                                                >
                                                    <span>Block</span>
                                                </span>
                                            </td> 
                                        </tr>
                                    {/* ))} */}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  );
}

export default Profile
