import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";

const ReviewStep = ({ prevStep, formData }) => {
  const [orderForm, setOrderForm] = useState({
    fullName: formData.step1.fullName,
    phone: formData.step1.phone,
    address: formData.step1.address,
    email: formData.step1.email,
    material: formData.step2.material,
    weight: formData.step2.weight,
    size: formData.step2.size,
    color: formData.step3.color,
    clarity: formData.step3.clarity,
    cut: formData.step3.cut,
    carat: formData.step3.carat,
    comment: formData.step4.richText,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const API_URL =
    "https://6669f7722e964a6dfed73d9c.mockapi.io/JewelryAPI/orderForm";

  const handleSubmitOrder = () => {
    axios
      .post(API_URL, orderForm)
      .then((response) => {
        console.log("Order submitted successfully:", response.data);
        if (response.status === 201) {
          setAlert({
            message: "Order submitted successfully",
            type: "success",
            visible: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        setAlert({
          message: "Error submitting order",
          type: "error",
          visible: true,
        });
      });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-2">
      <h2 className="text-center mb-5 text-2xl text-gray-800">
        Review Your Order
      </h2>
      {alert.visible && (
        <Alert
          severity="success"
          variant="filled"
          className="flex justify-center"
        >
          {alert.message}
        </Alert>
      )}
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 1: Personal Information</h3>
        <p>
          <strong>Full Name:</strong> {orderForm.fullName}
        </p>
        <p>
          <strong>Phone:</strong> {orderForm.phone}
        </p>
        <p>
          <strong>Address:</strong> {orderForm.address}
        </p>
        <p>
          <strong>Email:</strong> {orderForm.email}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 2: Material and Category</h3>
        <p>
          <strong>Material:</strong> {orderForm.material}
        </p>
        <p>
          <strong>Weight:</strong> {orderForm.weight}
        </p>
        <p>
          <strong>Size:</strong> {orderForm.size}
        </p>
        <p>
          <strong>Category:</strong> {orderForm.category}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 3: Diamond Details</h3>
        <p>
          <strong>Color:</strong> {orderForm.color}
        </p>
        <p>
          <strong>Clarity:</strong> {orderForm.clarity}
        </p>
        <p>
          <strong>Cut:</strong> {orderForm.cut}
        </p>
        <p>
          <strong>Carat:</strong> {orderForm.carat}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 4: Additional Details</h3>
        {orderForm.comment ? (
          <div dangerouslySetInnerHTML={{ __html: orderForm.comment }} />
        ) : (
          <p>No additional details provided.</p>
        )}
      </div>
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
          onClick={handleFinalSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
        >
          Submit
        </button>
        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
              <p className="text-xl mb-4">Bạn muốn gửi yêu cầu đặt hàng?</p>
              <div className="flex justify-between">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:opacity-80"
                  onClick={() => {
                    setShowConfirmation(false);
                    handleSubmitOrder();
                  }}
                >
                  Đồng ý
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                  onClick={() => setShowConfirmation(false)}
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;
