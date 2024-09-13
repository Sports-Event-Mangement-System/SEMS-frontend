import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import FullDetailsModal from './FullDetailsModal';
import { toast } from 'react-toastify';

export default function AdminContact() {
  const [contactData, setContactData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/contacts`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setContactData(response.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchContactDetails = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/show/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setSelectedContact(response.data.contact);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const confirmDelete = (id) => {
    setContactToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteContact = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}api/delete/contacts/${contactToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      toast.success(response.data.message);
      fetchContact();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <>
      <div className="p-4 w-full shadow-2xl">
        {showModal && <FullDetailsModal closeModal={closeModal} contactDetails={selectedContact} />}

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Are you sure want to delete?</h2>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-500"
                  onClick={deleteContact}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <table className="table-auto w-full">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-start">S.N</th>
              <th className="px-6 py-3 text-start">Full Name</th>
              <th className="px-6 py-3 text-start">Email</th>
              <th className="px-6 py-3 text-start">Phone Number</th>
              <th className="px-6 py-3 text-start">Message</th>
              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {contactData.length > 0 ? (
              contactData.map((contact, index) => (
                <tr className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-start" key={contact.id}>
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{contact.first_name + ' ' + contact.last_name}</td>
                  <td className="px-6 py-3">{contact.email}</td>
                  <td className="px-6 py-3">{contact.phone_number}</td>
                  <td className="px-6 py-3">
                    {contact.message.split(' ').slice(0, 3).join(' ') + '...'}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="flex justify-center bg-blue-600 text-white rounded-xl w-14 py-2 hover:bg-blue-500" onClick={() => fetchContactDetails(contact.id)}>
                        <FaEye />
                      </button>
                      <button onClick={() => confirmDelete(contact.id)} className="flex justify-center bg-red-600 hover:bg-red-500 text-white rounded-xl w-16 py-2">
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
