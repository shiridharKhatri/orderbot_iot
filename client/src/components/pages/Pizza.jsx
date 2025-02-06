import React from "react";

export default function Pizza({ toggleSidePanel, selectItem }) {
  // Pizza data array
  const pizzas = [
    {
      id: 1,
      name: "Margherita",
      description: "Tomato, mozzarella, basil",
      price: 8.5,
      images: "/image/pizza/Margherita.png",
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Pepperoni, mozzarella, tomato sauce",
      price: 9.0,
      images: "/image/pizza/Pepperoni.png",
    },
    {
      id: 3,
      name: "Vegetarian",
      description: "Mushrooms, bell peppers, onions, olives",
      price: 7.5,
      images: "/image/pizza/Vegetarian.png",
    },
  ];

  return (
    <div className="mt-16">
      <div>
        <span className="font-bold text-2xl md:text-4xl">Pizza</span>
      </div>

      <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 gap-16">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg item"
            onClick={() => {
              selectItem(pizza);
              toggleSidePanel();
            }}
          >
            <img
              src={pizza.images}
              alt={pizza.name}
              className="w-full transform hover:scale-90 transition duration-300"
            />
            <div className="m-3 text-center">
              <span className="font-bold text-xl">{pizza.name}</span>
              <span className="block text-gray-600 text-sm">
                {pizza.description}
              </span>
              <span className="block text-[#ff6864] mt-10 font-bold text-3xl">
                ${pizza.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
