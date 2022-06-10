import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { useEffect } from 'react';
import { getCart, checkout } from '../features/cart/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  let emptyCart = !cartItems.length
  let defaultCheckoutClass = "button checkout"
  let checkoutClass = emptyCart ? `${defaultCheckoutClass} disabled` : defaultCheckoutClass
  return (
  <div className="cart">
    <h2>Your Cart</h2>
    { emptyCart ? <p>Your Cart is Empty</p> : (
    <table className="cart-items">
      <tbody>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {cartItems.map(item => <CartItem key={item.productId} item={item} />)}
        <tr>
          <td colSpan="3" className="total">Total: ${cartItems.reduce((acc, item) => (item.price * item.quantity) + acc, 0)}</td>
        </tr>
      </tbody>
    </table>
    )}
    <a className={checkoutClass} onClick={() => dispatch(checkout())}>Checkout</a>
  </div>
  )
}

export default Cart