import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor, { editorConfiguration } from "./CKEditorConfig";
import "../css/Step4.css";

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
    <form className="form-step4" onSubmit={handleSubmit}>
      <h2>Step 4: Additional Details</h2>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={richText}
        onChange={handleChange}
      />

      {/* Các bố cấp nhật dữ liệu trong Step4 nếu cần */}
      <button type="button" onClick={prevStep}>
        Back
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Step4;
