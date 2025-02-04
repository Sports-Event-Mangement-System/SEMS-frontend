import React, { useState } from "react";
import FixtureTable from "../../../Ui/RoundRobinBracket/FixtureTable";
import PointsTable from "../../../Ui/RoundRobinBracket/PointsTable";
// import { SampleRounds } from "./SampleRounds";

const RoundRobinBracket = ({ matches, max_rounds, pointsTable }) => {
  return (
    <div>
      {/* Loop through each round and display its matches */}
      <div className="mt-4 ml-4">
        <div className="flex gap-8">
          {/* Fixture Table */}
          <div className="w-6/12">
            <FixtureTable matches={matches} max_rounds={max_rounds} />
          </div>

          {/* Score Table */}
          <div className="w-6/12">
            <PointsTable pointsTable={pointsTable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundRobinBracket;
