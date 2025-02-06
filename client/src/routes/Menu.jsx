import React, { useState, useEffect } from "react";
import { FaLongArrowAltLeft, FaShoppingBasket, FaTimes } from "react-icons/fa";
import Nav from "../components/Nav";
import Burger from "../components/pages/Burger";
import Salad from "../components/pages/Salad";
import Pizza from "../components/pages/Pizza";
import Drinks from "../components/pages/Drinks";
import { createOrder } from "../api/order";
import { useParams } from "react-router-dom";
import TableStatus from "../components/pages/Tables";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState("salad");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // Success or Failure status

  const { id } = useParams();

  const menuVal = (val) => {
    setSelectedVal(val);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
    calculateTotal(savedCart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total.toFixed(2));
  };

  const addToCart = (item) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    setSidePanelOpen(!sidePanelOpen);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      const updatedCart = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
    }
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    toggleSidePanel();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCartPanel = () => {
    setCartOpen(!cartOpen);
  };

  const toggleSidePanel = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  const orderConfirm = async () => {
    setLoading(true);
    let order = {
      food: cartItems,
      tableNumber: Number(id),
    };

    try {
      const response = await createOrder(order);
      console.log(response);
      if (response.success) {
        setOrderStatus("success");
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
        setTotalAmount(0);
      } else {
        setOrderStatus("failure");
      }
    } catch (error) {
      setOrderStatus("failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-6 px-4 md:px-10 grid lg:grid-cols-5 pb-20 bg-gray-100 text-gray-900">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Success/Failure Popup */}
      {orderStatus && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96">
            {orderStatus === "success" ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600">
                  Order Successful!
                </h2>
                <p className="mt-4 text-gray-700">
                  Your order has been placed successfully.
                </p>
                <button
                  className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg"
                  onClick={() => setOrderStatus(null)} // Close the popup
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600">
                  Order Failed!
                </h2>
                <p className="mt-4 text-gray-700">
                  There was an issue with your order. Please try again.
                </p>
                <button
                  className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={() => setOrderStatus(null)} // Close the popup
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <div
          className="bg-black opacity-50 fixed top-0 left-0 right-0 bottom-0 z-20"
          onClick={toggleMenu}
        ></div>
      )}

      <Nav menuOpen={menuOpen} toggleMenu={toggleMenu} menuVal={menuVal} />

      <main className="lg:col-span-4">
        <div className="flex mb-4 flex-col w-full">
          <div className="tableNumber bg-[#ffffff] py-[.5rem] px-[1rem] rounded-[.5rem] font-bold mb-[15px]">
            Table number {id}
          </div>
          <div className="flex w-100 justify-between">
            <a
              href="index.html"
              className="rounded-full bg-gray-200 py-2 px-6 flex items-center"
            >
              <FaLongArrowAltLeft />
            </a>
            <button
              className="font-bold rounded-full bg-white py-2 px-3 shadow cart flex items-center gap-2"
              onClick={toggleCartPanel}
            >
              <FaShoppingBasket /> {cartItems.length} items - ${totalAmount}
            </button>
          </div>
        </div>

        <div className="mt-6">
          {selectedVal === "salad" && (
            <Salad
              toggleSidePanel={toggleSidePanel}
              addToCart={addToCart}
              selectItem={selectItem}
            />
          )}
          {selectedVal === "burger" && (
            <Burger
              toggleSidePanel={toggleSidePanel}
              addToCart={addToCart}
              selectItem={selectItem}
            />
          )}
          {selectedVal === "pizza" && (
            <Pizza
              toggleSidePanel={toggleSidePanel}
              addToCart={addToCart}
              selectItem={selectItem}
            />
          )}
          {selectedVal === "drink" && (
            <Drinks
              toggleSidePanel={toggleSidePanel}
              addToCart={addToCart}
              selectItem={selectItem}
            />
          )}
          {selectedVal === "table" && <TableStatus />}
        </div>
      </main>

      <aside
        className={`transform top-0 right-0 w-full md:w-2/5 shadow-2xl bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="cart-panel"
      >
        <div className="p-4 md:p-8">
          <button
            className="bg-gray-200 py-2 px-6 rounded-full"
            onClick={toggleCartPanel}
          >
            <FaTimes />
          </button>
          <main className="text-center font-bold">
            <FaShoppingBasket className="fa-3x mx-auto mt-10" />
            <table className="table-auto mx-auto mt-10 w-full md:w-auto">
              <thead>
                <tr>
                  <th className="px-2 py-2">Item</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-2 py-1">{item.name}</td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        value={item.quantity}
                        min="0"
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-12 text-center"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="border px-2 py-1">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 font-bold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 text-lg">
              Total: <span className="text-[#ff6864]">${totalAmount}</span>
            </div>
            <button
              onClick={orderConfirm}
              className="rounded-lg bg-[#ff6864] px-4 py-2 font-bold m-auto mt-[35px] w-[60%] flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
              ) : (
                "Order & Pay"
              )}
            </button>
          </main>
        </div>
      </aside>

      <aside
        className={`transform top-0 right-0 w-full md:w-2/5 shadow-2xl bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          sidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="side-panel"
      >
        <div className="p-4 md:p-8">
          <button
            className="bg-gray-200 py-2 px-6 rounded-full"
            onClick={toggleSidePanel}
          >
            <FaTimes />
          </button>
          <main className="text-center">
            {selectedItem && (
              <>
                <img
                  src={selectedItem.images}
                  alt={selectedItem.name}
                  className="w-48 md:w-56 mx-auto mt-16 mb-8"
                />
                <span className="font-bold text-2xl">{selectedItem.name}</span>
                <span className="block text-gray-600 text-sm">
                  {selectedItem.description}
                </span>
                <span className="block text-[#ff6864] mt-6 font-bold text-2xl">
                  ${selectedItem.price}
                </span>
                <span className="block mt-8">
                  <input
                    type="text"
                    className="rounded-lg bg-gray-200 p-2"
                    placeholder="Add a note.."
                  />
                </span>

                <button
                  className="rounded-lg bg-[#ff6864] px-4 py-2 font-bold mt-6"
                  onClick={() => addToCart(selectedItem)}
                >
                  Add to Order
                </button>
              </>
            )}
          </main>
        </div>
      </aside>
    </div>
  );
};

export default Menu;
