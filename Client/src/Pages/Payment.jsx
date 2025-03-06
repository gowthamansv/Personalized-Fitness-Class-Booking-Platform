import React, { useEffect, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Appbar from "../Layouts/Appbar";
import axios from "axios";
import { toast } from "react-toastify";
import icon from "../assets/gym.svg";
import FileViewer from "../Components/FileViewer";

const Payment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);
  const token = localStorage.getItem("token");
  const [isPaid, setIsPaid] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plan");
        setPlan(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load user data"); // Set error message
        setLoading(false); // Stop loading on error
        toast.error("Failed to load user data", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    };
    const fetchPayment = async () => {
      try {
        if (!token) {
          console.error("Token is missing");
          return;
        }
        const response = await axios.get(
          "http://localhost:3001/user/checkpayment",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
              "Content-Type": "application/json",
            },
          }
        );
        setIsPaid(response.data.isPaid);
        console.log(response.data.isPaid);
        setUser(Array.isArray(response.data) ? response.data : [response.data]);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load user payment", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setError("Failed to load user payment"); // Set error message
        setLoading(false); // Stop loading on error
      }
    };
    fetchPayment();
    if (!isPaid) {
      fetchData();
    }
  }, [isPaid]);

  const paymentHandler = async (e, price, receiptId) => {
    e.preventDefault(); // Prevent default action

    const amount = price / 10; // Convert price as required
    const currency = "INR";
    const receipt = receiptId.toLowerCase().replace(/\s+/g, ""); // Format receiptId
    const KEYID = import.meta.env.RAZORPAY_KEY_ID;

    try {
      const response = await axios.post("http://localhost:3001/payment", {
        amount,
        currency,
        receipt,
      });

      setOrder(response.data);
      console.log(response.data);
      var options = {
        key: KEYID, // Enter the Key ID generated from the Dashboard
        amount: response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "FitCenter Gym",
        description: "Test Transaction",
        image: "your-image",
        order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const result = await axios.post(
            "http://localhost:3001/payment/payorder",
            {
              plan: receiptId,
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in Authorization header
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          alert(result.data.message);
          setIsPaid(true);
          toast.message(result.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
          // fetchOrders();
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setError("An error occurred"); // Set error message
      toast.error("Failed to process payment", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex w-screen h-screen flex-col">
      <Appbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full flex">
        <Sidebar isOpen={isOpen} />
        <div className="w-full">
          {loading ? (
            <div className="">
              <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                {/* ... */}
              </svg>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="">
              <p>{error}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-10 w-full h-[88vh] justify-center items-center">
              <h1 className="text-2xl text-accent">Payment</h1>
              {isPaid ? (
                <div className="flex w-fit bg-secondary bg-opacity-15 flex-col justify-center items-center gap-2 p-5 rounded-2xl shadow-2xl">
                  {Array.isArray(user) ? (
                    user.map((to, index) => (
                      <div key={index} className="text-center">
                        <h1>Hi {to.name}</h1>
                        <p>You already purchased {to.plan}</p>
                      </div>
                    ))
                  ) : (
                    <p>
                      Hi {user.name}, You already purchased {user.plan}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-flow-row mobile:grid-flow-col gap-14 p-2 mobile:p-10">
                  {plan.map((list) => (
                    <div className="flex bg-secondary bg-opacity-15 flex-col justify-center items-center gap-2 p-5 rounded-2xl shadow-2xl">
                      <h1 className="font-semibold text-2xl text-accent">
                        {list.title}
                      </h1>
                      <div className="flex flex-col items-center gap-2">
                        <h1 className="text-secondary">Description</h1>
                        <p>{list.description}</p>
                      </div>
                      <div className="flex flex-col items-center w-full">
                        <h1 className="text-secondary">Features</h1>
                        <ul className="text-left w-full list-disc list-inside">
                          {list.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <p>
                        <span className="text-3xl font-semibold text-white">
                          &#8377;{list.price}
                        </span>
                        /Month
                      </p>
                      <button
                        className="w-full py-2 rounded-3xl shadow-2xl bg-primary text-background"
                        onClick={(e) =>
                          paymentHandler(e, list.price, list.title)
                        }
                      >
                        Choose Plan
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
