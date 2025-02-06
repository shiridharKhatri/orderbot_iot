import React, { useState } from "react";
import {
  FaCarrot,
  FaHamburger,
  FaPizzaSlice,
  FaCocktail,
  FaIceCream,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../styles/App.css"; // Assuming you use this file for custom styles
import TableStatus from "../components/pages/Tables";

const Root = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-[#F5F5F5] font-body">
      {/* Header */}
      <header className="bg-[#2A2A2A] p-8 text-white rounded-b-3xl shadow-lg h-[20rem]">
        <div className="container mx-auto flex justify-between items-center w-full">
          <div className="font-bold text-3xl sm:text-4xl">
            <a href="index.html" className="text-white">
              Order <span className="text-[#FF6F61] font-extrabold">Bot</span>
            </a>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
          </div>

          {/* Navbar */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex sm:flex-row sm:space-x-8 font-semibold mt-4 sm:mt-0`}
          >
            <a href="#home" className="text-white hover:text-[#1ABC9C] py-2">
              Home
            </a>
            <a href="#order" className="text-white hover:text-[#1ABC9C] py-2">
              Order
            </a>
            <a
              href="#available-table"
              className="text-white hover:text-[#1ABC9C] h-[3rem] px-4 py-2 bg-[#FF6F61] rounded-full cursor-pointer"
            >
              Available Table
            </a>
          </nav>
        </div>
        <div className="mt-12 sm:mt-20 text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
          <h1>Discover the joy of food 🍽️</h1>
        </div>
      </header>

      {/* Order Section */}
      <section id="order" className="py-16 sm:py-20 text-center">
        <h2 className="font-bold text-3xl sm:text-5xl text-[#2A2A2A] mb-12">
          Restaurant Table Status
        </h2>
        <TableStatus />
      </section>
    </div>
  );
};

const OrderItem = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center space-y-4 transform hover:scale-105 transition-all"
    >
      <div className="bg-[#2A2A2A] rounded-xl w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] mx-auto flex items-center justify-center shadow-lg transform hover:scale-110 transition-all">
        {icon}
      </div>
      <span className="text-lg sm:text-xl font-semibold text-[#2A2A2A]">
        {label}
      </span>
    </a>
  );
};

export default Root;
