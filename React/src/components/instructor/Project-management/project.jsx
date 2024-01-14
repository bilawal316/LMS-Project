import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";



const Projects = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);
    

    const handleCloseModal = () => {
        setModalOpen(false);
        setDimmed(false); 
    };

    const handleEditClick = (Project) => {
        setCurrentTrainee(Project);
        setEditData(Project);
        setEditModalOpen(true);
        setDimmed(true); 
    };

    const handleEditAction = () => {
        setEditModalOpen(false);
        setDimmed(false); 
    };

    const contentClassName = isDimmed ? 'dimmed' : '';

    const [Projects, setProjects] = useState([]);

    const update = async (updatedData) => {
        try {

            const { data } = await axios.put("http://localhost:3000/user/updateUser", updatedData);
            console.log(data); 

            // Update the Trainees state with the updated data
            setProjects(prevProjects => {
                const updatedIndex = prevProjects.findIndex(trainee => trainee.email === updatedData.email);
                if (updatedIndex !== -1) {
                    const updatedTrainees = [...prevProjects];
                    updatedTrainees[updatedIndex] = updatedData;
                    return updatedTrainees;
                }
                return prevProjects;
            });

        } catch (error) {
            console.error("Error updating Trainee:", error);
        }
    }

   const getAllProjects = async (pageNo) => {
        try {

            const { data } = await axios.get("http://localhost:3000/project/getAllProjects",{
                
            });
            console.log(data)
            if (data.response) {
                const formattedProjects = data.response.map(item => ({
                    projectId: item.projectId,
                    title: item.title,
                    description: item.description,
                    
                }));
                setProjects(formattedProjects);
            }
        } catch (error) {
            console.error("Error fetching Projects:", error);
        }
    };
    const blockUser = async (Projects) => {
        try {
           const {data}= await axios.post("http://localhost:3000/user/blockUser", { userId: Projects });
            console.log(data.response)
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };

    const creaate = async (createData) => {
        try {

            const { data } = await axios.put("http://localhost:3000/project/createProject", createData);
            console.log(data);

            // create the Projects state with the updated data
            
            setProjects(prevProjects => {
                const updatedIndex = prevProjects.findIndex(Projects => Projects.projectId === updatedData.projectId);
                if (updatedIndex !== -1) {
                    const updatedProjects = [...prevProjects];
                    updatedProjects[updatedIndex] = updatedData;
                    return updatedProjects;
                }
                return prevProjects;
            });

        } catch (error) {
            console.error("Error updating Projects:", error);
        }
    };

    const handleBlockClick = (Projects) => {
        setSelectedTraineeId(Projects.projectId);
        setModalOpen(true);
        setDimmed(true);
    };
   
    useEffect(() => {
        void getAllProjects();
    }, []);


  return (
    <>
        <div className="w-full h-full p-4 pt-12 bg-opacity-50 bg-indigo-200">
            {isEditModalOpen && (
                <div className="modal-container  flex items-center justify-center z-100">
                    <div className="absolute  bg-[#efebea] opacity-50" onClick={() => setEditModalOpen(false)}></div>
                    <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                        <h2 className="text-xl font-semibold leading tracking">
                            Edit Projects
                        </h2>
                        <div className="mt-4">
                            {/* Here you can have your edit form fields */}
                            {/* For example: */}
                            <label htmlFor="Email">Projects Id</label><br />

                            <input
                                type="text"
                                value={editData.email || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="Email"
                                className="border p-2 mb-2"
                                disabled
                            /><br />
                            <label htmlFor="Project Name">Project Name</label><br />
                            <input
                                type="text"
                                value={editData.firstName || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="First Name"
                                className="border p-2 mb-2"
                            /><br />

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
                            {Projects.map((Projects, index) => (
                                <div key={index}> {selectedProjectsId === Projects.projectId ? (
                                    <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseModal}>Close</button>
                                   
                                  ) :null}
                                    {selectedProjectsId === Projects.projectsId ? (
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleCloseModal(); blockUser(Projects.
                                Id); }}>Block</button>
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
                        <h3 className="font-bold text-3xl ">Trainees Projects</h3>

                    </nav>
                    <div className="container p-2 mx-auto sm:p-4 text-black ">
                        <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Project List</h2>
                        <div className="overflow-x-auto w-full bg-white ">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-yellow-200">
                                    <tr className="text-left">
                                        <th className="p-3 border border-gray-300">Project Id</th>
                                        <th className="p-3 border border-gray-300">Project Name</th>
                                        <th className="p-3 border border-gray-300">Project Description</th>
                                        <th className="p-3 border border-gray-300">Project Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Projects.map((Projects, index) => (

                                        <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                            <td className="p-3 border border-gray-300">
                                                <p>{Projects.projectId}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Projects.title}</p>
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                <p>{Projects.description}
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
    </>
  );
}

export default Projects
