import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import info from "../assets/info.png";
import twitter from "../assets/twitter.png";
import { useMediaQuery } from "react-responsive";
import flow from "../assets/flow.png";
import { Bars3Icon } from "@heroicons/react/24/solid";
import AlertBox from "../components/AlertBox";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInDown, fadeInUp, staggerContainer } from "./variants";

function CreatePiece() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const [textCode, setTextCode] = useState(false);
  const inputHandler = (event) => [
    setInput(event.target.value),
    setTextCode(true),
  ];
  const [popupParam, setPopupParam] = useState({ open: false });
  //otp verify code
  const resendCode = () => {
    //code for resending code
    console.log("resend");
  };
  const verifyCode = (codeText) => {
    //code for resending code
    console.log("code entered is " + codeText);

    //close the popup when verification done
    setPopupParam({ open: false });
  };

  const sendVerificationText = () => {
    setPopupParam({
      open: true,
      bodyText: "We texted a code to " + input,
      resendCode: resendCode,
      verifyCode: verifyCode,
      codeText: "",
    });
  };

  const [authenticate, setAuthincate] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (localStorage.getItem("fromPage") != "" && localStorage.getItem("listingId") !="") {
         navigate("/buy");
       }

    fetch(process.env.REACT_APP_BACKEND_URL, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        //console.log(responseJson.user)
        setAuthincate(true);
        setUserData(responseJson.user);
      })
      .catch((error) => {
        navigate("/");
      });
  }, []);
  return (
    <>
     
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <AlertBox popupParam={popupParam} setPopupParam={setPopupParam} />

          <motion.nav variants={fadeInUp} className=" flex flex-wrap items-center font-opensans justify-between  w-full py-4 md:py-0 px-5 lg:py-4 lg:px-20  ">
            <div className=" flex items-center justify-between font-[500] w-full">
              <img src={logo} alt="logo" className="-ml-10"/>

              <Bars3Icon
                className="h-8 ml-3 "
                onClick={() => navigate("/menu")}
              />
            </div>
          </motion.nav>

          <motion.div variants={fadeInUp} className=" grid text-[#312E2A]   font-Montserrat">
            <motion.div variants={fadeInUp} className="row flex  px-5 ">
              <div className="w-1/2 pt-0 mt-7 pb-3 flex tracking-[1px] items-center text-[16px]  font-regular opacity-60">
                <img src={twitter} className="h-4 mr-2 " />
                {userData.username && "@" + userData.username}
              </div>
            </motion.div>

           {isTabletOrMobile&& <motion.div variants={fadeInUp} className="row flex  px-5 ">
              <div className="">
                <h1 className=" mt-3 text-4xl font-extrabold text-darkbrown font-opensans">
                  Create a Piece
                </h1>
              </div>
            </motion.div>}
            {isDesktopOrLaptop&& <motion.div variants={fadeInUp} className="">
              <div className="flex justify-center">
                <h1 className=" mt-3 text-4xl font-extrabold text-darkbrown font-opensans">
                  Create a Piece
                </h1>
              </div>
            </motion.div>}

            {isTabletOrMobile && <motion.div variants={fadeInUp} className="row flex  px-5 ">
              <div className="w-full  tracking-[1px] justify-start items-center flex font-opensans  pb-3  pt-5  text-[16px] font-[300]">
                Reply “@CreateAPiece” to any of your text-only Tweets, and we'll
                create a Pieace that anyone can collect for $1 for 24hrs.
              </div>
            </motion.div>}
            {isDesktopOrLaptop && <motion.div variants={fadeInUp} className="w-full flex justify-center  px-5 ">
              <div className="w-full  tracking-[1px]  font-opensans  pb-3  pt-5  text-[16px] font-[300] ">
                Reply “@CreateAPiece” to any of your text-only Tweets, and we'll create a Pieace that anyone can collect for $1 for 24hrs.
              </div>
            </motion.div>}

            <motion.div variants={fadeInUp} className="row px-5 items-center flex ">
              <img className="mx-auto mt-10" src={flow} alt="flow" />
            </motion.div>
            {isTabletOrMobile&&<motion.footer variants={fadeInUp} className=" inset-x-0 bottom-0 fixed   px-5 ">
              <div className=" w-full my-4  p-3 tracking-[1px] flex justify-center font-opensans bg-[#E7D8C4] items-center text-[12px] font-[300] ">
                <img className="mx-auto h-10 mr-3" src={info} alt="flow" />
                Only text tweets are supported at this time. We do not yet
                support threads or images.
              </div>
            </motion.footer>}
            {isDesktopOrLaptop &&
              <motion.footer variants={fadeInUp} className=" ml-10 mt-6 inset-x-0 bottom-0 flex justify-center   px-5 ">
              <div className=" w-fit  my-4  p-3 tracking-[1px] flex justify-center font-opensans bg-[#E7D8C4] items-center text-[12px] font-[300] ">
                <img className="mx-auto h-10 mr-3" src={info} alt="flow" />
                Only text tweets are supported at this time. We do not yet
                support threads or images.
              </div>
            </motion.footer>
            }
          </motion.div>
        </motion.div>
      
    </>
  );
}

export default CreatePiece;
