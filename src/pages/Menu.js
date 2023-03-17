
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'

import create from '../assets/create.png'
import arrowRight from '../assets/arrowRight.png'
import Payments from '../assets/Payments.png'
import twitter from '../assets/twitter.png'
import logo from '../assets/logo.png'
import myPiece from '../assets/myPiece.png'
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate, } from 'react-router-dom';
import { motion } from "framer-motion";
import { fadeInDown, fadeInUp, staggerContainer } from "./variants";

function Menu() {
    const navigate = useNavigate();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const [authenticate, setAuthincate] = useState(false)
    const [userData, setUserData] = useState({})
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
                console.log(responseJson.user)
                setAuthincate(true)
                setUserData(responseJson.user)

            })
            .catch(error => {
                navigate('/')

            });
    }, [])

    return (<motion.div>

      

            <motion.nav variants={staggerContainer} initial="initial" animate="animate" className=" flex  flex-wrap items-center font-Montserrat justify-between  w-full py-4 md:py-0 px-5 lg:py-4 lg:px-20  ">


                <img src={logo} alt="logo" />
                <XMarkIcon className='h-8  ' onClick={() => navigate(-1)} />


            </motion.nav>

            <div className="  text-[#312E2A]  font-Montserrat">

                <motion.div variants={fadeInUp} className="flex justify-center">
                    <ul className="w-screen   p-1  ">
                        <li
                            className="w-full  px-4  ">

                            <div onClick={()=>navigate('/createPiece')} className=' cursor-pointer  grid-cols-4 border-b  py-4 border-[#D3C5B0] flex justify-between '>

                                <div className='flex col-span-3 items-center text-[#312E2A] text-[16px] font-[400]' >
                                    <img src={create} className="h-12 mr-3 flex sm:h-9" alt="Flowbite Logo" />Create
                                </div>
                                <div className='flex items-center grid-col'>
                                    <img src={arrowRight} className="h-3  " alt="Flowbite Logo" />

                                </div>
                            </div>
                        </li>
                        <li
                            className="w-full px-4">

                            <div onClick={()=>navigate('/pieces')} className=' cursor-pointer grid-cols-4 border-b   py-4  border-[#D3C5B0] flex justify-between '>

                                <div className='flex col-span-3 items-center text-[#312E2A] text-[16px] font-[400]'>
                                    <img src={myPiece} className="h-12 mr-4 sm:h-9" alt="Flowbite Logo" />My Pieces
                                </div>
                                <div className='flex items-center grid-col'>
                                    <img src={arrowRight} className="h-3  " alt="Flowbite Logo" />

                                </div>
                            </div>

                        </li>
                        <li
                            className="w-full px-4">

                            <div onClick={()=>navigate('/')} className=' cursor-pointer  grid-cols-4 border-b   py-4  border-[#D3C5B0] flex justify-between '>

                                <div className='flex col-span-3 items-center text-[#312E2A] text-[16px] font-[400]'>
                                    <img src={Payments} className="h-12 mr-4 sm:h-9" alt="Flowbite Logo" />Payment
                                </div>
                                <div className='flex items-center grid-col'>
                                    <img src={arrowRight} className="h-3  " alt="Flowbite Logo" />

                                </div>
                            </div>

                        </li>

                         

                    </ul>
                </motion.div>
                <motion.footer variants={fadeInUp} className=" inset-x-0 bottom-0 fixed m-2  px-5 ">


                    <div className='w-full pt-0 pb-3 flex items-center text-[16px]  font-regular opacity-60'>
                    <img src={twitter} className="h-4 mr-2"/>{userData.username && "@"+userData.username}
                    </div>


                    <div className=" lg:w-fit lg:mx-auto  w-full  h-[6vh]  flex justify-center ">
                        <button onClick={()=> {
                  
                            window.open(process.env.REACT_APP_LOGOUT_LINK, "_self")
                            }} className="border border-[#312E2A] rounded w-full  mt-0  font-bold lg:px-10">
                            Log out
                        </button>
                    </div>
                </motion.footer>


            </div>

        </motion.div>

        





    );
}

export default Menu;