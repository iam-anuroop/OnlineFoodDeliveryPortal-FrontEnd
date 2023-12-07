import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment() {
    
    const [clientSecret, setClientSecret] = useState("");
    const [intentid, setIntentid] = useState("");

    const stripePromise = loadStripe("pk_test_51OKOAtSGhzZ6PyhpxH1vM6VVWXulVZ3ZKLdvjGnqHU6ZWwyBLCnBvn4Xpj32NsHeTQHSUApXc8FFtuB4zehXSggL00hfgCcdr4");


    useEffect(() => {
        fetch("http://127.0.0.1:8000/user/payment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.client_secret);
            setClientSecret(data.client_secret);
            setIntentid(data.intentid)
          });
          console.log('okay');
      }, []);


      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

console.log(clientSecret,'jjjjjjjjjjjjjjjj');
  return (
    <div>
        <h1>Payment</h1>
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm data={{'clientSecret':clientSecret,'intentid':intentid}} />
                </Elements>
            )}
        </div>

    </div>
  )
}

export default Payment