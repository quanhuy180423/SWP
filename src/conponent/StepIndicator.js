import React from "react";
import "../css/StepIndicator.css";

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="step-indicator">
      {["Personal Info", "Material & Category", "Diamond Details", "Additional Details"].map((label, index) => (
        <div key={index} className={`step ${currentStep >= index + 1 ? "active" : ""}`}>
          <div className="circle">{index + 1}</div>
          <div className="label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
