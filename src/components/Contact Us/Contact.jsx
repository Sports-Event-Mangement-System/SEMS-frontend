import React, { useState } from "react";
import Input from "../Ui/FormInput/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleContact = async (e) => {
    e.preventDefault();
    const first_name = e.target.elements.first_name.value;
    const last_name = e.target.elements.last_name.value;
    const email = e.target.elements.email.value;
    const phone_number = e.target.elements.phone_number.value;
    const message = e.target.elements.message.value;

    const contactValues = {
      first_name,
      last_name,
      email,
      phone_number,
      message,
    };

    console.log(contactValues);
    axios
      .post(`${import.meta.env.VITE_API_URL}api/store/contacts`, contactValues)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          setError("");
          toast.success(response.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.errors;
        setError(errorMessage ? errorMessage : {});
        console.log(error);
      });
  };

  return (
    <>
      <div className="h-screen flex mt-14 justify-center">
        <div className="shadow-2xl rounded-2xl h-fit bg-slate-200 sm:w-3/4 md:w-2/3 lg:w-1/2 ">
          <h1 className="text-3xl text-center text-orange-600 font-semibold mt-10">
            Contact Us
          </h1>
          <p className="text-md text-center text-orange-600 font-normal">
            We will get back to you asap!
          </p>
          <form
            onSubmit={handleContact}
            action=""
            className="flex flex-col items-center p-6 sm:p-10 gap-6"
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="w-full sm:w-1/2">
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    className="w-full"
                    required={true}
                  />
                  {error.first_name && (
                    <span className="text-red-500 text-md">
                      {error.first_name}
                    </span>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    className="w-full"
                    required={true}
                  />
                  {error.last_name && (
                    <span className="text-red-500 text-md">
                      {error.last_name}
                    </span>
                  )}
                </div>
              </div>
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                name="email"
                className="w-full"
                required={true}
              />
              {error.email && (
                <span className="text-red-500 text-md">{error.email}</span>
              )}
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Phone"
                name="phone_number"
                className="w-full"
              />
              {error.phone_number && (
                <span className="text-red-500 text-md">
                  {error.phone_number}
                </span>
              )}
              <div>
                <label htmlFor="message">
                  Message <span className="text-red-500 text-md">*</span>
                </label>
                <textarea
                  placeholder="Message"
                  name="message"
                  className="h-24 w-full border rounded-lg px-3 py-2 focus:outline-orange-400"
                ></textarea>
                {error.message && (
                  <span className="text-red-500 text-md">{error.message}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white px-20 py-2 font-semibold rounded-lg hover:bg-orange-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
