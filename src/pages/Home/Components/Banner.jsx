import React from "react";
import "../../../App.css";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full banner-3 h-72 flex justify-center items-center lg:h-[700px]">
      <div className="text-white font-bold text-center lg:space-y-6 ">
        <h2 className="text-3xl lg:text-6xl font-playfair mb-7 lg:mb-5 text-center">
          ACS Grand celebration 2025
        </h2>
        <p className="text-gray-200 w-3/4 mb-6 mx-auto font-normal lg:font-semibold">
          We are working with huge students. Most of our students cracks their
          dream university and we welcomed them through these type of events.
        </p>
        <Link to="/classes">
          <button className="btn btn-primary">Wanna join with us?</button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
