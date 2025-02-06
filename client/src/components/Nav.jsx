import React, { useState } from "react";
import { FaCarrot, FaHamburger, FaPizzaSlice, FaBeer, FaBars, FaTimes } from "react-icons/fa";
import { PiArmchairFill } from "react-icons/pi";

const Nav = ({ menuVal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("salad");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle mobile menu visibility
  };

  const handleMenuClick = (val) => {
    menuVal(val);
    setActiveItem(val); // Set active item when clicked
    setMenuOpen(false); // Close menu after selection on mobile
  };

  return (
    <div className="lg:col-span-1">
      <nav>
        <div className="flex justify-between mb-6 px-2 md:mb-16">
          <h1 className="font-bold uppercase">
            <a href="/" className="text-xl">
              Order <span className="text-[#ff6864] font-bold">Bot</span>
            </a>
          </h1>
          {/* Hamburger Menu Icon for Mobile */}
          <div
            className="px-4 cursor-pointer lg:hidden"
            id="open-menu"
            onClick={toggleMenu}
          >
            <FaBars className="text-2xl" /> {/* Hamburger icon */}
          </div>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`lg:hidden block absolute top-0 left-0 w-full bg-white p-4 transition-all duration-300 ease-in-out z-20 ${
            menuOpen ? "block" : "hidden"
          }`}
          id="menu"
        >
          <div className="flex justify-end">
            {/* Close button for mobile menu */}
            <div
              className="text-3xl cursor-pointer"
              onClick={toggleMenu}
            >
              <FaTimes />
            </div>
          </div>

          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "salad" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("salad")}
            >
              <FaCarrot className="mr-2" />
              <span>Salads</span>
            </div>
          </li>
          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "burger" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("burger")}
            >
              <FaHamburger className="mr-2" />
              <span>Burgers</span>
            </div>
          </li>
          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "pizza" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("pizza")}
            >
              <FaPizzaSlice className="mr-2" />
              <span>Pizza</span>
            </div>
          </li>
          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "drink" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("drink")}
            >
              <FaBeer className="mr-2" />
              <span>Drinks</span>
            </div>
          </li>
          <div className="mt-12">
            <span className="px-3 text-gray-500">Other</span>
            <li className="my-3">
              <div
                className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex gap-[.5rem]  ${
                  activeItem === "table" ? "bg-[#ff6864]" : ""
                }`}
                onClick={() => handleMenuClick("table")}
              >
                <PiArmchairFill className="text-2xl" />
                <span>Available Seats</span>
              </div>
            </li>
          </div>
        </ul>

        {/* Desktop Menu */}
        <ul className="hidden lg:block mr-10 mb-10" id="menu">
          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "salad" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("salad")}
            >
              <FaCarrot className="mr-2" />
              <span>Salads</span>
            </div>
          </li>
          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "burger" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("burger")}
            >
              <FaHamburger className="mr-2" />
              <span>Burgers</span>
            </div>
          </li>
          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "pizza" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("pizza")}
            >
              <FaPizzaSlice className="mr-2" />
              <span>Pizza</span>
            </div>
          </li>
          <li className="my-3">
            <div
              className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex items-center cursor-pointer ${
                activeItem === "drink" ? "bg-[#ff6864]" : ""
              }`}
              onClick={() => handleMenuClick("drink")}
            >
              <FaBeer className="mr-2" />
              <span>Drinks</span>
            </div>
          </li>

          <div className="mt-12">
            <span className="px-3 text-gray-500">Other</span>
            <li className="my-3 cursor-pointer ">
              <div
                className={`rounded-lg py-2 px-3 text-md tracking-wider font-bold flex gap-[.5rem]  ${
                  activeItem === "table" ? "bg-[#ff6864]" : ""
                }`}
                onClick={() => handleMenuClick("table")}
              >
                <PiArmchairFill className="text-2xl" />
                <span>Available Seats</span>
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
