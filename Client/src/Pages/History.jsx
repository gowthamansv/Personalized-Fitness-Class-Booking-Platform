import axios from "axios";
import Sidebar from "../Layouts/Sidebar";
import Appbar from "../Layouts/Appbar";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingSlot, setBookingSlot] = useState([]);
  const [upcomingClass, setUpcomingClass] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingSlot = async () => {
      try {
        const response = await axios.get(
          "https://personalized-fitness-class-booking.onrender.com/booking/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const currentDate = new Date();

        const bookingSlots = Array.isArray(response.data)
          ? response.data
          : [response.data];

        const upcomingClasses = [];
        const finishedClasses = [];

        bookingSlots.forEach((slot) => {
          const slotDate = new Date(slot.slotTime.date);
          if (slotDate >= currentDate) {
            upcomingClasses.push(slot);
          } else {
            finishedClasses.push(slot);
          }
        });

        setUpcomingClass(upcomingClasses);
        setBookingSlot(finishedClasses);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchBookingSlot();
  }, []);

  const handleCancel = async (item) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Did you want to cancel the class?</p>
          <button
            onClick={async () => {
              closeToast();
              await deleteClass(item);
            }}
            className="m-2 p-2 bg-primary rounded-lg text-black"
          >
            yes
          </button>
          <button
            onClick={() => {
              closeToast();
            }}
            className="m-2 p-2 bg-primary rounded-lg text-black"
          >
            No
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const deleteClass = async (item) => {
    try {
      const response = await axios.delete(
        "https://personalized-fitness-class-booking.onrender.com/booking/delete",
        {
          data: { id: String(item._id), slotTimeId: String(item.slotTime._id) },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const msg = response.data.message;
      toast.success(msg);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-screen h-screen flex-col">
      <Appbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full flex">
        <Sidebar isOpen={isOpen} />
        <div className="w-full">
          {loading ? (
            <div className="">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="">
              <p>{error}</p>
            </div>
          ) : (
            <div className="w-full flex gap-10 flex-col justify-center items-center">
              <h1 className="text-2xl">Class</h1>
              <div className="w-full flex flex-col items-center">
                <h1 className="text-2xl">Upcoming Class</h1>
                {upcomingClass.length > 0 ? (
                  <table className="">
                    <thead>
                      <tr>
                        <th className="p-5">class</th>
                        <th className="p-5">Date</th>
                        <th className="p-5">Trainer</th>
                        <th className="p-5">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingClass.map((item) => (
                        <tr key={item._id}>
                          <td className="p-5">{item.class}</td>
                          <td className="p-5">{item.slotTime.date}</td>
                          <td className="p-5">{item.trainer}</td>
                          <td className="p-5">
                            <button
                              className="bg-primary px-4 py-2 rounded-xl uppercase text-background"
                              onClick={() => handleCancel(item)}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="">
                    <h1>You didn't book the class</h1>
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col items-center">
                <h1 className="text-2xl">Booking history</h1>
                <table className="">
                  <thead>
                    <tr>
                      <th className="p-5">class</th>
                      <th className="p-5">Date</th>
                      <th className="p-5">Trainer</th>
                      <th className="p-5">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingSlot.map((item) => (
                      <tr key={item._id}>
                        <td className="p-5">{item.class}</td>
                        <td className="p-5">{item.slotTime.date}</td>
                        <td className="p-5">{item.trainer}</td>
                        <td className="p-5">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
