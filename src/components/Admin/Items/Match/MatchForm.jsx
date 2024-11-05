import { useEffect, useState } from "react";
import Input from "../../../Ui/FormInput/Input";
import SelectField from "../../../Ui/SelectField/SelectField";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import { dateFormatBackend } from "../../../Helper/dateFormat";
import axios from "axios";
import { toast } from "react-toastify";

export default function MatchForm({ match, closeModal, onFormUpdate }) {

  const [error, setError] = useState(null);
  const [matchState, setMatchState] = useState("SCHEDULED");
  const [startTime, setStartTime] = useState(new Date());
  const [matchWinner, setMatchWinner] = useState("");
  const [team1ResultText, setTeam1ResultText] = useState("");
  const [team2ResultText, setTeam2ResultText] = useState("");

  const matchStateOptions = [
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "WALK_OVER", label: "Walk Over" },
    { value: "DONE", label: "Completed" },
    { value: "SCORE_DONE", label: "Score Completed" },
    { value: "UPCOMING", label: "Upcoming" },
  ];
  const matchWinnerOptions = [
    {
      value: "",
      label: "Not Decided"
    },
    {
      value: parseInt(match.participants[0].id),
      label: (
        <div className="flex items-center">
          <img src={match.participants[0].logo_url} alt={match.participants[0].name} className="w-6 h-6 rounded-full mr-2" />
          <span>{match.participants[0].name}</span>
        </div>
      )
    },
    match.participants.length > 1 && {
      value: parseInt(match.participants[1].id) || "",
      label: (
        <div className="flex items-center">
          <img src={match.participants[1].logo_url} alt={match.participants[1].name} className="w-6 h-6 rounded-full mr-2" />
          <span>{match.participants[1].name}</span>
        </div>
      )
    }
  ];

  useEffect(() => {
    setMatchState(match.state);
    setMatchWinner(match.match_winner);
    setStartTime(match.startTime);
    setTeam1ResultText(match.participants[0].resultText || "");
    if (match.participants.length >= 2) {
      setTeam2ResultText(match.participants[1].resultText || "");
    }
  }, [match]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("matchWinner", matchWinner || "");
    formData.append("startTime", startTime || "");
    formData.append("state", matchState || "");
    formData.append("team1ResultText", team1ResultText || "");
    formData.append("team2ResultText", team2ResultText || "");
    console.log(formData);
    axios.post(`${import.meta.env.VITE_API_URL}api/update/match/${match.id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.data.status) {
          closeModal();
          toast.success(res.data.message);
          onFormUpdate();
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.errors || { message: err.message });
      });
  };

  return (
    <>
      <h1 className="text-center text-2xl"><span className="text-gray-700 font-bold">Tournament Name:</span> <span className="text-gray-900 font-medium">{match.tournament_name}</span></h1>
      <div className="w-full border-t border-gray-300 my-4"></div>
      <h3 className="text-xl font-medium text-gray-900">Match Details: {match.state === 'WALK_OVER' && (
        <span className="text-lg font-semibold text-blue-500">This match is Walk Over (Bye) Winner is {match.participants[0].name}</span>
      )}</h3>

      {match.participants.length >= 2 ? (
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <img src={match.participants[0].logo_url} alt="team_1_logo" className="w-16 h-16 rounded-full mr-3" />
            <h3 className="text-lg font-semibold">{match.participants[0].name}</h3>
          </div>
          <div className="text-2xl font-bold">VS</div>
          <div className="flex items-center">
            <img src={match.participants[1].logo_url} alt="team_2_logo" className="w-16 h-16 rounded-full mr-3" />
            <h3 className="text-lg font-semibold">{match.participants[1].name}</h3>
          </div>
        </div>
      ) : match.participants.length === 1 && (
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <img src={match.participants[0].logo_url} alt="team_1_logo" className="w-16 h-16 rounded-full mr-3" />
            <h3 className="text-lg font-semibold">{match.participants[0].name}</h3>
          </div>
        </div>
      )}
      {match.state !== 'WALK_OVER' && (

        <form onSubmit={handleSubmit}>
          <div className="max-w-3xl mx-auto px-4">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex-1">
                  <Input id="team_1_score"
                    name="resultText-0"
                    label="Team 1 Score"
                    type="text"
                    value={team1ResultText}
                    onChange={(e) => setTeam1ResultText(e.target.value)}
                  />
                </div>
                {match.participants.length >= 2 && (
                  <div className="flex-1">
                    <Input id="team_2_score"
                      name="resultText-1"
                      label="Team 2 Score"
                      type="text"
                      value={team2ResultText}
                      onChange={(e) => setTeam2ResultText(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex-1">
                  <SelectField id="match_state" name="state" label="Match Status"
                    options={matchStateOptions}
                    value={matchStateOptions.find((option) => option.value === matchState)}
                    onChange={(selectedOption) => setMatchState(selectedOption.value)}
                    className="h-12 w-full" />
                  {error?.state && <p className="text-red-500 text-sm">{error.state}</p>}
                </div>
                <div className="flex-1">
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Match Start Time</label>
                  <Flatpickr
                    required={true}
                    name="startTime"
                    id="startTime"
                    value={match.startTime}
                    options={{
                      dateFormat: "Y-m-d",
                      defaultDate: match.startTime,
                    }}
                    onChange={(date) => setStartTime(dateFormatBackend(date[0]))}
                    className="h-12 w-full border rounded-lg px-3 py-2 focus:outline-orange-400"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex-1">
                  <SelectField
                    required={true}
                    label="Match Winner"
                    placeholder="Select Match Winner"
                    id="match_winner"
                    name="matchWinner"
                    searchable={false}
                    options={matchWinnerOptions}
                    value={matchWinnerOptions.find((option) => option.value === matchWinner)}
                    onChange={(selectedOption) =>
                      setMatchWinner(selectedOption.value)
                    }
                  />
                  {error?.matchWinner && <p className="text-red-500 text-sm">{error.matchWinner}</p>}
                </div>
                <div className="flex-1">
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Submit</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
