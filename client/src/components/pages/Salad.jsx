import React from "react";

export default function Salad({ toggleSidePanel, selectItem }) {
  // Salad data array
  const salads = [
    {
      id: 1,
      name: "Fruit Salad",
      description: "Mango, Orange, Passion fruit",
      price: 6.3,
      images: "/image/salad/fruit.png",
    },
    {
      id: 2,
      name: "Vegetable Salad",
      description: "Lettuce, Carrot, Cucumber",
      price: 5.5,
      images: "/image/salad/vegetable.png",
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Romaine, Croutons, Caesar Dressing",
      price: 7.9,
      images: "/image/salad/caesar.png",
    },
  ];

  return (
    <div className="mt-16">
      <div>
        <span className="font-bold text-2xl md:text-4xl">Salads</span>
      </div>

      <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 gap-16">
        {salads.map((salad) => (
          <div
            key={salad.id}
            className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg item"
            onClick={() => {
              selectItem(salad);
              toggleSidePanel();
            }}
          >
            <img
              src={salad.images}
              alt={salad.name}
              className="w-full transform hover:scale-90 transition duration-300 rounded"
            />
            <div className="m-3 text-center">
              <span className="font-bold text-xl">{salad.name}</span>
              <span className="block text-gray-600 text-sm">
                {salad.description}
              </span>
              <span className="block text-[#ff6864] mt-10 font-bold text-3xl">
                ${salad.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
