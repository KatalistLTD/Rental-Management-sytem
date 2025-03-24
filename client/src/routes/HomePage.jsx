import { motion } from "framer-motion";
import { BarChart, CreditCard, Home, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Login from "../routes/pages/Login";
import Signup from "../routes/pages/Signup";

const HomePage = () => {
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-gray-100 overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: "3rem",
            }}
          >
            {index % 2 === 0 ? "🏠" : "💰"}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <header className="text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Rental Management System v1.0
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-80">
          Simplify property management with automated rent collection, expense
          tracking, and tenant management.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setModalType("signup")}
            className="px-8 py-3 text-lg font-semibold bg-white text-blue-600 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => setModalType("login")}
            className="px-8 py-3 text-lg font-semibold bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-400 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Home size={50} />}
          title="Property Management"
          description="Manage properties, tenants, and maintenance requests in one place."
        />
        <FeatureCard
          icon={<CreditCard size={50} />}
          title="Payments & Invoicing"
          description="Automate rent collection and invoice generation with ease."
        />
        <FeatureCard
          icon={<BarChart size={50} />}
          title="Reports & Analytics"
          description="Gain insights into financial performance with real-time analytics."
        />
        <FeatureCard
          icon={<Wrench size={50} />}
          title="Maintenance Requests"
          description="Allow tenants to submit maintenance requests and track progress."
        />
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-bold">
          Start Managing Your Rentals Smarter Today
        </h2>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setModalType("signup")}
            className="px-8 py-3 text-lg font-semibold bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-400 transition"
          >
            Sign Up Now
          </button>
          <button
            onClick={() => setModalType("login")}
            className="px-8 py-3 text-lg font-semibold bg-white text-blue-600 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* Modal Popup for Login & Signup */}
      {modalType && (
        <Modal isOpen onClose={() => setModalType(null)}>
          {modalType === "login" ? <Login /> : <Signup />}
        </Modal>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-8 shadow-lg rounded-2xl text-center transform hover:scale-105 transition"
    whileHover={{ scale: 1.1 }}
  >
    <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </motion.div>
);

export default HomePage;
