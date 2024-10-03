import React, { useEffect } from "react";
import axios from "axios";

export default function TeamTable() {

  useEffect (() => {
      const fetchTeam = async () => {
          try{
              const response = await axios.get(`${import.meta.env.VITE_API_URL}api/teams`, 
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                }
              )
              console.log(response.data)
          }
          catch(err){
              console.log(err)
          }
      }

      fetchTeam();

  }, [])


  return (
    <>
      
      <div className="p-4 w-full shadow-2xl">
        
        <table className="table-auto w-full border-spacing-1 border border-gray-200">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-start">S.N.</th>
              <th className="px-6 py-3 text-start">Team Name</th>
              <th className="px-6 py-3 text-start">Team Coach</th>
              <th className="px-6 py-3 text-start">Team Logo</th>
              <th className="px-6 py-3 text-start">Email</th>
              <th className="px-6 py-3 text-start">Phone Number</th>
              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <tr className="text-start">
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
