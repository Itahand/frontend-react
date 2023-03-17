import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import nft from "../assets/mock_piece.png";
import apple2 from "../assets/apple2.png";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { motion } from "framer-motion";
import GridLoader from "react-spinners/GridLoader";
import { fadeInDown, fadeInUp, staggerContainer } from "./variants";
const stripePromise = loadStripe(
  "pk_test_51Mg5OdSF3WP5DzSyRT0uf0LrF4AD0qfykJqnUdp0hTlGJOLLiOiEhNQ7zTmRP2xhFrbvix10LoZ66THIOJVU9ERI00Yz6Luprs"
);
function Buy() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();
  const [authenticate, setAuthincate] = useState(false);
  const [userData, setUserData] = useState({});

  let { id } = useParams();
  let { state } = useLocation();
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    setLoading(true);
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
        setLoading(false)
        setAuthincate(true);
        setUserData(responseJson.user);
        const listingId = id;
        console.log(listingId)
        fetchPieceDetails(listingId);
        
      })
      .catch((error) => {
        console.log(error);
        console.log(state);      
         setLoading(false);
        navigate("/login",{ state: { from: 'listing',to:'buy',listingId:id } })
      });
   
  }, []);

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
  return (
    <>
    {loading && <div className="flex justify-center mt-64"><GridLoader
        
    color={'#A4907C'}
    loading={loading}
    size={30}
    aria-label="Loading Spinner"
    data-testid="loader"
  /></div>}
{ !loading&&listingData && (
  
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="items-center flex justify-between flex-col"
        >
         
          {/* <motion.div variants={fadeInUp} className="flex justify-center mt-5">
          <img
            className="h-44 w-44 hover:scale-105 hover:shadow-lg"
            src={nft}
            alt="nft"
          />
        </motion.div> */}
          <motion.div
            variants={fadeInUp}
            className=" flex justify-center  p-5 overflow-hidden	"
          >
            <img
              className="object-none h-[40vh] w-full  "
              src={listingData.image}
              alt="nft"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-between w-40 mt-5">
            <p className="font-opensans text-xl font-bold text-darkbrown">
              Piece #{listingData.id}
            </p>
            <p className="font-opensans text-lg text-darkbrown">
              ${listingData.amount}
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-center mt-7">
            <button className=" hover:scale-105 transition-all ease-out font-opensans w-96 rounded-md px-4 py-4 bg-opacity-90 text-stone-200 bg-black ">
              <img src={apple2} className="h-6 w-5 -mb-5 ml-32" />
              <p className="text-white font-opensans">Pay</p>
            </button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 ml-3 mr-3 border-t-2 border-ochredark"
          >
            <div className="h-8 w-fit font-normal mx-auto px-3 text-ochredark bg-ochre -mt-4 ">
              <p className="font-opensans">Or Pay with card</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="lg:text-center font-bold lg:pl-88 lg:pr-80 mt-6 ml-5 text-lg font-opensans text-darkbrown">
              Card info
            </p>
            <div>
              <form method="GET" id="my_form"></form>
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={listingData.amount}
                  listingId={listingData.id}
                  twitterId={userData.twitterId}
                />
              </Elements>
            </div>
          </motion.div>
        </motion.div>
      )}
      {isTabletOrMobile && listingData && (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <ArrowLeftIcon className="h-8 w-8 mt-5 ml-4" />
          {/* <motion.div variants={fadeInUp} className="flex justify-center mt-5">
          <img
            className="h-44 w-44 hover:scale-105 hover:shadow-lg"
            src={nft}
            alt="nft"
          />
        </motion.div> */}
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
          <motion.div variants={fadeInUp} className="flex justify-center mt-7">
            <button className=" hover:scale-105 transition-all ease-out font-opensans w-96 rounded-md px-4 py-4 bg-opacity-90 text-stone-200 bg-black ">
              <img src={apple2} className="h-6 w-5 -mb-5 ml-32" />
              <p className="text-white font-opensans">Pay</p>
            </button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 ml-3 mr-3 border-t-2 border-ochredark"
          >
            <div className="h-8 w-fit font-normal mx-auto px-3 text-ochredark bg-ochre -mt-4 ">
              <p className="font-opensans">Or Pay with card</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="lg:text-center font-bold lg:pl-88 lg:pr-80 mt-6 ml-5 text-lg font-opensans text-darkbrown">
              Card info
            </p>
            <div>
              <form method="GET" id="my_form"></form>
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={listingData.amount}
                  listingId={listingData.id}
                  twitterId={userData.twitterId}
                />
              </Elements>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Buy;
