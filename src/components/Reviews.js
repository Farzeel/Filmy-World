import React from "react";
import ReactStars from "react-stars";
import { useState, useEffect, useContext } from "react";
import { reviewRef, db } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import sweet from "sweetalert";
import SendIcon from "@mui/icons-material/Send";
import { Appstate } from "../App";

const Reviews = ({ id, prevReview, people }) => {
  const [rating, setrating] = useState(0);
  const [msg, setmsg] = useState("");
  const [loading, setloading] = useState(false);
  const [reviewloading, setreviewloading] = useState(false);
  const [data, setdata] = useState([]);
  const [change, setchange] = useState(0);
  const useApp = useContext(Appstate);
  const navigate = useNavigate();

  const addReview = async () => {
    setloading(true);
    if (msg === "") {
      sweet({
        title: "input field cannot be empty",
        icon: "error",
        timer: 1000,
        buttons: false,
      });
    } else if (rating === 0) {
      sweet({
        title: "pleae give some rating",
        icon: "error",
        timer: 1000,
        buttons: false,
      });
    } else {
      try {
        if (useApp.login) {
          await addDoc(reviewRef, {
            name: useApp.userName,
            thoughts: msg,
            rating: rating,
            timestamp: new Date().getTime(),
            movieId: id,
          });

          const ref = doc(db, "movies", id);
          const abc = await updateDoc(ref, {
            rating: prevReview + rating,
            noOfPeopleRated: people + 1,
          });
          sweet({
            title: "Review Sent",
            icon: "success",
            timer: 1000,
          });
          // setTimeout(() => {
          //   window.location.reload()
          // }, 2000);

          console.log(abc);
          setmsg("");
          setrating(0);
          setchange(change+1)
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }

      setloading(false);
    }
  };
  useEffect(() => {
    async function getComent() {
      setreviewloading(true);
      setdata([])
      try {
        let quer = query(reviewRef, where("movieId", "==", id));

        const querSnapShot = await getDocs(quer);

        querSnapShot.forEach((doc) => {
          return setdata((prev) => [...prev, doc.data()]);
        });

        // console.log(setdata(data.sort((a,b)=>b.timestamp-a.timestamp)))

        setreviewloading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getComent();
  }, [change]);

  return (
    <div>
      <ReactStars
        className=""
        count={5}
        color2={"yellow"}
        value={rating}
        onChange={(rate) => setrating(rate)}
        size={20}
        edit={true}
      />
      <input
        placeholder="Share Your Thoughts Here.."
        onChange={(e) => setmsg(e.target.value)}
        type="text"
        id="name"
        name="name"
        className="  w-full    mt-2 bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <div className="flex mt-2 ">
        <button
          onClick={addReview}
          className="flex w-full   items-center justify-center  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        >
          {loading ? (
            <TailSpin height={25} color={"blue"} />
          ) : (
            <SendIcon sx={{ fontSize: 25, color: "black" }} />
          )}
        </button>
      </div>
      {reviewloading ? (
        <div className=" mt-2 flex justify-center">
          <ThreeDots color="white" height={10} />
        </div>
      ) : (
        <div>
          <div className=" mt-2 font-bold flex items-center justify-center">
            <h2>Comments</h2>
          </div>
          {data.map((element, index) => {
            return (
              <div className="review mt-2   p-2 text-sm " key={index}>
                <div className=" flex ">
                  <p className="">
                    <span className=" text-red-500">{element.name}:</span>
                  </p>
                  <p className=" ml-2">{element.thoughts}</p>
                </div>
                <div className=" flex mt-1 items-center">
                  <span className=" text-xs text-white">Review:</span>
                  <ReactStars
                    className=" ml-4"
                    count={5}
                    color2={"yellow"}
                    value={element.rating}
                    onChange={(rate) => setrating(rate)}
                    size={15}
                    edit={false}
                  />
                  <p className=" text-xs  ml-2">
                    {new Date(element.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
