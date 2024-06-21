import React, { useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import ReviewStep from "../components/ReviewStep"; // Ensure correct path

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });

  const updateFormData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = () => {
    // e.preventDefault();
    // handleConfirmation();
  };

  return (
    <div className="container mx-auto p-6 grid ">
      <div className="bg-white p-2 rounded-lg shadow-md w-full">
        {currentStep === 1 && (
          <Step1
            nextStep={handleNextStep}
            updateFormData={(data) => updateFormData("step1", data)}
            formData={formData.step1}
          />
        )}
        {currentStep === 2 && (
          <Step2
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
            updateFormData={(data) => updateFormData("step2", data)}
            formData={formData.step2}
          />
        )}
        {currentStep === 3 && (
          <Step3
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
            updateFormData={(data) => updateFormData("step3", data)}
            formData={formData.step3}
          />
        )}
        {currentStep === 4 && (
          <Step4
            nextStep={() => setCurrentStep(5)} // Move to review step
            prevStep={handlePrevStep}
            updateFormData={(data) => updateFormData("step4", data)}
            formData={formData.step4}
          />
        )}
        {currentStep === 5 && (
          <ReviewStep
            prevStep={() => setCurrentStep(4)}
            formData={formData}
          // onSubmit={handleFinalSubmit}
          />
        )}
      </div>
      {/* <div className="w-2/4 mr-6">
        <img src="./img/hinhLogin.png" alt="form illustration" />
      </div> */}
    </div>
  );
};

export default OrderForm;
