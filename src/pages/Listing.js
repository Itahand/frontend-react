import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import piece from "../assets/piece.png";
import certified from "../assets/certified.png";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInDown, fadeInUp, staggerContainer } from "./variants";
function Listing() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [salesEnded, setSalesEnded] = useState(false);
  const [listingData, setListingData] = useState({});
  const navigate = useNavigate();
  let { listingId } = useParams();
  useEffect(() => {
    fetchPieceDetails();

          document.querySelector('[property="og:title"]').setAttribute('content',"#"+listingId);
          document.querySelector('[name="twitter:title"]').setAttribute('content', "#"+listingId);
          document.querySelector('[property="og:image"]').setAttribute('content', ""+process.env.REACT_APP_BACKEND_URL+"piece/previewImage/"+listingId);
          document.querySelector('[name="twitter:image"]').setAttribute('content', process.env.REACT_APP_BACKEND_URL+"piece/previewImage/"+listingId);
  
  }, []);
  const fetchPieceDetails = async () => {
    console.log(listingId);
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
          const date = new Date(responseJson.createdAt);
          const options = {
            hour12: true, // use 12-hour format
            hour: "numeric", // show hours
            minute: "numeric", // show minutes
            timeZone: "UTC", // use UTC time zone
            month: "2-digit", // show month as 2-digit number
            day: "2-digit", // show day as 2-digit number
            year: "numeric", // show year
          };

          const formattedDate = date.toLocaleString("en-US", options);

          setListingData({
            id: responseJson.id,
            pieceText: responseJson.pieceText,
            authorName: responseJson.authorName,
            createdAt: formattedDate,
            isCollected: responseJson.isCollected,
            amount: responseJson.amount,
            image:responseJson.image,
            totalPiecesCollected:responseJson.totalPiecesCollected
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
        //navigate("/");
      });
  };
  return (
    <> 

    { listingData.id && 

      
      <motion.div
       
        variants={staggerContainer}
       
        initial="initial"
       
        animate="animate"
      
      >
        <div className=" flex justify-between w-full px-6 py-8">
          <motion.div variants={fadeInDown}>
            
            <img src={piece} alt="logo" className="h-7 w-20" />
          
          </motion.div>
          <div className=" flex gap-5">
            <motion.a
             
              variants={fadeInDown}
              className=" cursor-pointer hover:scale-105 ease-out transition-all"
              onClick={() => navigate("/")}
            >
              <p className=" font-opensans text-lg font-bold lg:mr-5">Log in</p>
            </motion.a>
          </div>
        </div>

        {isTabletOrMobile && (
          <motion.div variants={fadeInUp} className=" flex justify-center mt-6 p-5 overflow-hidden">
            <img className="object-none h-[40vh] w-full  " src={listingData.image} alt="nft" />
          </motion.div>
        )}


        {isDesktopOrLaptop && (
          <div className="flex gap-24 justify-center">
          <motion.div variants={fadeInUp} className=" flex justify-center mt-6 p-5 overflow-hidden">
            <img className="object-none h-[40vh] w-full  " src={listingData.image} alt="nft" />
          </motion.div>
            <div>
            <motion.div
          variants={fadeInUp}
          className=" mt-10 mx-5 mb-4 flex justify-between lg:justify-center lg:gap-24"
        >
          <p className="font-opensans text-md font-bold text-darkbrown">
            Piece {"#"+listingData.id}
          </p>
          <div className="flex ">
            <img src={certified} alt="certified" className=" h-4 w-4 mt-1" />
            <p className=" font-opensans font-bold ml-1 text-md text-fadebrown">
              Certified
            </p>
          </div>
        </motion.div>
              {!salesEnded && (
                <div>
                  <motion.div
                    variants={fadeInUp}
                    className="flex justify-center mt-4 -ml-14"
                  >
                   <button
                onClick={() => {
                 
                  navigate("/buy/"+listingId,{ state: { from: 'listing',to:'buy',listingId:listingId } })
                }}
                className=" hover:scale-105 transition-all ease-out font-opensans w-fit mx-auto rounded-md bg-opacity-70 py-3 w-full hover:bg-opacity-100 text-stone-200 bg-fadeochre"
              >
                      Collect (${listingData.amount})
                    </button>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="mt-5 lg:text-center -ml-12"
                  >
                    <p className="-ml-3 font-opensans text-md text-darkbrown ">
                      3hr 15 min left | {listingData.totalPiecesCollected} Collected
                    </p>
                    <div className="lg:mx-auto  mx-5 border-t-4 w-60 rounded-md border-white"></div>
                    <div className=" ml-20 mx-5 -mt-1 border-t-4 w-28 rounded-md border-fadebrown"></div>
                  </motion.div>
                </div>
              )}

              {salesEnded && (
                <motion.div variants={fadeInUp} className="mt-3">
                  <p className="lg:mx-auto ml-6 font-opensans text-md text-darkbrown ">
                    Sale Ended | {listingData.totalPiecesCollected} Collected
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {isTabletOrMobile && (
          <motion.div
            variants={fadeInUp}
            className=" mt-7 ml-8 mb-7 flex justify-between lg:justify-center lg:gap-24"
          >
            <p className="font-opensans text-md font-bold text-darkbrown">
              Piece #{listingData.id} 
            </p>
            <div className="flex pr-8">
              <img
                src={certified}
                alt="certified"
                className=" h-4 w-4 ml-3 mt-1"
              />
              <p className=" font-opensans font-bold ml-1 text-md text-fadebrown">
                Certified
              </p>
            </div>
          </motion.div>
        )}
        {!salesEnded && isTabletOrMobile && (
          <div>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mt-4"
            >
              <button
                onClick={() => {
                
                 
                  
             
                  navigate("/buy/"+listingId,{ state: { from: 'listing',to:'buy',listingId:listingId } })
            }}
                className=" hover:scale-105 transition-all ease-out font-opensans w-fit mx-auto rounded-md bg-opacity-70 px-36 py-4 hover:bg-opacity-100 text-stone-200 bg-fadeochre"
              >
                Collect (${listingData.amount})
              </button>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-5 lg:text-center">
              <p className="ml-6 font-opensans text-md text-darkbrown ">
                3hr 15 min left | {listingData.totalPiecesCollected} Collected
              </p>
              <div className="lg:mx-auto  mx-5 border-t-4 w-60 rounded-md border-white"></div>
              <div className=" lg:mx-auto lg:pr-4 mx-5 -mt-1 border-t-4 w-28 rounded-md border-fadebrown"></div>
            </motion.div>
          </div>
        )}

        {salesEnded && isTabletOrMobile && (
          <motion.div variants={fadeInUp} className="mt-3">
            <p className="lg:mx-auto ml-6 font-opensans text-md text-darkbrown ">
              Sale Ended | {listingData.totalPiecesCollected} Collected
            </p>
          </motion.div>
        )}
      </motion.div>
      
    }
    </>
    
  );
}

export default Listing;
