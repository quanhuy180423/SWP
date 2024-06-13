import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { editorConfiguration } from "./CKEditorConfig";

const Step4 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [richText, setRichText] = useState(formData.richText || "");

  const handleNext = () => {
    updateFormData({ richText });
    nextStep();
  };

  return (
    <div>
      <h3>Step 4: Additional Details</h3>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={richText}
        onChange={(event, editor) => {
          const data = editor.getData();
          setRichText(data);
        }}
      />
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
  );
};

export default Step4;
