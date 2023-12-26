import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { AiOutlineProject } from "react-icons/ai";
import { GrTask } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";




const Sidebar = (updateState) => {

    const [open, setOpen] = useState(true);
    
    return (
        <div className="flex fixed">
      <div
        className={` ${open ? "w-50" : "w-20 "} bg-[#efebea] h-screen p-5 pt-8 relative duration-300`}
      >
        <FaArrowLeft
          className={`text-purple-700 absolute cursor-pointer -right-3 top-9 w-5 text-purple-x7-- ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src="/lms-logo.png" 
            alt=""
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"} bg-transparent`}
            style={{ width: open ? "20px" : "30px", height: "20px" }}
          />
          <h1
            className={`text-purple-700 origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
          >
            ProjecTech
          </h1>
                </div>
                <ul className="pt-6">
                    {/* Manual menu items without using the array */}
                    <li className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-purple-700 text-sm items-center gap-x-4 mt-2`} onClick={() => {
                        void updateState.updateState("HOME")
                    }}>                        <MdOutlineDashboard />

                        <span className={`${!open && "hidden"} origin-left duration-200`}>Home</span>
                    </li>
                    <li className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-purple-700 text-sm items-center gap-x-4 mt-2`} onClick={() => {
                        void updateState.updateState("TEAMS")
                    }}>
                    <TbUsersGroup />
                        <p className={`${!open && "hidden"} origin-left duration-200`} 
                       > Teams</p>
                    </li>
                    <li className={`flex text rounded-md p-2 cursor-pointer hover:bg-light-white text-purple-700 text-sm items-center gap-x-4 mt-2`} onClick={() => {
                        void updateState.updateState("PROJECTS")
                    }}>                       <AiOutlineProject />

                        <span className={`${!open && "hidden"} origin-left duration-200`}>Projects</span>
                    </li>
                    <li className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-purple-700 text-sm items-center gap-x-4 mt-2`} onClick={() => {
                        void updateState.updateState("TASKS")
                    }}>                       <GrTask />

                        <span className={`${!open && "hidden"} origin-left duration-200`}>Tasks</span>
                    </li>
                </ul>
                
            </div>
        </div>
    );
};

export default Sidebar;
