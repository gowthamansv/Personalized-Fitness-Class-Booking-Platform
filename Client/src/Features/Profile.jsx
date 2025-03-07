import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = ({ user, isTrainer }) => {
  const [detail, setDetail] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const token = localStorage.getItem("token");
  const [isuse, setIsUse] = useState(isTrainer);
  const loginType = isuse ? "trainer" : "user";

  useEffect(() => {
    if (Array.isArray(user)) {
      setDetail(user);
    } else {
      setDetail([user]); // Convert object to array
    }
  }, [user]);

  const handleChange = (e, index, field) => {
    const updatedDetails = [...detail];
    updatedDetails[index][field] = e.target.value;
    setDetail(updatedDetails);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setIsEdit(true);
  };

  const handleSave = async (event, item) => {
    event.preventDefault();

    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to save changes?</p>
          <button
            onClick={async () => {
              closeToast();
              await saveChanges(item);
            }}
            className="m-2 p-2 bg-primary rounded-lg text-black"
          >
            OK
          </button>
          <button
            onClick={() => {
              closeToast();
              window.location.reload();
            }}
            className="m-2 p-2 bg-primary rounded-lg text-black"
          >
            Cancel
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const saveChanges = async (item) => {
    setIsEdit(false);
    try {
      const response = await axios.put(
        `https://personalized-fitness-class-booking.onrender.com/${loginType}`,
        {
          name: item.name,
          email: item.email,
          phoneNumber: item.phoneNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success("User updated", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while updating", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15">
      {detail.map((item, index) => (
        <form
          action=""
          key={index}
          className="grid grid-flow-row grid-cols-2 grid-rows-4 gap-10"
        >
          <div className="col-span-2 flex justify-center items-center">
            <h1 className="text-2xl text-balance text-gray-900 sm:text-xl">
              Personal
            </h1>
          </div>
          <div>
            <label className="block text-sm/6 font-semibold text-gray-900">
              Name
            </label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleChange(e, index, "name")}
              disabled={!isEdit}
              className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm/6 font-semibold text-gray-900">
              Phone Number
            </label>
            <input
              type="number"
              value={item.phoneNumber}
              onChange={(e) => handleChange(e, index, "phoneNumber")}
              disabled={!isEdit}
              className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm/6 font-semibold text-gray-900">
              Email
            </label>
            <input
              type="text"
              value={item.email}
              onChange={(e) => handleChange(e, index, "email")}
              disabled={!isEdit}
              className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
            />
          </div>
          <div className="col-span-2 flex justify-evenly items-center gap-5">
            {isEdit ? (
              <button
                className="bg-primary px-4 py-2 rounded-xl text-lg uppercase text-background cursor-pointer"
                onClick={(event) => handleSave(event, item)}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-primary px-4 py-2 rounded-xl text-lg uppercase text-background cursor-pointer"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      ))}
    </div>
  );
};

export default Profile;
