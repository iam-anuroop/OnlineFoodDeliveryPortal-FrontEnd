import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment() {
    
    const [clientSecret, setClientSecret] = useState("");

    const stripePromise = loadStripe("pk_test_51OKOAtSGhzZ6PyhpxH1vM6VVWXulVZ3ZKLdvjGnqHU6ZWwyBLCnBvn4Xpj32NsHeTQHSUApXc8FFtuB4zehXSggL00hfgCcdr4");


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);


      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };


  return (
    <div>
        <h1>Payment</h1>
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>

    </div>
  )
}

export default Payment