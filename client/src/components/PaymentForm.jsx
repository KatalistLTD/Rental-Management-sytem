import { useState } from "react";
import { payWithMpesa, payWithPaystack } from "../api/paymentApi";

const PaymentForm = () => {
  const [method, setMethod] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (method === "mpesa") {
      const response = await payWithMpesa(phone, amount);
      alert(`M-Pesa Response: ${JSON.stringify(response)}`);
    } else {
      const response = await payWithPaystack(email, amount);
      window.location.href = response.data.authorization_url;
    }
  };

  return (
    <div className="card p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-2">Make a Payment</h3>
      <select
        onChange={(e) => setMethod(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="mpesa">M-Pesa</option>
        <option value="paystack">Paystack</option>
      </select>

      {method === "mpesa" ? (
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border rounded mt-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border rounded mt-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white p-2 mt-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;
