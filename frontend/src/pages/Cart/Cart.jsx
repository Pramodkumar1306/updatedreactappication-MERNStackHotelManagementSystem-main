import React, { useContext } from 'react'
import {StoreContext} from '../../context/StoreContex'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
 const {cartItems,food_list, removeFromCart,currensy,cartTotalCartAmount,DeliveryFee} = useContext(StoreContext)
  const navigate = useNavigate();
  console.log(cartItems)
  // console.log(food_list)

  console.log("Data coming from cart.jsx"  )
  // console.log(removeFromCart  )
  return (
    <>
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
      </div>
      {
  food_list.map((item,index) => {
    if(cartItems[item.id] > 0){
      return(
        <div key={item.id}>
          <div className="cart-items-title cart-items-item">
            <img src={item.image_url} alt={item.name} className="cart-img" />
            <p>{item.name}</p>
            <p>{currensy} {item.price}</p>
            <p>{cartItems[item.id]}</p>
            <p>{currensy} {item.price * cartItems[item.id]}</p>
            <p onClick={() => removeFromCart(item.id)} className='cross'>X</p>
          </div>
          <hr/>
        </div>
      )
    }
  })
}
    </div>
    <div className="cart-bottom">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{currensy} {cartTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{currensy} {cartTotalCartAmount() === 0 ? 0 : DeliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{currensy} {(cartTotalCartAmount()) +( cartTotalCartAmount() === 0 ? 0 : DeliveryFee)}</b>
            </div>
          </div>
            <button onClick={() => navigate('/order')}> Proceed To CheckOut</button>
      </div>
      <div className="cart-promocode">
        <div className="">
          <p>If You Have Promo Code, Enter Here</p>
          <div className="cart-promocode-input">
          <input className='cart-promocode-input-input' type="text" placeholder='Promo Code' />
          <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
