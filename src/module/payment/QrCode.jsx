import React from 'react';
import QRCode from 'react-qr-code';

const QrCode = () => {
  const handlePaymentSuccess = (details) => {
    console.log('Payment successful', details);
  };

  return (
    <div>
      <h1>Thanh toán bằng QR Code</h1>
      <QRCode value="https://www.paypal.com" />
      <button onClick={handlePaymentSuccess}>Hoàn thành thanh toán</button>
    </div>
  );
};

export default QrCode;