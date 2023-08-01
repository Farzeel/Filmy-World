import React from 'react'
import { Link } from 'react-router-dom'
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { useState,useContext } from 'react';
import {query,where,getDocs} from "firebase/firestore"
import { userRef } from '../firebase/Firebase';
import sweet from "sweetalert";
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs-react"
import { Appstate } from '../App';

const Login = () => {
    const useApp = useContext(Appstate)
    const navigate = useNavigate()
    const [laoding, setlaoding] = useState(false);
    const [form, setform] = useState({
        mobile:"",
        password:""
    });
    const login =async ()=>{
        setlaoding(true)
        try {
            const quer = query(userRef,where("mobile","==",form.mobile))
            const querSnapShot = await getDocs(quer)
            querSnapShot.forEach((doc)=>{
             const _data = doc.data()
             const isUSer = bcrypt.compareSync(form.password,_data.password)
             if(isUSer){
                sweet({
                    title: "LogedIn",
                    icon: "success",
                    timer: 1000,
                    buttons: false,
                  });
                  useApp.setlogin(true)
                  useApp.setUserName(_data.name)
                  navigate("/")

             }
             else{
                sweet({
                    title: "Invalid credentials",
                    icon: "error",
                    timer: 1500,
                    buttons: false,
                  });
             }
         
            })
            setlaoding(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
   
    <section className=" ">
  <div className="flex flex-col items-center mt-0 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  
    <div className="w-full review   rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-400 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
       
          <div>
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Mobile No
            </label>
            <input
             value={form.mobile}
             onChange={(e)=>setform({...form,mobile:e.target.value})}
              type="number"
              name="number"
              id="number"
              className="review bg-gray-50 border  border-gray-300 text-white sm:text-sm rounded-lg focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 outline-none  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="312345676"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium textwhite dark:text-white"
            >
              Password
            </label>
            <input
            value={form.password}
            onChange={(e)=>setform({...form,password:e.target.value})}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="review bg-gray-50 border focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 outline-none border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
         
          {laoding?<div className='flex justify-center'><TailSpin color='blue' height={20}></TailSpin></div>:<button
            
           onClick={login} className="w-full text-blue-800 font-bold bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>}
          <p className="text-sm font-light text-yellow-400 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-primary-600 text-white hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        
      </div>
    </div>
  </div>
</section>

  )
}

export default Login
