import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Cookie from "universal-cookie";

const Teams = () => {
  const cookie = new Cookie();
  const [isAddMode, setAddMode] = useState(false);
  const [newTeamData, setNewTeamData] = useState({
    teamsLeaderId: "",  
    teamsLeaderId: "",
    title: "",
  });
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDimmed, setDimmed] = useState(false);

  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [teamMembers, setTeamMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const getUserIdFromCookie = () => {
    const authCookie = cookie.get('auth');
    if (authCookie && authCookie.userId) {
      return authCookie.userId;
    }
    return null;
  };

  const getAllTeamsMember = async () => {
    const instroctorId = getUserIdFromCookie();
    try {
      const { data } = await axios.get("http://localhost:3000/team/getAllMembers",{
        params:{
          instructorId: instroctorId

        }
      });
      console.log("members",data)

        // Assuming the backend response includes an array of team members
        setTeamMembers(data.response);

      
    } catch (error) {
      console.error("Error fetching Team Members:", error);
    }
  };

  const getAllProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/project/getAllProjects");
      console.log(data);
      if (data.response) {
        // Assuming the backend response includes an array of projects
        setProjects(data.response);
      }
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  const handleAddTeam = async () => {
    try {
      const response = await axios.post("http://localhost:3000/team/createTeam", newTeamData);
      console.log(response.data);
      getAllTeams(currentPage);
      setAddModalOpen(false);
      setDimmed(false);
    } catch (error) {
      console.error("Error creating Team:", error);
    }
  };

  const handleAddClick = () => {
    setAddMode(true);
    setNewTeamData({
      instructorId: getUserIdFromCookie(),
      teamsLeaderId: "",
      title: "",
    });
    setAddModalOpen(true);
    setDimmed(true);
  };


  const handleCloseModal = () => {
    setModalOpen(false);
    setDimmed(false);
  };

  const [currentTeam, setCurrentTeam] = useState(null);
  const handleEditClick = (team) => {
    setCurrentTeam(team);
    setEditData(team);
    setEditModalOpen(true);
    setDimmed(true);
  };

  const handleEditAction = () => {
    setEditModalOpen(false);
    setDimmed(false);
  };

  const contentClassName = isDimmed ? 'dimmed' : '';

  const [teams, setTeams] = useState([]);

  const update = async (updatedData) => {
    try {
      const { data } = await axios.put("http://localhost:3000/team/updateTeam", updatedData);
      console.log(data);

      setTeams((prevTeams) => {
        const updatedIndex = prevTeams.findIndex((team) => team.teamsId === updatedData.teamsId);
        if (updatedIndex !== -1) {
          const updatedTeams = [...prevTeams];
          updatedTeams[updatedIndex] = updatedData;
          return updatedTeams;
        }
        return prevTeams;
      });
    } catch (error) {
      console.error("Error updating Team:", error);
    }
  };


  const getAllTeams = async () => {
    try {
      
      setCurrentPage();
      const userId = getUserIdFromCookie();

      if (!userId) {
        console.error('User ID not found in the cookie');
        return;
      }

      const { data } = await axios.get("http://localhost:3000/team/getAllTeams",{
        params: {
          instructorId: userId,
        },
    });
    console.error("Res", data.response);

      if (data.response) {
        const formattedTeams = data.response.map((item) => ({
          teamsId: item.teamId,
          title: item.title,
          projectTitle:item.projectTitle,
          teamsLeaderId: item.leaderName,
        }));
        setTeams(formattedTeams);
      }
    } catch (error) {
      console.error("Error fetching Teams:", error);
    }
  };

  const handleBlockClick = (team) => {
    setSelectedTeamId(team.teamsId);
    setModalOpen(true);
    setDimmed(true);
  };

  const teamsPerPage = 5;

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    // Fetch team data
    void getAllTeams();
  
    // Fetch team members data
    void getAllTeamsMember();
  
    // Fetch project data
    void getAllProjects();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  

  return (
    <>
      <div className="w-full h-full p-4 pt-12 bg-opacity-50 bg-indigo-200">
        {isAddModalOpen && (
        <div className=" flex items-center justify-center z-100">
          <div className="bg-[#efebea] opacity-50" onClick={() => setAddModalOpen(false)}></div>
          <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
            <h2 className="text-xl font-semibold leading tracking">Add New Team</h2>
            <div className="mt-4">
              <label htmlFor="InstructorID">Instructor ID</label><br />
              <input
                type="text"
                value={getUserIdFromCookie()}
                readOnly
                placeholder="Instructor ID"
                className="border p-2 mb-2"
              /><br />
              <label htmlFor="Team Leader">Team Leader</label><br />
              <select
                value={newTeamData.firstName + newTeamData.lastName || ''}
                onChange={(e) => setNewTeamData((prev) => ({ ...prev, teamsLeaderId: e.target.value }))}
                className="border p-2 mb-2 w-full"
              >
                {teamMembers.map((member) => (
                  <option key={member.firstName + member.lastName} value={member.userId}>
                    {member.firstName + ' ' + member.lastName}
                  </option>
                ))}
              </select>
              
              <br />
              <label htmlFor="Title">Title</label><br />
              <input
                type="text"
                value={newTeamData.title || ''}
                onChange={(e) => setNewTeamData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Title"
                className="border p-2 mb-2"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={() => setAddModalOpen(false)}>Close</button>
              <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2" onClick={handleAddTeam}>Save</button>
            </div>
          </div>
        </div>
      )}

        {isEditModalOpen && (
          <div className="modal-container  flex items-center justify-center z-100">
            <div className="absolute  bg-[#efebea] opacity-50" onClick={() => setEditModalOpen(false)}></div>
            <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
              <h2 className="text-xl font-semibold leading tracking">Edit Team</h2>
              <div className="mt-4">
                {/* Here you can have your edit form fields */}
                {/* For example: */}
                <label htmlFor="Team Id">Team Id</label><br />
                <input
                                type="text"
                                value={editData.teamsId || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, teamsId1: e.target.value }))}
                                placeholder="Teams "
                                className="border p-2 mb-2"
                                disabled
                            /><br />
                <label htmlFor="Team Leader">Team Leader</label><br />

                <input
                  type="text"
                  value={editData.teamsLeaderId || ''} 
                  onChange={(e) => setEditData((prev) => ({ ...prev, teamsLeaderId: e.target.value }))}
                  placeholder="Team Leader"
                  className="border p-2 mb-2"
                /><br />
                <label htmlFor="Title">Title</label><br />
                <input
                  type="text"
                  value={editData.title || ''}
                  onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Title"
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
                {teams.map((team, index) => (
                  <div key={index}>
                    {selectedTeamId === team.teamsId ? (
                      <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseModal}>Close</button>
                    ) : null}
                    {selectedTeamId === team.teamsId ? (
                      <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleCloseModal(); /*blockUser(team.teamsId)*/ }}>Block</button>
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
                  <a rel="noopener noreferrer" href="#" className="text-purple-700 text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Teams</a>
                </li>
              </ol>
              <h3 className="font-bold text-3xl ">Teams</h3>
            </nav>
            <div className="container p-2 mx-auto sm:p-4 text-black ">
                <h2 className="mb-4 text-2xl font-semibold leadi text-purple-500">Team List</h2>
                  <button
                    className="justify-end rounded-sm shadow-sm bg-purple-700 text-white"
                    onClick={handleAddClick}
                  >
                    Add Team
                  </button>
              <div className="overflow-x-auto w-full bg-white ">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-yellow-200">
                    <tr className="text-left">
                      <th className="p-3 border border-gray-300">Team Id</th>
                      <th className="p-3 border border-gray-300">Team Title</th>
                      <th className="p-3 border border-gray-300">Team Leader</th>
                      <th className="p-3 border border-gray-300">Project Title</th>
                      <th className="p-3 border border-gray-300">Team Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, index) => (
                      <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                        <td className="p-3 border border-gray-300">
                          <p>{team.teamsId}</p>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <p>{team.title}</p>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <p>{team.teamsLeaderId}</p>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <p>{team.projectTitle}</p>
                        </td>
                        <td className="p-3 border space-x-2 border-gray-300">
                          <span className="px-3  py-2 text-white rounded-md bg-indigo-500 cursor-pointer" onClick={() => handleEditClick(team)}>
                            <span>Edit</span>
                          </span>
                          <span
                            className="px-3 py-2 text-white rounded-md bg-red-500 cursor-pointer"
                            onClick={() => handleBlockClick(team)}
                          >
                            <span>Block</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center space-x-4 my-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2 px-3 py-1 bg-purple-700 text-white rounded"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastTeam >= teams.length}
                  className="px-3 py-1 bg-purple-700 text-white rounded"
                >
                  <FaArrowRight />
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

export default Teams;
