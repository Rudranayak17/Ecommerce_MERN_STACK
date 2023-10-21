import "./cart.css";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsCart } from "../../actions/cartAction";
import { RemoveShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navgate=useNavigate()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
const deleteCartItems=(id) => {
dispatch(removeItemsCart(id));
}
const checkoutHandler=()=>{
  const login="/login"
  navgate(`${login}?redirect=/shipping`)
}
  return (
    <>
        {cartItems.length===0?(
            <div className="emptyCart">
<RemoveShoppingCart/>
<Typography>No Product in Cart</Typography>
<Link to={"/products"}>View Products</Link>
            </div>
        ):(
            <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cartItems &&
          cartItems.map((item) => (
            <div key={item.product} className="cartContainer">
              <CartItemCard deleteCartItems={deleteCartItems} item={item} />
              <div className="cartInput">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                >
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}

        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce(
              (acc, item) =>acc +item.quantity*item.price,0
            )}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkoutHandler }>Check Out</button>
          </div>
        </div>
      </div>
    </>
        )}
    </>
  );
};
export default Cart;
