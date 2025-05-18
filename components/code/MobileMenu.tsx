"use client";

import { IoMenu } from "react-icons/io5";
import React, { useState } from "react";
import SideMenu from "./SideMenu";

const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex justify-center items-center">
      <div onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <IoMenu
          className=" cursor-pointer md:hidden md:gap-0 hoverEffect"
          size={30}
        />
        <div className="md:hidden">
          <SideMenu>
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          </SideMenu>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
