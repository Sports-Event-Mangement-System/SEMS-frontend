import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import LoaderSpinner from "../../../../Spinner/LoaderSpinner";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Ui/Modal/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../../../Ui/Pagination/Pagination";
import RollingBall from "../../../Ui/RollingBall/RollingBall";

export default function PlayerTable() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlayers = players.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(players.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchPlayer = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}api/players`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setLoading(false);
            setPlayers(response.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayer();
    }, []);

    const handleEdit = (id) => {
        navigate(`/admin/editTeamForm/${id}`);
    };

    if (loading) {
        return (
          <div className="relative min-h-[600px]">
            <RollingBall
              size={100}
              centered={true}
            />
          </div>
        );
    }

    return (
        <>
            <div className="p-4 w-full shadow-2xl">
                <table className="table-auto w-full border-spacing-1 border border-gray-200">
                    <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-200 font-bold">
                        <tr>
                            <th className="px-6 py-3 text-start">S.N.</th>
                            <th className="px-6 py-3 text-start">Player Name</th>
                            <th className="px-6 py-3 text-start">Player Email</th>
                            <th className="px-6 py-3 text-start">Player Team</th>
                            <th className="px-6 py-3 text-start">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white hover:bg-gray-50">
                        {currentPlayers.map((player, index) => (
                            <tr key={index} className="text-start border dark:text-gray-200 dark:border-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium">
                                <td className="px-6 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="px-6 py-3">{player.player_name} {player.is_captain === 1 && (
                                    <span className="text-green-500 font-bold">(Captain)</span>
                                )}</td>
                                <td className="px-6 py-3">{player.player_email}</td>
                                <td className="px-6 py-3">{player.team.team_name}</td>
                                <td className="px-6 py-3">
                                    <div className="flex gap-2">
                                        <button className="bg-blue-500 text-white rounded-xl w-14 py-2 flex justify-center" onClick={() => handleEdit(team.id)}>
                                            <MdEdit />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}
