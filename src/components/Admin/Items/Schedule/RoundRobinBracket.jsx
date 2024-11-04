import React, { useState } from "react";
import FixtureTable from "../../../Ui/RoundRobinBracket/FixtureTable";
import PointsTable from "../../../Ui/RoundRobinBracket/PointsTable";
// import { SampleRounds } from "./SampleRounds";

const RoundRobinBracket = ({ matches, max_rounds }) => {
  console.log(matches);
  matches.map((match) => {
    console.log(match.participants);
  });

  return (
    <div>
      {/* Loop through each round and display its matches */}
      <div className="mt-4">
        <div className="flex gap-8">
          {/* Fixture Table */}
          <FixtureTable matches={matches} max_rounds={max_rounds} />

          {/* Score Table */}
          <PointsTable matches={matches} />
        </div>
      </div>
    </div>
  );
};

export default RoundRobinBracket;
