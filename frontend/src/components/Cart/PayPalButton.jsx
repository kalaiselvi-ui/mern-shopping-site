import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from 'react';

const PayPalButton = ({ amount, onSuccess, onError }) => {
    return (
        <div>
            <PayPalScriptProvider options={{ "clientId": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{ amount: { value: amount } }]
                        })
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(onSuccess)
                    }}
                    onError={onError}
                />
            </PayPalScriptProvider>
        </div>
    )
}

export default PayPalButton