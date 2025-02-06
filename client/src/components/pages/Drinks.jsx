import React from "react";

export default function Drinks({ toggleSidePanel, selectItem }) {
  const drinks = [
    {
      id: 1,
      name: "Mango Lassi",
      description: "Mango, yogurt, sugar",
      price: 3.5,
      images: "/image/drink/mangoLassi.png",
    },
    {
      id: 2,
      name: "Iced Latte",
      description: "Espresso, milk, ice",
      price: 4.0,
      images: "/image/drink/latte.png",
    },
    {
      id: 3,
      name: "Lemonade",
      description: "Lemon, sugar, water",
      price: 2.5,
      images: "/image/drink/lemon.png",
    },
  ];

  return (
    <div className="mt-16">
      <div>
        <span className="font-bold text-2xl md:text-4xl">Drinks</span>
      </div>

      <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 gap-16">
        {drinks.map((drink) => (
          <div
            key={drink.id}
            className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg item"
            onClick={() => {
              selectItem(drink);
              toggleSidePanel();
            }}
          >
            <img
              src={drink.images}
              alt={drink.name}
              className="w-full transform hover:scale-90 transition duration-300"
            />
            <div className="m-3 text-center">
              <span className="font-bold text-xl">{drink.name}</span>
              <span className="block text-gray-600 text-sm">
                {drink.description}
              </span>
              <span className="block text-[#ff6864] mt-10 font-bold text-3xl">
                ${drink.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
