import React,{useContext} from 'react'
import {StoreContext} from '../../context/StoreContex'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
export default function PlaceOrder() {
  
  const {currensy,cartTotalCartAmount,DeliveryFee} = useContext(StoreContext)
  console.log("these is ");
  
  console.log(cartTotalCartAmount);
  return (
    // <div className="placeorder">
    //   <h1>Place Order</h1>
      <form className="place-order">
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
              <div className="multi-fields">
                <input type="text" placeholder='First Name' />
                <input type="text" placeholder='Last Name' />
              </div>
            <input type="text" placeholder='Email Address'/>
            <input type="text" placeholder='Street'/>
              <div className="multi-fields">
                <input type="text" placeholder='City'/>
                <input type="text"  placeholder='State'/>
              </div>
              <div className="multi-fields">
                <input type="text" placeholder='Zip Code'/>
                <input type="text"  placeholder='Country'/>
              </div>
            <input type="text" placeholder='phone'/>
        </div>


        {/* place order place s */}
        <div className="place-order-right">
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
                  <button > Proceed To CheckOut</button>
            </div>
        </div>
      </form>
    // </div>
  )
}
