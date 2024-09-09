import React from 'react'

export default function AdminContact() {
  return (
    <>
      <div className="p-4 w-full shadow-2xl">
        <table className="table-auto w-full">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-start">I.D</th>
              <th className="px-6 py-3 text-start">First Name</th>
              <th className="px-6 py-3 text-start">Last Name</th>
              <th className="px-6 py-3 text-start">Email</th>
              <th className="px-6 py-3 text-start">Phone Number</th>
            </tr>
          </thead>
          <tbody
            className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"

          >


            <tr
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-start"
            >
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">Subash</td>
              <td className="px-6 py-3">Tamang</td>
              <td className="px-6 py-3">subashtmg217@gmail.com</td>
              <td className="px-6 py-3">9876543321</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
