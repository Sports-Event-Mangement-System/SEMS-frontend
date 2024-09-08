import React, { useContext, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TournamentTable() {


  return (
    <>
      <div className="p-4 w-full shadow-2xl">
        <table className="table-auto w-full">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-start">S.N.</th>
              <th className="px-6 py-3 text-start">Tournament Name</th>
              <th className="px-6 py-3 text-start">Starting Date</th>
              <th className="px-6 py-3 text-start">Ending Date</th>
              <th className="px-6 py-3 text-start">Logo</th>
              <th className="px-6 py-3 text-start">Number of Teams</th>
              <th className="px-6 py-3 text-start">Status</th>
              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody
              className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              
            >
            
              <tr
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-start"
              >
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"><img src='' alt='' /></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3">
                  <button
                    className={`bg-green-600 text-white rounded-xl w-20 py-2`}
                  >
                  </button>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white rounded-xl w-14 py-2">
                    <MdEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-xl w-16 py-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            
          </tbody>
        </table>
      </div>
    </>
  );
}
