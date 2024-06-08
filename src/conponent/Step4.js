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
    // Kết hợp dữ liệu từ các bước trước đó
    const data = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
      richText: richText,
      // Thêm dữ liệu của Step4 nếu cần
    };
    console.log("Data before submit:", step1Data); // Kiểm tra giá trị của data trước khi gửi đi
    console.log("Data before submit:", step2Data); // Kiểm tra giá trị của data trước khi gửi đi
    console.log("Data before submit:", step3Data); // Kiểm tra giá trị của data trước khi gửi đi

    console.log("Data before submit:", data); // Kiểm tra giá trị của data trước khi gửi đi
    // Gọi hàm onSubmit để gửi dữ liệu đi
    onSubmit(data);
    console.log("Data after submit:", data); // Kiểm tra giá trị của data sau khi gửi đi
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

      {/* Các bố cập nhật dữ liệu trong Step4 nếu cần */}
      <div className="flex justify-between mt-6">
        {/* <button
          type="button"
          onClick={prevStep}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
        >
          Back
        </button> */}
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
