import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets' 

export default function ExploeMenu({category,setCategory}) {
    // console.log(category);
    

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1 >Explore Our Menu</h1>
            <p className='explore-menu-text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit doloremque soluta vitae quasi tempora amet aliquid voluptas voluptatum ratione porro.</p>
            <div className="explore-menu-list">
                {menu_list.map((item,index) => {
                    return (
                        <div key={item.menu_name} onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} className="explore-menu-list-item">
                            <img className={category === item.menu_name? "active": ''} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
    }
