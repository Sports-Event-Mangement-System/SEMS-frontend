import Input from "../../../Ui/FormInput/Input";

export default function MatchForm({ match }) {
  return (
    <>
        <h1 className="text-center text-2xl"><span className="text-gray-700 font-bold">Tournament Name:</span> <span className="text-gray-900 font-medium">{match.tournament_name}</span></h1>
        <div>
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">Match Details</h3>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Input id="team_1" label="Team 1" required={true} />
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Input label="Team 2" id="team_2" type="text" required={true} />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Submit</button>
            </div>
          </div>        
        </div>
    </>
  )
}
