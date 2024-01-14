import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';

const ProjectDeadline = () => {
  const [Projects, setProjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const getAllProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/project/getAllProjects", {});
      console.log(data);
      if (data.response) {
        const formattedProjects = data.response.map(item => ({
          projectId: item.projectId,
          title: item.title,
          deadlineDate: item.deadlineDate,
        }));
        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  useEffect(() => {
    void getAllProjects();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = Projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex space-x-2'>
      <div className="w-3/5  text-black">
        <table className="w-full h-full text-sm border-collapse bg-white overflow-y-auto">
          <thead className="bg-purple-700 text-white">
            <tr className="text-left">
              <th className="p-3 border border-gray-300">Project Name</th>
              <th className="p-3 border border-gray-300">Project Deadline</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                <td className="p-3 border border-gray-300">
                  <p>{project.title}</p>
                </td>
                <td className="p-3 border border-gray-300">
                  <p>{project.deadlineDate}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 bg-purple-700 text-white rounded"
          >
            Prev
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastProject >= Projects.length}
            className="px-3 py-1 bg-purple-700 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-2/5 ">
        <div className="h-full text-black text-sm border-collapse bg-white">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default ProjectDeadline;
