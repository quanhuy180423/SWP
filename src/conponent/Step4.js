import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Step4 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const defaultText = "No additional details provided.";
  const [richText, setRichText] = useState(formData.richText || defaultText);
  const editorRef = useRef(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(formData.richText || "");
    }
  }, [formData.richText]);

  const handleNext = (e) => {
    e.preventDefault();
    updateFormData({ richText });
    nextStep();
  };

  const handleEditorChange = (content) => {
    setRichText(content);
    updateFormData({ richText: content });
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
          <Editor
            apiKey="0ywy09pu3fif7crqzb9n5eygtvh5hwbbpj4vold92e6q9r11"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofDescriptions footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={richText}
            onEditorChange={handleEditorChange}
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                updateFormData({ richText });
                prevStep();
              }}
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
