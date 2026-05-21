import { useState, useEffect } from "react";
import Guitar from "./components/GuitarComponent";
import Header from "./components/HeaderComponent";
import guitarsData from "./api/guitars.json";

function App() {

  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [guitars] = useState(guitarsData.guitars);
  const [cart, setCart] = useState(initialCart);

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {

    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemExists !== -1) {
      if (cart[itemExists].quantity >= MAX_QUANTITY) {
        alert(`No puedes agregar más de ${MAX_QUANTITY} unidades de este producto.`);
        return;
      }
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
      return;
    } else {
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
        alert(`No puedes agregar más de ${MAX_QUANTITY} unidades de este producto.`);
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
        alert(`No puedes tener menos de ${MIN_QUANTITY} unidades de este producto.`);
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
