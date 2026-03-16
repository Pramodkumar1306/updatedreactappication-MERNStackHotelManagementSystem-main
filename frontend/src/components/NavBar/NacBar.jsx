import React,{useContext} from 'react'
import './Navbar.css'
import {StoreContext} from '../../context/StoreContex'
import {assets} from '../../assets/assets'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function NacBar({setShowLogin}) {
    const navigator = useNavigate()
    const {cartTotalCartAmount} = useContext(StoreContext);
    const [menu,setMenu] = useState('home');
    return (
        <div className='navbar'>
            <img onClick={() => navigator('/')} src={assets.logo} alt="" className='logo'/>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu('home')}       className={menu === 'home' ? 'active' : ''}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu('menu')}       className={menu === 'menu' ? 'active' : ''}>menu</a>
                <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>menu-app</a>
                <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact_us</a>
            </ul>
            <div className="varbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={cartTotalCartAmount()? "dot" : ""}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    )
    }
