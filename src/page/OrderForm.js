import React, { useState } from "react";
import Step1 from "../conponent/Step1";
import Step2 from "../conponent/Step2";
import Step3 from "../conponent/Step3";
import Step4 from "../conponent/Step4";
import StepIndicator from "../conponent/StepIndicator";

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState([true, false, false, false]);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });

  const updateFormData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        ...data,
      },
    }));
  };

  const toggleStepVisibility = (stepIndex) => {
    setVisibleSteps((prevVisibleSteps) => {
      const newVisibleSteps = [...prevVisibleSteps];
      newVisibleSteps[stepIndex] = !newVisibleSteps[stepIndex];
      return newVisibleSteps;
    });
  };

  const handleNextStep = (stepIndex) => {
    if (stepIndex < visibleSteps.length - 1) {
      setVisibleSteps((prevVisibleSteps) => {
        const newVisibleSteps = [...prevVisibleSteps];
        newVisibleSteps[stepIndex] = false;
        newVisibleSteps[stepIndex + 1] = true;
        return newVisibleSteps;
      });
      setCurrentStep(stepIndex + 2);
    }
  };

  const handlePrevStep = (stepIndex) => {
    if (stepIndex > 0) {
      setVisibleSteps((prevVisibleSteps) => {
        const newVisibleSteps = [...prevVisibleSteps];
        newVisibleSteps[stepIndex] = false;
        newVisibleSteps[stepIndex - 1] = true;
        return newVisibleSteps;
      });
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = (data) => {
    console.log("Final Data:", data);
    // Handle final form submission
  };

  return (
    <div className="container mx-auto p-6 flex">
      <div className="w-2/4 mr-6">
        {/* <StepIndicator currentStep={currentStep} /> */}
      </div>
      <div className="w-2/4 bg-white p-2 rounded-lg shadow-md">
        {[Step1, Step2, Step3, Step4].map((StepComponent, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={() => toggleStepVisibility(index)}
              className="w-full text-left bg-gray-200 py-2 px-4 rounded-lg mb-2"
            >
              Step {index + 1}:{" "}
              {
                [
                  "Thông tin người đặt hàng",
                  "Chất liệu và loại trang sức gia công",
                  "Mô tả kim cương",
                  "Mô tả thêm từ khách hàng",
                ][index]
              }
            </button>
            {visibleSteps[index] && (
              <StepComponent
                nextStep={() => handleNextStep(index)}
                prevStep={() => handlePrevStep(index)}
                updateFormData={(data) =>
                  updateFormData(`step${index + 1}`, data)
                }
                step1Data={formData.step1}
                step2Data={formData.step2}
                step3Data={formData.step3}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderForm;
