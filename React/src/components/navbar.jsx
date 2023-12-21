import { useState } from "react";
import { CgMenuCheese } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleNavbar = () => {
    setOpen(!isOpen);
  };

  const navLinks = [
    {
      name: "Home",
      link: "/#home",
    },
    {
      name: "Services",
      link: "/#services",
    },
    {
      name: "Testimonials",
      link: "/#testimonials",
    },
    {
      name: "Team",
      link: "/#team",
    },
  ];

  return (
    <nav className="text-black bg-[#efebea] shadow-2xl sticky top-0   flex flex-col lg:flex-row lg:justify-center items-center rounded-md justify-around my-auto p-2 md:py-3 md:m-3">
      <div className="flex flex-row justify-between w-full">
        <div className="w-36 md:w-52 my-auto"></div>
        <div
          className="visible my-auto lg:invisible p-2 text-xl text-gray-800 rounded-sm hover:bg-gray-100 active:bg-turbo-gray-100 cursor-pointer"
          onClick={toggleNavbar}
        >
          {!isOpen ? <CgMenuCheese /> : <GrClose />}
        </div>
      </div>
      <div
        className={`${
          !isOpen ? "hidden" : "z-20"
        } flex flex-col lg:hidden ml-1 md:justify-between my-8 md:my-10 mx-auto space-y-4 font-semibold`}
      >
        {navLinks.map((item) => (
          <div key={item.name} className="hover:underline">
            <a href={item.link}>
              {item.name}
            </a>
          </div>
        ))}
        <div className="block lg:hidden">
          <a href="/#contact" className="">
            {/* Replace MyBtn with your button component */}
            <button>Contact</button>
          </a>
        </div>
      </div>
      <div className="hidden lg:flex flex-row justify-around space-y-0 space-x-6 lg:space-x-10 font-semibold">
        {navLinks.map((item) => (
          <div key={item.name} className="hover:underline my-auto">
            <a href={item.link}>
              {item.name}
            </a>
          </div>
        ))}
      </div>
      <div className="hidden lg:flex ml-6">
        <a href="/#contact" className="">
          {/* Replace MyBtn with your button component */}
          <button>Contact</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
