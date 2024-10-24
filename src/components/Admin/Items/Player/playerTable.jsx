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

export default function PlayerTable() {
    const [players, setPlayers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);
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
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}api/players`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            console.log(response.data.data);
            setPlayers(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPlayer();
    }, []);

    const showTeamDetails = async (id) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}api/show/team/${id}`
            );
            console.log(response.data);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching contact details:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/editTeamForm/${id}`);
    };


    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setTeamToDelete(null);
    };

    const confirmDelete = (id) => {
        setTeamToDelete(id);
        setShowDeleteModal(true);
    };

    const deleteTeam = async () => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL
                }api/delete/team/${teamToDelete}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            fetchTeam();
            closeDeleteModal();
            if (response.data.status) {
                toast.success(response.data.message);
            }
        } catch (err) {
            toast.error("Error deleting team");
        }
    }
    return (
        <>
            <div className="p-4 w-full shadow-2xl">
                {showDeleteModal && (
                    <Modal closeModal={closeDeleteModal}>
                        <div className='flex justify-center mb-12 mt-5'>
                            <RiDeleteBin6Line size={80} color='rgb(255,140,0)' />
                        </div>
                        <div className="text-xl font-semibold flex justify-center">Are you sure?</div>
                        <div className="text-lg font-medium text-gray-500 mt-3 flex justify-center">
                            Are you sure want to delete this Team?
                        </div>
                        <div className="flex justify-center mt-4 gap-3">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                                onClick={deleteTeam}
                            >
                                Yes, Delete it!
                            </button>
                        </div>
                    </Modal>
                )}
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
                                        <button className="bg-red-500 text-white rounded-xl w-16 py-2 flex justify-center"
                                            onClick={() => confirmDelete(team.id)}>
                                            <MdDelete />
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
