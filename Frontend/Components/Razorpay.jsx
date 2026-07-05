import axios from "axios";

function Razorpay() {
  const handlePayment = async () => {
    try {
      // Create order on backend
      const { data: order } = await axios.post(
        "http://localhost:8080/v1/order"
      );
    
      const options = {
        key: "rzp_test_T7vXx1kI5pPbnn", // Public Key
        amount: order.amount,
        currency: order.currency,
        name: "My Store",
        description: "Test Transaction",
        order_id: order.id,

        handler: async function (response) {
          console.log(response);

          /*
          response = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          }
          */

          // Send these to backend for signature verification
          await axios.post("http://localhost:3000/v1/verify", response);
        },

        prefill: {
          name: "Yaksh",
          email: "yaksh@example.com",
          contact: "9876543210",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-50">
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
}

export default Razorpay;