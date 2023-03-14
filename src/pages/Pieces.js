import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import message from "../assets/message.png";
import mail from "../assets/mail.png";
import twitter from "../assets/twitter.png";
import { useMediaQuery } from "react-responsive";

import { Bars3Icon } from "@heroicons/react/24/solid";
import AlertBox from "../components/AlertBox";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { Slide } from "@mui/material";

function Pieces() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const [textCode, setTextCode] = useState(false);
  const inputHandler = (event) => [
    setInput(event.target.value),
    setTextCode(true),
  ];
  const [isOthers, setIsOthers] = useState(false);

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

  const [pieceByMe, setPieceByMe] = useState([]);
  const [authenticate, setAuthincate] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
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
        setAuthincate(true);
        setUserData(responseJson.user);
        fetchPieceDetails(responseJson.user.twitterId);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const fetchPieceDetails = async (twitterId) => {
    fetch(process.env.REACT_APP_BACKEND_URL + "piece/pieceByUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ twitterId: twitterId }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          setPieceByMe(responseJson);
        }
      })
      .catch((error) => {
        console.log(error);
        //navigate("/");
      });
  };
  return (
    <>

      <AlertBox popupParam={popupParam} setPopupParam={setPopupParam} />

      <nav className=" flex flex-wrap items-center font-Montserrat justify-between  w-full py-4 md:py-0 px-5 lg:py-4 lg:px-20  ">
        <div className=" flex items-center justify-between font-[600] text-[18px] w-full">
          <img src={logo} alt="logo" />
          My Pieces
          <Bars3Icon className="h-8 ml-3 " onClick={() => navigate("/menu")} />
        </div>
      </nav>
      {pieceByMe && (
        <div className=" grid text-[#312E2A]   font-Montserrat">
          <div className="row flex  px-5 ">
            <div className="w-full  border-b items-center flex border-[#D3C5B0]   text-[16px] font-[300]">
              <div
                className={
                  isOthers
                    ? "delay-150 border-b-4 py-2 border-[#312E2A] mr-5 font-[600]"
                    : "py-2 mr-5"
                }
                onClick={() => setIsOthers(true)}
              >
                By Others{" "}
              </div>
              <div
                className={
                  !isOthers
                    ? "delay-150 border-b-4 py-2 border-[#312E2A] mr-5 font-[600]"
                    : "py-2"
                }
                onClick={() => setIsOthers(false)}
              >
                By me
              </div>
            </div>
          </div>
          {/* code for tab By Me */}
          <Slide direction="left" in={!isOthers} mountOnEnter unmountOnExit>
            <div hidden={isOthers} className="row mt-3 h-auto w-full  px-5 ">
            <ul className="" >

              {pieceByMe.map((obj, i) => {
                   
                 return <li key={i} className="w-full  grid   flex border-[#D3C5B0] py-3 border-b    ">
                    <div className=" leading-none row flex w-full font-Lora font-[400] text-[16px] ">

                      {obj.pieceText}
                    </div>
                    <div className=" row flex w-full text-[14px] font-[200] mt-2 font-Montserrat justify-between flex ">
                      <div className=""> @{obj.authorName} • {obj.createdAt} </div>
                      <div className=""> {obj.totalPiecesCollected}</div>
                    </div>
                  </li>
               
              })}
               </ul>
            </div>
          </Slide>

          {/* code for tab By Others */}
          <Slide direction="right" in={isOthers} mountOnEnter unmountOnExit>
            <div hidden={!isOthers} className="row mt-3 h-auto w-full  px-5 ">
              <ul className="    ">
                <li className="w-full  grid   flex border-[#D3C5B0] py-3 border-b    ">
                  <div className=" leading-none row flex w-full font-Lora font-[400] text-[16px] ">
                    I will become an Olympic swimmer someday.
                  </div>
                  <div className=" row flex w-full text-[14px] font-[200] mt-2 font-Montserrat justify-between flex ">
                    <div className=""> @iamcardib • 1/1/2023 </div>
                    <div className=""> 1/443 </div>
                  </div>
                </li>
                <li className="w-full  grid   flex border-[#D3C5B0] py-3 border-b    ">
                  <div className=" leading-none row flex w-full font-Lora font-[400] text-[16px] ">
                    Anyone who holds this on December 25th, 2024 will be
                    airdropped a fun surprise.
                  </div>
                  <div className=" row flex w-full text-[14px] font-[200] mt-2 font-Montserrat justify-between flex ">
                    <div className=""> @beeple • 1/1/2023 </div>
                    <div className=""> 1/2,100 </div>
                  </div>
                </li>
                <li className="w-full  grid   flex border-[#D3C5B0] py-3 border-b    ">
                  <div className=" leading-none row flex w-full font-Lora font-[400] text-[16px] ">
                    Should I name my next rocket “Spacey Spacerson?
                  </div>
                  <div className=" row flex w-full text-[14px] font-[200] mt-2 font-Montserrat justify-between flex ">
                    <div className=""> @elonmusk • 1/1/2023 </div>
                    <div className=""> 1/2,100 </div>
                  </div>
                </li>
              </ul>
            </div>
          </Slide>
        </div>
      )}
    </>
  );
}

export default Pieces;
