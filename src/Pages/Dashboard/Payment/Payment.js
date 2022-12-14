import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
console.log(stripePromise);
const Payment = () => {
    const booking = useLoaderData();
    const {treatment, appointmentDate, price} = booking;
    console.log(booking);
    return (
      <div>
        <h3 className="text-3xl">Payment for {treatment}</h3>
        <p className="text-xl">
          Please pay ${price} on appointmentDate {appointmentDate}
        </p>
        <div className=' w-96 my-8'>
          <Elements stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        </div>
      </div>
    );
};

export default Payment;