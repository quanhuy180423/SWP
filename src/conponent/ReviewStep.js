import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { orderRequest } from "../server/api";

const ReviewStep = ({ prevStep, formData }) => {
  const [orderForm, setOrderForm] = useState({
    UserId: formData.step1.UserId,
    UserName: formData.step1.UserName,
    ProductName: formData.step1.Name,
    Phone: formData.step1.Phone,
    Address: formData.step1.Address,
    Email: formData.step1.Email,
    MaterialId: formData.step2.materialId,
    QuantityMaterial: formData.step2.quantityMaterial,
    Size: formData.step2.size,
    CategoryId: formData.step2.categoryId,
    GemId: formData.step3.diamondId,
    QuantityGem: formData.step3.quantityGem,
    Productdescription: formData.step4.richText,
    Description: "description",
    Image: [],
    ProductCost: "0",
    Status: "0",
    PaymentMethods: "1",
    WarrantyCard: "Yes", // Assuming you have this information
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleSubmitOrder = () => {
    orderRequest(orderForm)
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
          severity={alert.type}
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
          <strong>Phone:</strong> {orderForm.Phone}
        </p>
        <p>
          <strong>Address:</strong> {orderForm.Address}
        </p>
        <p>
          <strong>Email:</strong> {orderForm.Email}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 2: Material and Category</h3>
        <p>
          <strong>Material:</strong> {orderForm.MaterialId}
        </p>
        <p>
          <strong>Weight:</strong> {orderForm.QuantityMaterial}
        </p>
        <p>
          <strong>Size:</strong> {orderForm.Size}
        </p>
        <p>
          <strong>Category:</strong> {orderForm.CategoryId}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 3: Diamond Details</h3>
        <p>
          <strong>Diamond ID:</strong> {orderForm.GemId}
        </p>
        <p>
          <strong>Quantity Gem:</strong> {orderForm.QuantityGem}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 4: Additional Details</h3>
        {orderForm.Productdescription ? (
          <div
            dangerouslySetInnerHTML={{ __html: orderForm.Productdescription }}
          />
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
