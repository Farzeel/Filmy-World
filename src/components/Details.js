import React from 'react'
import ReactStars from 'react-stars'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getDoc,doc } from "firebase/firestore";
import { db } from '../firebase/Firebase';
import {TailSpin,ThreeCircles} from "react-loader-spinner"
import Reviews from './Reviews';


const Details = () => {
    const {id} = useParams()
    const [data, setdata] = useState({
        title:"",
        image:"",
        year:"",
        description:"",
        rating:0,
        noOfPeopleRated:0,
    });
    const [loading, setloading] = useState(false);

    useEffect(() => {
        async function getid(){
            setloading(true)
            const _doc =  doc(db,"movies",id)
            const info = await getDoc(_doc)
            setdata(info.data())
            setloading(false)
            
        }
        getid()
    }, []);

  return (
   <>
   {loading?<div className=' flex items-center w-full justify-center h-96 '><ThreeCircles color='white' /></div>:
    <div className="container my-3 px-6 md:px-5 md:py-24 mx-auto">
      <div className="  lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          className="h-96 md:w-72 w-full  "
          src={data.image}
        />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
         
          <h1 className="text-white text-lg md:text-3xl title-font font-medium mb-1">
            {data.title} <span className=' text-sm md:text-lg'>({data.year})</span>
          </h1>
          <div className="flex mb-4">
            <span className="flex items-center">
            <ReactStars
          className=' ml-1'
          count={5}
          color2={'yellow'}
          value={data.rating/data.noOfPeopleRated}
          edit={false}
          />
              <span className="text-white ml-3 text-sm">Base on {data.noOfPeopleRated} people reviews</span>
            </span>
            
          </div>
          <p className="leading-relaxed text-white">
          {data.description}
          </p>
          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
           
            <div className="flex ml-6 items-center">
             
              <div className="relative">
        
              </div>
            </div>
          </div>
          <Reviews id={id} prevReview={data.rating} people={data.noOfPeopleRated}/>
        
        </div>
      </div>
    </div>
}
  </>

  )
}

export default Details
