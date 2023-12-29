import { useState } from "react";
import React from 'react'
import Navbar from '../instructor/navbar'
import Sidebar from '../instructor/sidebar'
import Home from "../instructor/home";
import Teams from "../instructor/Team-management/teams";
import Tasks from "../instructor/Project-management/tasks";
import Projects from "../instructor/Project-management/project";
import Reports from "../instructor/Reports/reports";
import Trainees from "../instructor/Trainee-management/trainee";

const Instructor_layout = () => {
  const [component, setComponent] = useState("HOME");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const updateState = (newState) => {
    setComponent(newState);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
        <div className=" w-screen flex flex-col bg-[#efebea]">
          <Navbar updateState={updateState} toggleSidebar={toggleSidebar} />
          <div className="w-full h-full flex">
            <Sidebar updateState={updateState} />
            {component === "HOME" && <Home sidebarOpen={sidebarOpen} />}
            {component === "TEAMS" && <Teams />}
            {component === "TRAINEES" && <Trainees/>}
            {component === "TASKS" && <Tasks />}
            {component === "PROJECTS" && <Projects />}
            {component === "REPORTS" && <Reports />}
          </div>
        </div>
    </div>
  );
}

export default Instructor_layout;
