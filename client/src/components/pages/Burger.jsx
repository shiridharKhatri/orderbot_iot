import React from "react";

export default function Burger({ toggleSidePanel, selectItem }) {
  // Burger data array
  const burgers = [
    {
      id: 1,
      name: "Bacon Jammer",
      description: "bacon, iceberg, mayo",
      price: 3.5,
      images: "/image/burger/bacon.png",
    },
    {
      id: 2,
      name: "Cheeseburger Deluxe",
      description: "cheese, lettuce, tomato, pickles",
      price: 4.0,
      images: "/image/burger/cheese.png",
    },
    {
      id: 3,
      name: "BBQ Chicken Burger",
      description: "grilled chicken, BBQ sauce, lettuce",
      price: 5.0,
      images: "/image/burger/bbq.png",
    },
  ];
  return (
    <div className="mt-16">
      <div>
        <span className="font-bold text-2xl md:text-4xl">Burgers</span>
      </div>

      <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 gap-16">
        {burgers.map((burger) => (
          <div
            key={burger.id}
            className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg item"
            onClick={() => {
              selectItem(burger);
              toggleSidePanel();
            }}
          >
            <img
              src={burger.images}
              alt={burger.name}
              className="w-full transform hover:scale-90 transition duration-300"
            />
            <div className="m-3 text-center">
              <span className="font-bold text-xl">{burger.name}</span>
              <span className="block text-gray-600 text-sm">
                {burger.description}
              </span>
              <span className="block text-[#ff6864] mt-10 font-bold text-3xl">
                ${burger.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
