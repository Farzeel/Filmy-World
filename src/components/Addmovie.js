import React from "react";
import { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import sweet from "sweetalert";
import { movieRef } from "../firebase/Firebase";
import { addDoc } from "firebase/firestore";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
const Addmovie = () => {
  const useApp = useContext(Appstate);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [form, setform] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    noOfPeopleRated: 0,
  });
  const addMovie = async () => {
    setloading(true);
    try {
      if (useApp.login) {
        await addDoc(movieRef, form);
        sweet({
          title: "Sucessfully Added",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white ">
            Add Movie
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-lg text-white">
                  {" "}
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setform({ ...form, title: e.target.value })}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="number"
                  className="leading-7 text-lg text-white"
                >
                  Year
                </label>
                <input
                  value={form.year}
                  onChange={(e) => setform({ ...form, year: e.target.value })}
                  type="text"
                  id="number"
                  name="number"
                  className="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="imageUrl"
                  className="  leading-7 text-lg text-white"
                >
                  Image Url
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setform({ ...form, image: e.target.value })}
                  id="imageUrl"
                  name="imageUrl"
                  className="w-full  bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
            </div>
            {/* description */}
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="Description"
                  className="  leading-7 text-lg text-white"
                >
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setform({ ...form, description: e.target.value })
                  }
                  id="Description"
                  name="Description"
                  className="w-full  bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                onClick={addMovie}
                className="flex mx-auto text-white bg-black border-white border py-2 px-8 focus:outline-none  hover:bg-white hover:text-black rounded text-lg"
              >
                {loading ? <TailSpin height={30} color="red" /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addmovie;
