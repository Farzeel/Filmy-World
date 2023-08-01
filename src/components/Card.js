import React from 'react'
import { useState,useEffect } from 'react'
import ReactStars from 'react-stars'
import { movieRef } from "../firebase/Firebase";
import { getDocs } from "firebase/firestore";
import {TailSpin} from "react-loader-spinner"
import { Link } from 'react-router-dom';

const Card = () => {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        async function getData(){
          setloading(true)
         const info  = await getDocs(movieRef)
         info.forEach((doc)=>{
          setdata((prev)=>[...prev,{...(doc.data()),id:doc.id}]);
          
         })
         
         
         setloading(false)
        }
        getData()
    }, []);
    
  return (
    <div className=' mt-2 p-3 flex  flex-wrap' >

        {loading?<div className=' flex items-center w-full justify-center h-96 '><TailSpin /></div>: data.map((element,index)=>{
     return(
        <Link to={`/detail/${element.id}` }><div  key={index} className=' cart text-sm font-bold font-mono border-dashed  border-red-600 mx-3 my-2  border-b-2 p-1'>
        <img className='  h-40 w-24 md:h-72 md:w-48  cursor-pointer' src={element.image} alt="" />
         <h1 className='  text-xs md:text-sm'><span className=' text-red-500'>Name:</span> {element.title}</h1>
         <h1><span className=' text-red-500'>Year:</span> {element.year}</h1>
         <h1 className=' flex items-center'><span className=' text-red-500'>Rating:</span><ReactStars
          className=' ml-1'
          count={5}
          color2={'white'}
          value={element.rating/element.noOfPeopleRated}
          edit={false}
          />
            </h1>
         </div>
         </Link>
     )
        })}
   


    </div>

  )
}

export default Card
