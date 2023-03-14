import React, { useEffect } from "react";
import { useState } from "react";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "gray",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "black" },
            "::placeholder": { color: "lightgray" },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "black",
        },
    },
};


export default function PaymentForm({amount,listingId,twitterId}) {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "stripe/payment", {
                    amount: amount,
                    listingId:listingId,
                    twitterId:twitterId,
                    id
                })


                if (response.data.success) {
                    console.log("Successful Payment");
                    setSuccess(true);
                    setTimeout(()=>{
                        localStorage.setItem("fromPage","")
                        localStorage.setItem("listingId","")
                        navigate('/purchase',{ state: { listingId: listingId } })
                    },2000)
                }

            } catch (error) {
                console.log("Error", error);
            }
        } else {
            console.log(error.message);
        }
    }

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const stripe = useStripe()
    const elements = useElements()

    return (
        <>

            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className='FormGroup mx-3'>
                        <div>
                            <CardNumberElement className=' max-w rounded-md border-2 bg-white px-2 py-3 ' options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <div >
                        <fieldset className='row mx-3 flex justify-between '>

                            <CardExpiryElement className='w-1/2  rounded-md border-2 bg-white  py-3 ' options={CARD_OPTIONS} />
                            <CardCvcElement className='w-1/2 rounded-md  border-2 bg-white  py-3 ' options={CARD_OPTIONS} />
                        </fieldset>
                        <fieldset>



                        </fieldset>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className=" w-96 mx-auto rounded-md bg-opacity-70 px-22 py-4 hover:bg-opacity-100 text-stone-200 bg-fadeochre shadow-lg ease-out duration-150 transition-all hover:scale-105 ">
                            COMPLETE PURCHASE
                        </button>
                        {error && error}
                    </div>
                </form> : 
                //NFT minting logic 
                
                <div className="payment-success">
                    <h2 className="font-opensans font-bold ml-4">Payment successful</h2>
                    <h3 className="font-opensans font-bold ml-4 mt-3">Thank you for your payment</h3>
                </div>
            }
        </>
    )
}
