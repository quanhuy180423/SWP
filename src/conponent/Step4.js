import React, { useState } from "react";
import CKEditorConfig, { editorConfiguration } from "./CKEditorConfig"; // Import cấu hình CKEditor

const Step4 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [richText, setRichText] = useState(formData.richText || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const handleNext = (e) => {
    e.preventDefault();
    updateFormData({ richText });
    nextStep();
  };

  if (error.length > 0) {
    return (
      <div className="Step4">
        <h2 className="alert alert-danger my-3">Có lỗi xảy ra</h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-1/2 mx-auto">
        <h3>Step 4: Additional Details</h3>
        <div>
          <CKEditorConfig initData={richText} setData={setRichText} />

          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
