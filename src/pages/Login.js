import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import twitter from "../assets/twitter.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInDown, fadeInUp, staggerContainer } from "./variants";

function Login() {
  const [input, setInput] = useState("");

  const [magicLink, setMagicLink] = useState(false);
  const inputHandler = (event) => [
    setInput(event.target.value),
    setMagicLink(true),
  ];
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  useEffect(() => {
    // if (localStorage.getItem("fromPage") == "landing") {
    //   localStorage.setItem("fromPage", "");
    //   navigate("/createPiece");
    // } else if (localStorage.getItem("fromPage") == "login") {
    //   localStorage.setItem("fromPage", "");
    //   navigate("/buy");
    // }
  }, []);
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="mt-5 ml-3">
          <motion.div variants={fadeInDown}><ArrowLeftIcon onClick={()=>{navigate("/")}} className="h-8 w-8 mt-5"  /></motion.div>
          <motion.div variants={fadeInUp}>
            <h1 className="lg:text-center drop-shadow-lg mt-72 text-left font-extrabold font-opensans text-4xl text-darkbrown">
              Log in to purchase
            </h1>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp}
          onClick={() => {
            //localStorage.setItem("fromPage", "login");
            window.open(process.env.REACT_APP_TWITTER_AUTH_LOGIN_LINK, "_self");
          }}
          className=" flex cursor-pointer -mb-5 transition-all ease-out shadow-lg mt-6 mx-auto gap-3 border-2 rounded-md border-slate-900 w-96 pl-24  py-4 hover:scale-105"
        >
          <img src={twitter} className="h-5 w-5 my-auto -ml-20" />
          <p className=" font-opensans font-semibold">Sign in with Twitter</p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Login;
