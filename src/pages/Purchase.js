import React, { useEffect, useState } from "react";
import nft from "../assets/nft.png";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { fadeInDown, fadeInUp, staggerContainer } from "./variants";
import { useLocation, useNavigate } from "react-router-dom";
function Purchase() {
  const { state } = useLocation();
  const { listingId } = state; // Read values passed on state
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();

  useEffect(()=>{
    fetchPieceDetails(listingId);
  },[])
  const [listingData, setListingData] = useState({});

  const fetchPieceDetails = async (listingId) => {
    fetch(process.env.REACT_APP_BACKEND_URL + "piece/listingPiece", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ id: listingId }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          setListingData({
            id: responseJson.id,
            pieceText: responseJson.pieceText,
            authorName: responseJson.authorName,
            isCollected: responseJson.isCollected,
            amount: responseJson.amount,
            image: responseJson.image,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        //navigate("/");
      });
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="mt-5 ">
          <h1 className=" mt-24 text-center font-extrabold font-opensans text-3xl text-darkbrown">
            Purchase Complete
          </h1>
        </motion.div>
        <motion.div
            variants={fadeInUp}
            className=" flex justify-center  p-5 overflow-hidden	"
          >
            <img
              className="object-cover h-[30vh] w-full  "
              src={listingData.image}
              alt="nft"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-around mt-5">
            <p className="font-opensans text-xl font-bold text-darkbrown">
              Piece #{listingData.id}
            </p>
            <p className="font-opensans text-lg text-darkbrown">
              ${listingData.amount}
            </p>
          </motion.div>

        {isTabletOrMobile&&<motion.div variants={fadeInUp} className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/pieces")}
            className=" hover:scale-105 ease-out transition-all  hover:shadow-lg font-opensans w-fit mx-auto rounded-md px-32 py-4 hover:bg-opacity-100 text-stone-200 bg-fadeochre"
          >
            View my pieces
          </button>
        </motion.div>}
        {isDesktopOrLaptop && <motion.div variants={fadeInUp} className="flex justify-center mt-12">
        <button onClick={() => navigate("/pieces")} className=" hover:scale-105 ease-out transition-all  hover:shadow-lg font-opensans w-fit mx-auto rounded-md px-14 py-3 hover:bg-opacity-100 text-stone-200 bg-fadeochre">
          View my pieces
        </button>
      </motion.div>}
      </motion.div>
    </>
  );
}

export default Purchase;
