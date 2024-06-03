import React, { useState } from "react";
import Step1 from "../conponent/Step1";
import Step2 from "../conponent/Step2";
import Step3 from "../conponent/Step3";
import Step4 from "../conponent/Step4";
import StepIndicator from "../conponent/StepIndicator";
// import Header from "../conponent/Header";

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    material: "",
    weight: "",
    size: "",
    category: "",
    color: "",
    clarity: "",
    cut: "",
    carat: "",
    richText: "",
  });

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    // Gửi dữ liệu formData đi ở đây
    const jsonFormData = JSON.stringify(formData);
    console.log(jsonFormData);
    console.log(formData)

    // const objJson = JSON.parse(formData);
    // console.log(objJson);
    // Lưu dữ liệu vào localStorage
    localStorage.setItem("orderFormData", jsonFormData);
    const storedFormData = localStorage.getItem("orderFormData");
    if (storedFormData) {
      const formDataObject = JSON.parse(storedFormData);
      // Sử dụng dữ liệu đã lưu ở đây
      console.log(formDataObject);
    } else {
      // Không có dữ liệu được lưu trữ
      console.log("Không tìm thấy dữ liệu đã lưu");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 nextStep={nextStep} updateFormData={updateFormData} />;
      case 2:
        return (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <Step4
            prevStep={prevStep}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <StepIndicator currentStep={currentStep} />
      {renderStep()}
    </div>
  );
};

export default OrderForm;
