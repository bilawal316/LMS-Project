import { useState } from "react";
import React from 'react'
import Navbar from '../traineee/navbar'
import Sidebar from '../traineee/sidebar'
import Home from "../traineee/home";
import Teams from "../traineee/Team-view/teams";
import Tasks from "../traineee/Project-view/task";
import Projects from "../traineee/Project-view/project";


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
          {component == "TASKS" && <Tasks />}
          {component == "PROJECTS" && <Projects />} 
    <div className='h-screen'></div>
    </div>
  )
}

export default Instructor_layout
