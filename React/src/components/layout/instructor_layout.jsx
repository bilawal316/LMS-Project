import { useState } from "react";
import React from 'react'
import Navbar from '../instructor/navbar'
import Sidebar from '../instructor/sidebar'
import Home from "../instructor/home";
import Teams from "../instructor/Team-management/teams";

const Instructor_layout = () => {
    const [component, setComponent] = useState("HOME");

  const updateState = (newState) => {
    setComponent(newState);
  };


  return (
    <div>
    <Navbar/>
    <Sidebar updateState={updateState} />
          {/* {component == "HOME" && <Home />} */}
          {component == "TEAMS" && <Teams />}
          {/* {component == "TRAINEES" && <Trainees />}
          {component == "TASKS" && <Tasks />}
          {component == "PROJECTS" && <Projects />} */}
    <div className='h-screen'></div>
    </div>
  )
}

export default Instructor_layout
