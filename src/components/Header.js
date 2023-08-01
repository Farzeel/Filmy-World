import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Appstate } from '../App';
import LoginIcon from '@mui/icons-material/Login';


const Header = () => {
  const useApp = useContext(Appstate)
  
  return (
   <div className='header sticky top-0 bg-black  z-10  text-3xl text-red-500 font-bold flex justify-between items-center  p-3 border-b-2 border-gray-500'>
       <Link to={"/"}><span>Filmy<span className=' text-white '>Verse</span></span></Link>
     {useApp.login? <Link to={"/addmovie"}><h1 className=' text-lg flex items-center text-white cursor-pointer '>
      <button  className=' hover:text-red-500 flex  items-center'><AddIcon  color='error'/ >
     Add New</button>  </h1></Link>
     :
     <Link to={"/login"}><h1 className=' text-lg flex items-center text-white cursor-pointer '>
      <button  className=' hover:text-red-500 flex   items-center'><LoginIcon className=' mr-1' color='primary'/ >
     Login</button>  </h1></Link>
     }
    </div>
  )
}

export default Header
