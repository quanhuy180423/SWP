import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor, { editorConfiguration } from "./CKEditorConfig";

const Step4 = ({
  prevStep,
  step1Data,
  step2Data,
  step3Data,
  onSubmit,
  updateFormData,
}) => {
  const [richText, setRichText] = useState("");

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setRichText(data); // Cập nhật richText
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gom tất cả dữ liệu từ các bước trước đó vào một đối tượng dữ liệu hoàn chỉnh
    const data = {
      step1: step1Data,
      step2: step2Data,
      step3: step3Data,
      richText: richText,
    };

    console.log("Complete Data:", data); // Kiểm tra dữ liệu hoàn chỉnh trước khi gửi

    // Gọi hàm onSubmit để gửi dữ liệu đi
    onSubmit(data);
  };

  return (
    <form
      className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-2"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mb-5 text-2xl text-gray-800">
        Step 4: Additional Details
      </h2>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={richText}
        onChange={handleChange}
      />

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step4;
