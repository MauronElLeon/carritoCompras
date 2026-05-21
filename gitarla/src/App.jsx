import { useState, useEffect } from "react";
import Guitar from "./components/GuitarComponent";
import Header from "./components/HeaderComponent";
import guitarsData from "./api/guitars.json";

function App() {

  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [guitars, setGuitars] = useState(guitarsData.guitars);
  const [cart, setCart] = useState(initialCart);

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {

    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemExists !== -1) {
      if (cart[itemExists].quantity >= MAX_QUANTITY) return;
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
      console.log(`La guitarra ${item.name} ya está en el carrito`);
      return;
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
      console.log(`Guitarra ${item.name} agregada al carrito`);
    }
  }

  function removeFromCart(itemId) {
    setCart(cart.filter((item) => item.id !== itemId));
    console.log(`Guitarra con id ${itemId} eliminada del carrito`);
  }

  function increaseQuantity(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1 && cart[itemIndex].quantity < MAX_QUANTITY) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
      console.log(`Cantidad de guitarra con id ${itemId} aumentada`);
    }
  }

  function decreaseQuantity(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1 && cart[itemIndex].quantity > MIN_QUANTITY) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity--;
      setCart(updatedCart);
      console.log(`Cantidad de guitarra con id ${itemId} disminuida`);
    }
  }

  function clearCart() {
    setCart([]);
    console.log("Carrito vaciado");
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar 
              key={guitar.id} 
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
