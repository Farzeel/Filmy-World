import React from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { userRef } from "../firebase/Firebase";
import { addDoc } from "firebase/firestore";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/Firebase";
import sweet from "sweetalert";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const [laoding, setlaoding] = useState(false);
  const [selectoption, setselectoption] = useState("+92");
  const [form, setform] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [isotp, setisotp] = useState(false);
  const [writeOtp, setwriteOtp] = useState("");

  const generateCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      }
    );
  };
  const requestOtp = () => {
    setlaoding(true);
    generateCaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `${selectoption}${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        sweet({
          title: "OTP Sent",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        setisotp(true);
        setlaoding(false);

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
        // ...
      });
  };
  const verifyOtp = () => {
    setlaoding(true);
    try {
      window.confirmationResult.confirm(writeOtp).then((result) => {
        uploadData();
        sweet({
          title: "Sucessfully Registered",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        navigate("/login");
        setlaoding(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const uploadData = async () => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(form.password, salt);
    await addDoc(userRef, {
      name: form.name,
      password: hash,
      mobile: form.mobile,
    });
  };
  return (
    <>
      {isotp ? (
        <>
          <section className=" ">
            <div className="flex flex-col items-center mt-24 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full review   rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <div>
                    <label
                      htmlFor="OTP"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      OTP
                    </label>
                    <input
                      value={writeOtp}
                      onChange={(e) => setwriteOtp(e.target.value)}
                      type="text"
                      id="OTP"
                      className="review  border  border-gray-300 text-white sm:text-sm rounded-lg focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 outline-none  block w-full p-2.5"
                      placeholder="Enter Your Name"
                      required=""
                    />
                  </div>
                  {laoding ? (
                    <div className="flex justify-center">
                      <TailSpin color="blue" height={20}></TailSpin>
                    </div>
                  ) : (
                    <button
                      onClick={verifyOtp}
                      className="w-full text-blue-800 font-bold bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Confirm OTP
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className=" ">
          <div className="flex flex-col items-center mt-0 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full review    rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-400 md:text-2xl dark:text-white">
                  Create your account
                </h1>

                <div>
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setform({ ...form, name: e.target.value })}
                    type="text"
                    name="name"
                    id="name"
                    className="review  border  border-gray-300 text-white sm:text-sm rounded-lg focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 outline-none  block w-full p-2.5"
                    placeholder="Enter Your Name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Mobile No
                  </label>
                  <div className="flex">
                    <select
                      className="review text-sm mr-1 cursor-pointer"
                      value={selectoption}
                      onChange={(e) => setselectoption(e.target.value)}
                    >
                      {console.log(selectoption)}
                      <option value="" disabled hidden>
                        {selectoption}
                      </option>

                      <option value="+92">+92</option>
                      <option value="+49">+49</option>

                      {/* Add more options as needed */}
                    </select>
                    <input
                      value={form.mobile}
                      onChange={(e) =>
                        setform({ ...form, mobile: e.target.value })
                      }
                      type="number"
                      name="number"
                      id="number"
                      className="review bg-gray-50 border  border-gray-300 text-white sm:text-sm rounded-lg focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 outline-none  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="312345676"
                      required=""
                    />
                  </div>
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
                    onChange={(e) =>
                      setform({ ...form, password: e.target.value })
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="review bg-gray-50 border focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 outline-none border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                {laoding ? (
                  <div className="flex justify-center">
                    <TailSpin color="blue" height={20}></TailSpin>
                  </div>
                ) : (
                  <button
                    onClick={requestOtp}
                    className="w-full text-blue-800 font-bold bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Request OTP
                  </button>
                )}
                <p className="text-sm font-light text-yellow-400 dark:text-gray-400">
                  Already have an account ?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 text-white hover:underline dark:text-primary-500"
                  >
                    login
                  </Link>
                </p>
                <div id="recaptcha-container"></div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;
