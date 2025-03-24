import PaymentForm from "../../components/PaymentForm";
import PaymentList from "../../components/PaymentList";

function Payments() {
  return (
    <div>
      <h1 className="title">Payments</h1>
      <PaymentForm />
      <PaymentList />
    </div>
  );
}

export default Payments;
