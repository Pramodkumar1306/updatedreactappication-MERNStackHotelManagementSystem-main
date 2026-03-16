import React ,{useState } from 'react'
import './Home.css'

import Headers from '../../components/Header/Header'
import ExploeMenu from '../../components/ExploreMenue/ExploeMenu'  
import FoodDisplay from '../../components/foodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

export default function Home() {
    const [category,setCategory]=  useState('All')
    return (
        <div>
            <Headers/>
            <ExploeMenu category={category} setCategory={setCategory}/>
            <FoodDisplay category={category}/>
            <AppDownload/>
        </div>
    )
}
