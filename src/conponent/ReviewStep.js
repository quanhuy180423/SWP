import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderRequest } from "../server/api";

const ReviewStep = ({ prevStep, formData }) => {
  const navigate = useNavigate();
  const [orderForm] = useState({
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
    Productdescription: formData.step4.richText || "",
    Description: "description",
    Image: [],
    ProductCost: "0",
    Status: "RqOrder",
    PaymentMethods: "0", //chưa có phương thức thanh toán
    WarrantyCard: "Yes", // Assuming you have this information
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleSubmitOrder = () => {
    orderRequest(orderForm)
      .then((response) => {
        console.log("Order submitted successfully:", response.data);
        if (response.status === 200) {
          toast.success("Order submitted successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000); // Navigate after 5 seconds
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        toast.error("Error submitting order");
      });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-2">
      <ToastContainer />
      <h2 className="text-center mb-5 text-2xl text-gray-800">
        Review Your Order
      </h2>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Step 1: Personal Information</h3>
        <p>
          <strong>Full Name:</strong> {orderForm.UserName}
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
              <p className="text-xl mb-4">
                Do you want to submit an order request?
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:opacity-80"
                  onClick={() => {
                    setShowConfirmation(false);
                    handleSubmitOrder();
                  }}
                >
                  I agree
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
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
