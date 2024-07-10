import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

const Step4 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const defaultText = "No additional details provided.";
  const [richText, setRichText] = useState(formData.richText || defaultText);
  const [paymentMethod, setPaymentMethod] = useState(
    formData.PaymentMethod || ""
  );
  const editorRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(formData.richText || "");
    }
  }, [formData.richText]);

  const handleNext = (e) => {
    e.preventDefault();
    updateFormData({ richText, PaymentMethod: paymentMethod });
    nextStep();
  };

  const handleEditorChange = (content) => {
    setRichText(content);
    updateFormData({ richText: content });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    updateFormData({ PaymentMethod: event.target.value });
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
        <h3
          style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}
        >
          Step 4: Additional Details
        </h3>
        <div>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Phương thức thanh toán dự kiến
              </FormLabel>
              <label className="ml-6 rounded-2xl text-center bg-rose-100">
                Do Chính sách công ty, khách hàng sau khi nhận được giá từ cửa
                hàng báo trong 24 giờ sẽ phải thanh toán 100% giá trị sản phẩm.
              </label>
              <RadioGroup
                name="PaymentMethod"
                value={paymentMethod}
                defaultChecked
                onChange={handlePaymentMethodChange}
              >
                {/* <FormControlLabel
                  value="CreditCard"
                  control={<Radio />}
                  label="Credit Card"
                /> */}
                <FormControlLabel
                  value="BankTransfer"
                  control={<Radio />}
                  label="Chuyển khoảng ngân hàng"
                />
                {/* <FormControlLabel
                  value="CoD"
                  control={<Radio />}
                  label="Cash"
                /> */}
              </RadioGroup>
            </FormControl>
          </Grid>
        </div>
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
            <Button
              onClick={() => {
                updateFormData({ richText, PaymentMethod: paymentMethod });
                prevStep();
              }}
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
