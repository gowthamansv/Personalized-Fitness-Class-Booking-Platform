import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ClassDetails = () => {
  const [classDetails, setClassDetails] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchClass = async () => {
      const response = await axios.get(
        "https://personalized-fitness-class-booking.onrender.com/api/booking/trainer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setClassDetails(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    };
    fetchClass();
  }, []);

  const handleStatus = async (item) => {
    if (item.status === "Completed" || item.status === "Cancelled") {
      return toast.info("Already updated");
    }
    toast(
      ({ closeToast }) => (
        <div>
          <p>Did class completed or cancelled?</p>
          <button
            onClick={async () => {
              closeToast();
              await saveChanges(item, "Completed");
            }}
            className="m-2 p-2 bg-primary rounded-lg text-black"
          >
            Completed
          </button>
          <button
            onClick={async () => {
              closeToast();
              await saveChanges(item, "Cancelled");
            }}
            className="m-2 p-2 bg-primary rounded-lg text-black"
          >
            Cancelled
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const saveChanges = async (item, status) => {
    try {
      const response = await axios.put(
        "https://personalized-fitness-class-booking.onrender.com/api/booking/updatestatus",
        {
          slotTime: item.slotTime,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success("class updated");
      window.location.reload();
    } catch (error) {
      toast.error("error while updating");
    }
  };
  return (
    <div className="w-fit mx-10 p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15">
      <h1 className="text-2xl text-balance text-gray-900 sm:text-xl">Class</h1>
      <table className="w-full overflow-hidden">
        <thead>
          <tr className="text-lg">
            <th className="p-4 text-center">Class</th>
            <th className="p-4 text-center w-1/3">Date & Time</th>
            <th className="p-4 text-center">User</th>
            <th className="p-4 text-center">Update</th>
          </tr>
        </thead>
        <tbody className="">
          {classDetails.map((item, index) => (
            <tr key={index} className="">
              <td className="p-6 font-medium text-gray-900">{item.class}</td>
              <td className="p-6">
                <span className="block text-lg font-semibold">
                  {item.slotTime.date}
                </span>
                <span className="block text-sm text-gray-700">
                  From: {item.slotTime.starttime} - To: {item.slotTime.endtime}
                </span>
              </td>
              <td className="p-6 text-gray-800">{item.user.name}</td>
              <td className="p-6 text-gray-800">
                <button
                  className="bg-primary px-4 py-2 rounded-xl text-lg uppercase text-background cursor-pointer"
                  onClick={(e) => handleStatus(item)}
                >
                  {item.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassDetails;
