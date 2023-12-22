import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import { AiOutlineMail } from "react-icons/ai";

const Header = () => {
  return (
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-start w-full mx-auto h-14 bg-[#efebea] z-50 shadow-2xl ">
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{ x: 0, opacity: 1, scale: 1}}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-row items-center h-14"
        >
          <SocialIcon
            url="https://pk.linkedin.com/in/muhammad-bilawal-zaman-61404958"
            fgColor="gray"
            bgColor="transparent"
          />
          <SocialIcon url="https://twitter.com/rider_lucky" fgColor="gray" bgColor="transparent" />
          <SocialIcon url="https://www.facebook.com/riderlucky/" fgColor="gray" bgColor="transparent" />
          <SocialIcon url="https://www.youtube.com" fgColor="gray" bgColor="transparent" />
        </motion.div>

        <a href="#contact">
          <motion.div
            initial={{
              x: 500,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-row items-center text-gray-600 cursor-pointer h-14 pr-6"
          >
            <AiOutlineMail />
            <p className="uppercase hidden md:inline-flex text-sm text-gray-600 pl-4">Get in Touch</p>
          </motion.div>
        </a>
      </nav>
  );
};

export default Header;