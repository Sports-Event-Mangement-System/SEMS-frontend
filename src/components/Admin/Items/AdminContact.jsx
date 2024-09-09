import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function AdminContact() {
  const [contactData, setContactData] = useState([]);
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/contacts`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        console.log(response.data);
        setContactData(response.data.contacts);
        console.log(contactData)
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContact();
  }, []);

  return (
    <>
      <div className="p-4 w-full shadow-2xl">
        <table className="table-auto w-full">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-start">S.N</th>
              <th className="px-6 py-3 text-start">Full Name</th>
              <th className="px-6 py-3 text-start">Email</th>
              <th className="px-6 py-3 text-start">Phone Number</th>
              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody
            className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"

          >
            {contactData.length > 0 ? (
              contactData.map((contact, index) => (
                <tr
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-start"
                  key={contact.id}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{contact.first_name + ' ' + contact.last_name}</td>
                  <td className="px-6 py-3">{contact.email}</td>
                  <td className="px-6 py-3">{contact.phone_number}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="flex justify-center bg-blue-500 text-white rounded-xl w-14 py-2">
                        <FaEye />
                      </button>
                      <button
                        className="flex justify-center bg-red-500 text-white rounded-xl w-16 py-2"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center">No data</td> {/* Message when no data */}
              </tr>
            )}


          </tbody>
        </table>
      </div>
    </>
  );
}
