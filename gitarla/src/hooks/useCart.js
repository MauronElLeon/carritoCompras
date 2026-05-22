import { useState, useEffect, useMemo } from 'react';
import guitarsData from "../api/guitars.json";

export const useCart = () => {
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [guitars] = useState(guitarsData.guitars);
  const [cart, setCart] = useState(initialCart);
  const [showToast, setShowToast] = useState({
    type: "info",
    visible: false,
    message: "",
  });

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemExists !== -1) {
      if (cart[itemExists].quantity >= MAX_QUANTITY) {
        setShowToast({
          type: "error",
          visible: true,
          message: `No puedes agregar más de ${MAX_QUANTITY} unidades de este producto.`,
          duration: 5000,
        });
        return;
      }
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
      return;
    } else {
        setShowToast({
          type: "success",
          visible: true,
          message: `Producto agregado al carrito.`
        });
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(itemId) {
    setCart(cart.filter((item) => item.id !== itemId));
  }

  function increaseQuantity(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity >= MAX_QUANTITY) {
        setShowToast({
          type: "error",
          visible: true,
          message: `No puedes agregar más de ${MAX_QUANTITY} unidades de este producto.`,
          duration: 5000,
        });
        return;
      }
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
  }

  function decreaseQuantity(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity <= MIN_QUANTITY) {
        setShowToast({
          type: "error",
          visible: true,
          message: `No puedes tener menos de ${MIN_QUANTITY} unidades de este producto.`,
          duration: 5000,
        });
        return;
      }
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity--;
      setCart(updatedCart);
    }
  }

  function clearCart() {
    setCart([]);
  }


  //const isEmpty = () => cart.length === 0;
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const totalPrice = useMemo(() => cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0), [cart]);

  return {
    guitars,
    cart,
    showToast,
    setShowToast,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    totalPrice
  }
}