import React from "react";
import { dummyData } from "../constants/dummyComents";

function Suggessions() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src="https://img.freepik.com/free-photo/artist-white_1368-3543.jpg"
            alt="profile"
            class="w-12 h-12 rounded-full object-cover border-1 border-gray-300 shadow-md"
          />
          <span className="font-semibold text-sm">Gauresh</span>
        </div>
        <span className="text-sm text-blue-600">Switch</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Suggested for you</span>
        <span className="font-semibold text-sm">See All</span>
      </div>
      {dummyData?.map((val) => {
        return (
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img
                src={val?.picture}
                alt="profile"
                class="w-12 h-12 rounded-full object-cover border-1 border-gray-300 shadow-md"
              />
              <span className="font-semibold text-sm">{val?.username}</span>
            </div>
            <span className="text-sm text-blue-600">Follw</span>
          </div>
        );
      })}
    </div>
  );
}

export default Suggessions;
