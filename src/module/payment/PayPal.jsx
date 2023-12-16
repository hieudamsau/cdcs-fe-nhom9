import React, { useEffect } from 'react';
import paypal from 'paypal-rest-sdk';

const PayPal = () => {
  useEffect(() => {
    paypal.configure({
      mode: 'sandbox', 
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET'
    });
  }, []);

  const createPayment = () => {
    const payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'YOUR_RETURN_URL',
        cancel_url: 'YOUR_CANCEL_URL'
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'Item Name',
                sku: 'Item SKU',
                price: '10.00',
                currency: 'USD',
                quantity: 1
              }
            ]
          },
          amount: {
            currency: 'USD',
            total: '10.00'
          },
          description: 'Item description'
        }
      ]
    };

    paypal.payment.create(payment, (error, payment) => {
      if (error) {
        console.error(error);
      } else {
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
        window.location.replace(approvalUrl);
      }
    });
  };

  return (
    <div>
      <button onClick={createPayment}>Pay with </button>
    </div>
  );
};

export default PayPal;