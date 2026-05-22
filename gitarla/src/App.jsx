import Guitar from "./components/GuitarComponent";
import Header from "./components/HeaderComponent";
import { Toast } from "./components/toast/Toast";
import { useCart } from "./hooks/useCart";

function App() {

  const {
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
  } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        totalPrice={totalPrice}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>


      <div className="toast-container">
        {showToast.visible && (
          <Toast
            type={showToast.type}
            message={showToast.message}
            duration={showToast.duration}
            onClose={() =>
              setShowToast({ visible: false, message: "", duration: 3000 })
            }
          />
        )}
      </div>

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
