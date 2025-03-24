import { useEffect, useState } from "react";
import { fetchPayments } from "../api/paymentApi";

const PaymentList = ({ token }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      const data = await fetchPayments(token);
      setPayments(data);
    };
    loadPayments();
  }, [token]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Payments</h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id} className="border p-4 mb-2">
            {payment.amount} Ksh - {payment.payment_method} - {payment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentList;
