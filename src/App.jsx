import { useState } from 'react'
import './App.css'
import HomeScreen from './components/homeScreen'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='h-full w-full'>

        <Outlet/>
    </div>
    </>
  )
}

export default App
