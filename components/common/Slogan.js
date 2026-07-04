import React from "react";
import { sloganItems } from "@/constants/general";

const Slogan = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 py-8 gap-4 md:gap-8">
      <h2 className="col-span-full text-primary text-xl font-semibold">
        چرا تشریفات رز؟
      </h2>

      {sloganItems.map((slogan, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          <img
            src={slogan.icon}
            alt={slogan.title}
            className="w-24 h-24 object-contain"
          />

          <div className="text-center mt-4">
            <h3 className="text-textMain text-lg font-semibold">
              {slogan.title}
            </h3>

            <h4 className="text-textSecondary"> {slogan.description} </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slogan;
