import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51Mg5OdSF3WP5DzSyRT0uf0LrF4AD0qfykJqnUdp0hTlGJOLLiOiEhNQ7zTmRP2xhFrbvix10LoZ66THIOJVU9ERI00Yz6Luprs");

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
    <PaymentForm />
   </Elements>
   )
}

export default Stripe