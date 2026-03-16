
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoredContextProvide = (props) => {

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItem] = useState({});

  const currensy = "₹";
  const DeliveryFee = 20;
  const userId = "user1";   // Temporary user id

  // -------------------------
  // Fetch products
  // -------------------------
  const fetchFoodList = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      setFoodList(data);
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------
  // Load cart from backend (Cosmos)
  // -------------------------
  const loadCartData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/cart/${userId}`);
      const data = await response.json();

      let cartData = {};

      data.forEach((item) => {
        cartData[item.productId] = item.quantity;
      });

      setCartItem(cartData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodList();
    loadCartData();  // load cart when page loads
  }, []);

  // -------------------------
  // Add to cart
  // -------------------------
  const addToCart = async (itemId) => {

    let updatedCart = { ...cartItems };

    if (!updatedCart[itemId]) {
      updatedCart[itemId] = 1;
    } else {
      updatedCart[itemId] += 1;
    }

    setCartItem(updatedCart);

    try {
      await fetch("http://localhost:4000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          productId: itemId,
          quantity: updatedCart[itemId]
        })
      });
    } catch (error) {
      console.log(error);
    }

  };

  // -------------------------
  // Remove from cart
  // -------------------------
  const removeFromCart = async (itemId) => {

    let updatedCart = { ...cartItems };

    updatedCart[itemId] -= 1;

    if (updatedCart[itemId] <= 0) {
      delete updatedCart[itemId];
    }

    setCartItem(updatedCart);

    try {
      await fetch("http://localhost:4000/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          productId: itemId
        })
      });
    } catch (error) {
      console.log(error);
    }

  };

  // -------------------------
  // Cart total
  // -------------------------
  const cartTotalCartAmount = () => {

    let totalAmount = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        let itemInfo = food_list.find(
          (product) => product.id === Number(item)
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }

      }

    }

    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    currensy,
    cartTotalCartAmount,
    DeliveryFee
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );

};

export default StoredContextProvide;

