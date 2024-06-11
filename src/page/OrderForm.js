import React, { useState } from "react";
import Step1 from "../conponent/Step1";
import Step2 from "../conponent/Step2";
import Step3 from "../conponent/Step3";
import Step4 from "../conponent/Step4";

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {}, // Add step4 object here
  });

  const updateFormData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data, // Lưu dữ liệu từ mỗi bước vào formData
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (data) => {
    console.log("Final Data:", data);
    // Handle final form submission
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-2">
      <div className="bg-white p-2 rounded-lg shadow-md w-full">
        {currentStep === 1 && (
          <Step1
            nextStep={handleNextStep}
            updateFormData={(data) => updateFormData("step1", data)}
            formData={formData.step1} // Pass step1 data
          />
        )}
        {currentStep === 2 && (
          <Step2
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
            updateFormData={(data) => updateFormData("step2", data)}
            formData={formData.step2} // Pass step2 data
          />
        )}
        {currentStep === 3 && (
          <Step3
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
            updateFormData={(data) => updateFormData("step3", data)}
            formData={formData.step3} // Pass step3 data
          />
        )}
        {currentStep === 4 && (
          <Step4
            prevStep={handlePrevStep}
            formData={formData} // Pass all form data
            onSubmit={handleSubmit}
            updateFormData={(data) => updateFormData("step4", data)}
          />
        )}
      </div>
      <div className="w-2/4 mr-6 ">
        <img src="./img/hinhLogin.png" alt="hình form" />
      </div>
    </div>
  );
};

export default OrderForm;
