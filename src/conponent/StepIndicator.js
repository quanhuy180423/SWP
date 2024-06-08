import React from "react";

const StepIndicator = ({ currentStep }) => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-5 relative w-90">
          {[
            "Personal Info",
            "Material & Category",
            "Diamond Details",
            "Additional Details",
          ].map((label, index) => (
            <div key={index} className="w-1/4 text-center relative z-10">
              <div
                className={`inline-block w-8 h-8 leading-8 rounded-full mb-2 transition-colors ${
                  currentStep >= index + 1
                    ? "bg-green-500 text-white font-bold"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`transition-colors ${
                  currentStep >= index + 1 ? "text-green-500" : "text-gray-500"
                }`}
              >
                {label}
              </div>
            </div>
          ))}
          <div className="absolute top-1/2 w-full h-1 bg-gray-300 z-0"></div>
          <div
            className={`absolute top-1/2 h-1 bg-green-500 z-0 transition-all`}
            style={{ width: `${(currentStep - 1) * 33.333333}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default StepIndicator;
