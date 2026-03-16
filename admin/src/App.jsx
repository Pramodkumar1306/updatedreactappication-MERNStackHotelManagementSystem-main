import React from 'react'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/sideBar/SideBar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Addproduct/Add'
import List from './pages/List/List'
import Order from './pages/orders/Order'

export default function App() {
  return (
    <div>
      
      <NavBar/>
      <hr/>
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path='/add' element ={<Add/>} />
          <Route path='/list' element ={<List/>} />
          <Route path='/order' element ={<Order/>} />
        </Routes>

      </div>
    </div>
  )
}
