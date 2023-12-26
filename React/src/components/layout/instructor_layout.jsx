import { useState } from "react";
import React from 'react'
import Navbar from '../instructor/navbar'
import Sidebar from '../instructor/sidebar'
import Home from "../instructor/home";
import Teams from "../instructor/Team-management/teams";
import Trainees from "../instructor/Trainee-management/trainee";
import Tasks from "../instructor/Project-management/tasks";
import Projects from "../instructor/Project-management/project";


const Instructor_layout = () => {
    const [component, setComponent] = useState("HOME");

  const updateState = (newState) => {
    setComponent(newState);
  };


  return (
    <div>
    <Navbar/>
    <Sidebar updateState={updateState} />
          {component == "HOME" && <Home />}
          {component == "TEAMS" && <Teams />}
         {component == "TRAINEE" && <Trainees />} 
          {component == "TASKS" && <Tasks />}
          {component == "PROJECTS" && <Projects />} 
    <div className='h-screen'></div>
    </div>
  )
}

export default Instructor_layout
