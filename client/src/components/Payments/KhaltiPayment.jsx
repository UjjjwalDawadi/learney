import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import KhaltiLogo from '../../resources/Images/Khalti-Logo.png'


const KhaltiPaymentComponent = () => {
            const { courseId, price } = useParams();


    const initiatePayment = async () => { 
        const name = localStorage.getItem("username");
        const email = localStorage.getItem("userEmail");
        try {
            const returnUrl = `http://localhost:3000/courses/${courseId}`;

            const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', {
                return_url: returnUrl,
                website_url: 'http://localhost:3000',
                amount: parseInt(price),            
                purchase_order_id: 'Order01',
                purchase_order_name: 'test',
                customer_info: {
                    name: name,
                    email: email,
                }
            }, {
                headers: {
                    Authorization: 'key 38aad173fdf6499692ee468b8cedfeec',
                    'Content-Type': 'application/json'
                }
            });
            const paymentUrl = response.data.payment_url;
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle errors
        }
    };

    return (
        <div>
            <img src={KhaltiLogo} alt="khalti" />
            <button onClick={initiatePayment}>Pay with Khalti</button>
        </div>
    );
};

export default KhaltiPaymentComponent;
